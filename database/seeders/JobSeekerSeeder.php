<?php

namespace Database\Seeders;

use App\Models\Industry;
use App\Models\JobSeeker\Education\JobSeekerEducation;
use App\Models\JobSeeker\Experience\JobSeekerExperience; // Added import
use App\Models\JobSeeker\Language\JobSeekerLanguage;
use App\Models\JobSeeker\Language\LanguageProficiency;
use App\Models\JobSeeker\Profile\JobSeekerProfile;
use App\Models\JobSeeker\Skill\JobSeekerSkill;
use App\Models\Vacancies\Application;
use App\Models\Vacancies\Vacancy;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class JobSeekerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define common Tajik names and locations
        $firstNames = ['Алишер', 'Фарход', 'Дилшод', 'Зарина', 'Мехрангез', 'Шахло', 'Рустам', 'Нодира', 'Саид', 'Гулноз', 'Джамшед', 'Мавлуда', 'Фирдавс', 'Зухра', 'Хуршед', 'Парвина', 'Сафар', 'Мубина', 'Сабрина', 'Икбол', 'Бехруз', 'Нигора', 'Шахриёр', 'Мадина', 'Фаррух'];
        $lastNames = ['Рахимов', 'Саидов', 'Холматова', 'Нурматов', 'Шарипова', 'Мирзоев', 'Кодирова', 'Абдуллоев', 'Хайдарова', 'Рахмонов', 'Алиева', 'Исмоилов', 'Гафурова', 'Каримов', 'Сафарова', 'Махмудов', 'Худойбердиева', 'Азизов', 'Собирзода', 'Джалилова'];
        $locations = ['Душанбе', 'Худжанд', 'Куляб', 'Бохтар', 'Гиссар', 'Хорог', 'Пенджикент', 'Курган-Тюбе', 'Рашт', 'Исфара'];
        $genders = ['male', 'female', 'unspecified'];

        // Get all vacancies
        $vacancies = Vacancy::all()->pluck('id')->toArray();
        if (count($vacancies) < 20) {
            throw new \Exception('Not enough vacancies in the database. Please seed vacancies first.');
        }

        // Randomly assign 1–4 applicants per vacancy, aiming for 35–40 total unique profiles
        $applicantCounts = [];
        $totalApplicants = 0;
        foreach ($vacancies as $vacancyId) {
            $count = rand(1, 4);
            $applicantCounts[$vacancyId] = $count;
            $totalApplicants += $count;
        }

        // Adjust to ensure total is between 35 and 40
        while ($totalApplicants < 35) {
            $vacancyId = $vacancies[array_rand($vacancies)];
            if ($applicantCounts[$vacancyId] < 4) {
                $applicantCounts[$vacancyId]++;
                $totalApplicants++;
            }
        }
        while ($totalApplicants > 40) {
            $vacancyId = $vacancies[array_rand($vacancies)];
            if ($applicantCounts[$vacancyId] > 1) {
                $applicantCounts[$vacancyId]--;
                $totalApplicants--;
            }
        }

        // Track used user IDs to ensure uniqueness
        $usedUserIds = [];
        $userId = 8; // Start after employers (1–7)

        foreach ($applicantCounts as $vacancyId => $count) {
            $vacancy = Vacancy::find($vacancyId);
            if (!$vacancy) {
                continue; // Skip if vacancy not found
            }
            $industry = Industry::find($vacancy->industry_id);
            $skills = $vacancy->skills??[];
            $isEnglishRequired = in_array($vacancy->title, ['Преподаватель английского языка', 'Гид по Памиру']);

            for ($i = 0; $i < $count; $i++) {
                // Ensure unique user ID
                while (in_array($userId, $usedUserIds) && $userId <= 47) {
                    $userId++;
                }
                if ($userId > 47) {
                    throw new \Exception('Not enough unique user IDs available for job seekers.');
                }
                $usedUserIds[] = $userId;

                // Create job seeker profile
                $birthDate = Carbon::today()->subYears(rand(20, 40));
                $firstName = $firstNames[array_rand($firstNames)];
                $lastName = $lastNames[array_rand($lastNames)];
                $profile = JobSeekerProfile::create([
                    'user_id' => $userId,
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'middle_name' => null,
                    'birth_date' => $birthDate,
                    'location' => $locations[array_rand($locations)],
                    'address' => 'ул. ' . $firstNames[array_rand($firstNames)] . ', д. ' . rand(1, 100),
                    'gender' => $genders[array_rand($genders)],
                    'summary' => 'Мотивированный кандидат с навыками, подходящими для работы в ' . ($industry->name ?? 'различных отраслях') . '. Готов внести вклад в развитие компании.',
                    'industry_id' => $industry->id ?? Industry::where('slug', 'other')->first()->id,
                ]);

                // Create education
                $educationLevel = $vacancy->education ?? 'Среднее';
                $institution = $educationLevel === 'Высшее' || $educationLevel === 'Высшее техническое' || $educationLevel === 'Высшее экономическое' || $educationLevel === 'Высшее педагогическое' ? 'Таджикский Государственный Университет' : 'Таджикский Техникум';
                $degree = $educationLevel === 'Высшее' || $educationLevel === 'Высшее техническое' || $educationLevel === 'Высшее экономическое' || $educationLevel === 'Высшее педагогическое' ? 'Бакалавр' : 'Специалист';
                JobSeekerEducation::create([
                    'job_seeker_profile_id' => $profile->id,
                    'institution' => $institution,
                    'degree' => $degree,
                    'field_of_study' => $industry->name ?? 'Общее',
                    'start_year' => $birthDate->copy()->addYears(18)->year,
                    'end_year' => $birthDate->copy()->addYears(22)->year,
                    'description' => 'Получил образование в области ' . ($industry->name ?? 'общего профиля') . '.',
                    'sort_order' => 1,
                ]);

                // Create work experience (if required by vacancy)
                $experienceYears = $vacancy->experience === 'Без опыта' ? 0 : rand(1, 5);
                if ($experienceYears > 0) {
                    JobSeekerExperience::create([
                        'job_seeker_profile_id' => $profile->id,
                        'job_title' => $vacancy->title,
                        'company_name' => 'Местная компания в ' . $vacancy->location,
                        'company_address' => 'г. ' . $vacancy->location . ', ул. Сомони, д. ' . rand(1, 50),
                        'start_date' => Carbon::today()->subYears($experienceYears),
                        'end_date' => $vacancy->experience === 'Без опыта' ? null : Carbon::today()->subMonths(rand(1, 12)),
                        'is_current' => $vacancy->experience === 'Без опыта' ? false : (rand(0, 1) ? true : false),
                        'description' => 'Работа в сфере ' . ($industry->name ?? 'общего профиля') . ', выполнение обязанностей, аналогичных вакансии.',
                        'sort_order' => 1,
                    ]);
                }

                // Create skills
                foreach ($skills as $index => $skill) {
                    JobSeekerSkill::create([
                        'job_seeker_profile_id' => $profile->id,
                        'name' => $skill,
                        'sort_order' => $index + 1,
                    ]);
                }

                // Create language proficiencies (Tajik, Russian, and English if required)
                $nativeProficiency = LanguageProficiency::where('level', 'native')->first();
                if (!$nativeProficiency) {
                    throw new \Exception('Language proficiency level "native" not found.');
                }
                JobSeekerLanguage::create([
                    'job_seeker_profile_id' => $profile->id,
                    'name' => 'Таджикский',
                    'language_proficiency_id' => $nativeProficiency->id,
                    'sort_order' => 1,
                ]);

                $russianLevel = in_array($vacancy->title, ['Программист 1С', 'Веб-разработчик', 'Финансовый консультант', 'Специалист по госзакупкам', 'Администратор клиники', 'Администратор гостевого дома']) ? 'C1' : (rand(0, 1) ? 'B2' : 'C1');
                $russianProficiency = LanguageProficiency::where('level', $russianLevel)->first() ?? LanguageProficiency::where('level', 'B2')->first();
                if (!$russianProficiency) {
                    throw new \Exception('Language proficiency level for Russian not found.');
                }
                JobSeekerLanguage::create([
                    'job_seeker_profile_id' => $profile->id,
                    'name' => 'Русский',
                    'language_proficiency_id' => $russianProficiency->id,
                    'sort_order' => 2,
                ]);

                if ($isEnglishRequired) {
                    $englishLevel = rand(0, 1) ? 'B2' : 'C1';
                    $englishProficiency = LanguageProficiency::where('level', $englishLevel)->first() ?? LanguageProficiency::where('level', 'B2')->first();
                    if (!$englishProficiency) {
                        throw new \Exception('Language proficiency level for English not found.');
                    }
                    JobSeekerLanguage::create([
                        'job_seeker_profile_id' => $profile->id,
                        'name' => 'Английский',
                        'language_proficiency_id' => $englishProficiency->id,
                        'sort_order' => 3,
                    ]);
                }

                // Create application
                Application::create([
                    'job_seeker_profile_id' => $profile->id,
                    'vacancy_id' => $vacancyId,
                    'status' => 'applied',
                    'description' => 'Заинтересован в данной вакансии, готов приступить к работе в ближайшее время.',
                    'salary_exception' => $vacancy->salary_start,
                    'get_to_work' => Carbon::today()->addDays(rand(7, 30)),
                ]);

                $userId++;
            }
        }

        // Ensure exactly 35–40 profiles by creating additional profiles if needed
        $currentProfileCount = JobSeekerProfile::count();
        while ($currentProfileCount < 35) {
            while (in_array($userId, $usedUserIds) && $userId <= 47) {
                $userId++;
            }
            if ($userId > 47) {
                break; // Prevent exceeding available user IDs
            }
            $usedUserIds[] = $userId;

            $vacancyId = $vacancies[array_rand($vacancies)];
            $vacancy = Vacancy::find($vacancyId);
            $industry = Industry::find($vacancy->industry_id);
            $skills = json_decode($vacancy->skills, true) ?? [];
            $isEnglishRequired = in_array($vacancy->title, ['Преподаватель английского языка', 'Гид по Памиру']);

            $birthDate = Carbon::today()->subYears(rand(20, 40));
            $firstName = $firstNames[array_rand($firstNames)];
            $lastName = $lastNames[array_rand($lastNames)];
            $profile = JobSeekerProfile::create([
                'user_id' => $userId,
                'first_name' => $firstName,
                'last_name' => $lastName,
                'middle_name' => null,
                'birth_date' => $birthDate,
                'location' => $locations[array_rand($locations)],
                'address' => 'ул. ' . $firstNames[array_rand($firstNames)] . ', д. ' . rand(1, 100),
                'gender' => $genders[array_rand($genders)],
                'summary' => 'Мотивированный кандидат с навыками, подходящими для работы в ' . ($industry->name ?? 'различных отраслях') . '.',
                'industry_id' => $industry->id ?? Industry::where('slug', 'other')->first()->id,
            ]);

            // Education
            $educationLevel = $vacancy->education ?? 'Среднее';
            $institution = $educationLevel === 'Высшее' || $educationLevel === 'Высшее техническое' || $educationLevel === 'Высшее экономическое' || $educationLevel === 'Высшее педагогическое' ? 'Таджикский Государственный Университет' : 'Таджикский Техникум';
            $degree = $educationLevel === 'Высшее' || $educationLevel === 'Высшее техническое' || $educationLevel === 'Высшее экономическое' || $educationLevel === 'Высшее педагогическое' ? 'Бакалавр' : 'Специалист';
            JobSeekerEducation::create([
                'job_seeker_profile_id' => $profile->id,
                'institution' => $institution,
                'degree' => $degree,
                'field_of_study' => $industry->name ?? 'Общее',
                'start_year' => $birthDate->copy()->addYears(18)->year,
                'end_year' => $birthDate->copy()->addYears(22)->year,
                'description' => 'Получил образование в области ' . ($industry->name ?? 'общего профиля') . '.',
                'sort_order' => 1,
            ]);

            // Work experience
            $experienceYears = $vacancy->experience === 'Без опыта' ? 0 : rand(1, 5);
            if ($experienceYears > 0) {
                JobSeekerExperience::create([
                    'job_seeker_profile_id' => $profile->id,
                    'job_title' => $vacancy->title,
                    'company_name' => 'Местная компания в ' . $vacancy->location,
                    'company_address' => 'г. ' . $vacancy->location . ', ул. Сомони, д. ' . rand(1, 50),
                    'start_date' => Carbon::today()->subYears($experienceYears),
                    'end_date' => $vacancy->experience === 'Без опыта' ? null : Carbon::today()->subMonths(rand(1, 12)),
                    'is_current' => $vacancy->experience === 'Без опыта' ? false : (rand(0, 1) ? true : false),
                    'description' => 'Работа в сфере ' . ($industry->name ?? 'общего профиля') . ', выполнение обязанностей, аналогичных вакансии.',
                    'sort_order' => 1,
                ]);
            }

            // Skills
            foreach ($skills as $index => $skill) {
                JobSeekerSkill::create([
                    'job_seeker_profile_id' => $profile->id,
                    'name' => $skill,
                    'sort_order' => $index + 1,
                ]);
            }

            // Languages
            $nativeProficiency = LanguageProficiency::where('level', 'native')->first();
            if (!$nativeProficiency) {
                throw new \Exception('Language proficiency level "native" not found.');
            }
            JobSeekerLanguage::create([
                'job_seeker_profile_id' => $profile->id,
                'name' => 'Таджикский',
                'language_proficiency_id' => $nativeProficiency->id,
                'sort_order' => 1,
            ]);

            $russianLevel = in_array($vacancy->title, ['Программист 1С', 'Веб-разработчик', 'Финансовый консультант', 'Специалист по госзакупкам', 'Администратор клиники', 'Администратор гостевого дома']) ? 'C1' : (rand(0, 1) ? 'B2' : 'C1');
            $russianProficiency = LanguageProficiency::where('level', $russianLevel)->first() ?? LanguageProficiency::where('level', 'B2')->first();
            if (!$russianProficiency) {
                throw new \Exception('Language proficiency level for Russian not found.');
            }
            JobSeekerLanguage::create([
                'job_seeker_profile_id' => $profile->id,
                'name' => 'Русский',
                'language_proficiency_id' => $russianProficiency->id,
                'sort_order' => 2,
            ]);

            if ($isEnglishRequired) {
                $englishLevel = rand(0, 1) ? 'B2' : 'C1';
                $englishProficiency = LanguageProficiency::where('level', $englishLevel)->first() ?? LanguageProficiency::where('level', 'B2')->first();
                if (!$englishProficiency) {
                    throw new \Exception('Language proficiency level for English not found.');
                }
                JobSeekerLanguage::create([
                    'job_seeker_profile_id' => $profile->id,
                    'name' => 'Английский',
                    'language_proficiency_id' => $englishProficiency->id,
                    'sort_order' => 3,
                ]);
            }

            // Application
            Application::create([
                'job_seeker_profile_id' => $profile->id,
                'vacancy_id' => $vacancyId,
                'status' => 'applied',
                'description' => 'Заинтересован в данной вакансии, готов приступить к работе в ближайшее время.',
                'salary_exception' => $vacancy->salary_start,
                'get_to_work' => Carbon::today()->addDays(rand(7, 30)),
            ]);

            $userId++;
            $currentProfileCount++;
        }
    }
}
