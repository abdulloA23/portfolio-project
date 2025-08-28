<?php

namespace App\Http\Requests\Settings\JobSeeker;

use App\Models\JobSeeker\Profile\JobSeekerProfile;
use Illuminate\Foundation\Http\FormRequest;

class PatchJobSeekerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();

        if (!JobSeekerProfile::where('user_id', $user->id)->exists()) {
            return false;
        }

        return $user->hasRole('jobseeker');
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Profile fields
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date'],
            'gender' => ['required', 'string', 'in:male,female,unspecified'],
            'about' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'summary' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:255'],

            // Education
            'education' => ['array'],
            'education.*.id' => ['required', 'integer'],
            'education.*.institution' => ['required', 'string', 'max:255'],
            'education.*.degree' => ['required', 'string', 'max:255'],
            'education.*.field_of_study' => ['required', 'string', 'max:255'],
            'education.*.start_date' => ['required', 'date'],
            'education.*.end_date' => ['nullable', 'date'],
            'education.*.description' => ['nullable', 'string'],
            'education.*.is_current' => ['required', 'boolean'],
            'education.*.sort_order' => ['required', 'integer'],

            // Experiences
            'experiences' => ['array'],
            'experiences.*.id' => ['required', 'integer'],
            'experiences.*.job_title' => ['required', 'string', 'max:255'],
            'experiences.*.company_name' => ['required', 'string', 'max:255'],
            'experiences.*.company_address' => ['required', 'string', 'max:255'],
            'experiences.*.start_date' => ['required', 'date'],
            'experiences.*.end_date' => ['nullable', 'date'],
            'experiences.*.description' => ['nullable', 'string'],
            'experiences.*.is_current' => ['required', 'boolean'],
            'experiences.*.sort_order' => ['required', 'integer'],

            // Skills
            'skills' => ['array'],
            'skills.*.id' => ['required', 'integer'],
            'skills.*.name' => ['required', 'string', 'max:255'],
            'skills.*.skill_category_id' => ['required', 'integer'],
            'skills.*.sort_order' => ['required', 'integer'],

            // Languages
            'languages' => ['array'],
            'languages.*.id' => ['required', 'integer'],
            'languages.*.name' => ['required', 'string', 'max:255'],
            'languages.*.language_proficiency_id' => ['required', 'integer'],
            'languages.*.sort_order' => ['required', 'integer'],

            // Additions
            'additions' => ['array'],
            'additions.*.id' => ['required', 'integer'],
            'additions.*.title' => ['required', 'string', 'max:255'],
            'additions.*.description' => ['nullable', 'string'],
            'additions.*.addition_category_id' => ['required', 'integer'],
            'additions.*.sort_order' => ['required', 'integer'],

            // Links
            'links' => ['array'],
            'links.*.id' => ['required', 'integer'],
            'links.*.url' => ['required', 'string', 'url', 'max:255'],
            'links.*.type' => ['required', 'string', 'max:255'],
            'links.*.sort_order' => ['required', 'integer'],

        ];
    }

    protected function failedAuthorization()
    {
        redirect()
            ->route('jobseeker.index')
            ->with('error', 'У вас уже есть загруженный профиль резюме.')
            ->send();
        exit;
    }
}
