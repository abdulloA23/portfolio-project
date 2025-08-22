<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\JobSeeker\EditJobSeekerRequest;
use App\Http\Requests\Settings\JobSeeker\IndexJobSeekerRequest;
use App\Http\Requests\Settings\JobSeeker\PatchJobSeekerRequest;
use App\Http\Requests\Settings\JobSeeker\StoreCVUploadRequest;
use App\Models\JobSeeker\Addition\JobSeekerAddition;
use App\Models\JobSeeker\Education\JobSeekerEducation;
use App\Models\JobSeeker\Experience\JobSeekerExperience;
use App\Models\JobSeeker\Language\JobSeekerLanguage;
use App\Models\JobSeeker\Profile\JobSeekerProfile;
use App\Models\JobSeeker\Skill\JobSeekerSkill;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use PhpOffice\PhpWord\IOFactory;
use Smalot\PdfParser\Parser;

class JobSeekerController extends Controller
{

    public function index(IndexJobSeekerRequest $request):Response
    {
        $validated = $request->validated();

        return Inertia::render('settings/jobseeker/cv-upload');
    }

    public function store(StoreCVUploadRequest $request):RedirectResponse
    {
        $validated = $request->validated();
        $file = $request->file('file');

        $response = Http::timeout(300) // 300 секунд = 5 минут
        ->attach(
            'file',
            file_get_contents($file->getRealPath()),
            $file->getClientOriginalName()
        )
            ->post('http://127.0.0.1:9000/extract-text/');
        if ($response->failed()) {
            return back()->withErrors(['file' => 'Ошибка при извлечении текста']);
        }

        $data = $response->json()['response'];

        $db = DB::transaction(function () use ($data) {
            // 1. Создание профиля
            $profile = JobSeekerProfile::firstOrCreate([
                'user_id' => auth()->id() ?? 1, // или фейковый ID
                'first_name' => $data['profile']['first_name'] ?? '',
                'last_name' => $data['profile']['last_name'] ?? '',
                'middle_name' => $data['profile']['middle_name'] ?? '',
                'birth_date' => !empty($data['profile']['birth_date'])
                    ? Carbon::parse($data['profile']['birth_date'])->format('Y-m-d')
                    : null,
                'phone' => $data['profile']['phone'] ?? '',
                'location' => $data['profile']['location'] ?? '',
                'address' => $data['profile']['address'] ?? '',
                'gender' => !empty($data['profile']['gender'])
                    ? $data['profile']['gender']
                    : 'unspecified',
                'summary' => $data['profile']['summary'] ?? '',
            ]);

            // Счётчики sort_order
            $nextOrderSkill = $profile->skills()->max('sort_order') + 1;
            $nextOrderEducation = $profile->education()->max('sort_order') + 1;
            $nextOrderExperiences = $profile->experiences()->max('sort_order') + 1;
            $nextOrderLanguage = $profile->languages()->max('sort_order') + 1;
            $nextOrderAddition = $profile->additions()->max('sort_order') + 1;

            // 2. Ссылки
            foreach ($data['profile']['links'] ?? [] as $link) {
                $profile->links()->create([
                    'url' => $link['url'],
                    'type' => $link['type'],
                ]);
            }

            // 3. Навыки
            foreach ($data['skills'] ?? [] as $skill) {
                $profile->skills()->create([
                    'job_seeker_profile_id' => $profile->id,
                    'name' => $skill['name'],
                    'skill_category_id' => $skill['skill_category_id'] ?? 1,
                    'sort_order' => $nextOrderSkill ?? 1
                ]);
                $nextOrderSkill++;
            }

            // 4. Образование
            foreach ($data['education'] ?? [] as $edu) {
                $profile->education()->create([
                    'institution' => $edu['institution'],
                    'degree' => $edu['degree'],
                    'field_of_study' => $edu['field_of_study'],
                    'start_date' => !empty($edu['start_date'])
                        ? Carbon::parse($edu['start_date'])->format('Y-m-d')
                        : null,
                    'end_date' => !empty($edu['end_date'])
                        ? Carbon::parse($edu['end_date'])->format('Y-m-d')
                        : null,
                    'description' => $edu['description'] ?? null,
                    'job_seeker_profile_id' => $profile->id,
                    'is_current' => $edu['is_current'] ?? false,
                    'sort_order' => $nextOrderEducation ?? 1
                ]);
                $nextOrderEducation++;
            }

            // 5. Опыт работы
            foreach ($data['experiences'] ?? [] as $exp) {
                $profile->experiences()->create([
                    'job_title' => $exp['job_title'],
                    'company_name' => $exp['company_name'],
                    'company_address' => $exp['company_address'] ?? '',
                    'start_date' => !empty($exp['start_date'])
                        ? Carbon::parse($exp['start_date'])->format('Y-m-d')
                        : null,
                    'job_seeker_profile_id' => $profile->id,
                    'sort_order' => $nextOrderExperiences ?? 1,
                    'end_date' => !empty($exp['end_date'])
                        ? Carbon::parse($exp['end_date'])->format('Y-m-d')
                        : null,
                    'is_current' => $exp['is_current'] ?? false,
                    'description' => $exp['description'] ?? null,
                ]);
                $nextOrderExperiences++;
            }

            // 6. Языки
            foreach ($data['languages'] ?? [] as $lang) {
                $profile->languages()->create([
                    'job_seeker_profile_id' => $profile->id,
                    'sort_order' => $nextOrderLanguage ?? 1,
                    'name' => $lang['name'],
                    'language_proficiency_id' => $lang['language_proficiency_id'] ?? 1,
                ]);
                $nextOrderLanguage++;
            }

            // 7. Дополнения
            foreach ($data['additions'] ?? [] as $add) {
                $profile->additions()->create([
                    'job_seeker_profile_id' => $profile->id,
                    'title' => $add['title'],
                    'description' => $add['description'] ?? null,
                    'addition_category_id' => $add['addition_category_id'] ?? 1,
                    'sort_order' => $nextOrderAddition ?? 1
                ]);
                $nextOrderAddition++;
            }

            return response()->json([
                'message' => 'Резюме успешно сохранено',
                'profile_id' => $profile->id
            ]);
        });


        return to_route('jobseeker.index')->with('success', 'Файл успешно обработан');
    }

    public function edit(EditJobSeekerRequest $request):Response
    {
        $validated = $request->validated();
        
        $profile = JobSeekerProfile::with([
            'education' => fn($q) => $q->orderBy('sort_order'),
            'experiences' => fn($q) => $q->orderBy('sort_order'),
            'skills' => fn($q) => $q->orderBy('sort_order'),
            'languages' => fn($q) => $q->orderBy('sort_order'),
            'additions' => fn($q) => $q->orderBy('sort_order'),
            'links'
        ])->where('user_id', auth()->id())->firstOrFail();

        return Inertia::render('settings/jobseeker/edit', [
            'profile' => $profile
        ]);
    }
    public function patch(PatchJobSeekerRequest $request, JobSeekerProfile $profile):RedirectResponse
    {
        $validated = $request->validated();
        
        DB::transaction(function () use ($validated, $profile) {
            // Update main profile data
            $profile->update([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'middle_name' => $validated['middle_name'] ?? null,
                'birth_date' => $validated['birth_date'] ?? null,
                'gender' => $validated['gender'],
                'about' => $validated['about'] ?? null,
                'phone' => $validated['phone'] ?? null,
                'email' => $validated['email'],
                'country' => $validated['country'] ?? null,
                'city' => $validated['city'] ?? null,
                'address' => $validated['address'] ?? null,
                'summary' => $validated['summary'] ?? null,
                'location' => $validated['location'] ?? null,
            ]);

            // Update education
            if (isset($validated['education'])) {
                $profile->education()->delete();
                foreach ($validated['education'] as $edu) {
                    $profile->education()->create([
                        'id' => $edu['id'],
                        'institution' => $edu['institution'],
                        'degree' => $edu['degree'],
                        'field_of_study' => $edu['field_of_study'],
                        'start_date' => $edu['start_date'],
                        'end_date' => $edu['end_date'] ?? null,
                        'description' => $edu['description'] ?? null,
                        'is_current' => $edu['is_current'],
                        'sort_order' => $edu['sort_order']
                    ]);
                }
            }

            // Update experiences
            if (isset($validated['experiences'])) {
                $profile->experiences()->delete();
                foreach ($validated['experiences'] as $exp) {
                    $profile->experiences()->create([
                        'id' => $exp['id'],
                        'job_title' => $exp['job_title'],
                        'company_name' => $exp['company_name'],
                        'company_address' => $exp['company_address'],
                        'start_date' => $exp['start_date'],
                        'end_date' => $exp['end_date'] ?? null,
                        'description' => $exp['description'] ?? null,
                        'is_current' => $exp['is_current'],
                        'sort_order' => $exp['sort_order']
                    ]);
                }
            }

            // Update skills
            if (isset($validated['skills'])) {
                $profile->skills()->delete();
                foreach ($validated['skills'] as $skill) {
                    $profile->skills()->create([
                        'id' => $skill['id'],
                        'name' => $skill['name'],
                        'skill_category_id' => $skill['skill_category_id'],
                        'sort_order' => $skill['sort_order']
                    ]);
                }
            }

            // Update languages
            if (isset($validated['languages'])) {
                $profile->languages()->delete();
                foreach ($validated['languages'] as $lang) {
                    $profile->languages()->create([
                        'id' => $lang['id'],
                        'name' => $lang['name'],
                        'language_proficiency_id' => $lang['language_proficiency_id'],
                        'sort_order' => $lang['sort_order']
                    ]);
                }
            }

            // Update additions
            if (isset($validated['additions'])) {
                $profile->additions()->delete();
                foreach ($validated['additions'] as $add) {
                    $profile->additions()->create([
                        'id' => $add['id'],
                        'title' => $add['title'],
                        'description' => $add['description'] ?? null,
                        'addition_category_id' => $add['addition_category_id'],
                        'sort_order' => $add['sort_order']
                    ]);
                }
            }

            // Update links
            if (isset($validated['links'])) {
                $profile->links()->delete();
                foreach ($validated['links'] as $link) {
                    $profile->links()->create([
                        'id' => $link['id'],
                        'url' => $link['url'],
                        'type' => $link['type'],
                        'sort_order' => $link['sort_order']
                    ]);
                }
            }
        });

        return to_route('jobseeker.edit')->with('success', 'Данные успешно обновились');
    }
}
