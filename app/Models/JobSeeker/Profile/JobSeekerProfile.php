<?php

namespace App\Models\JobSeeker\Profile;

use App\Models\JobSeeker\Addition\JobSeekerAddition;
use App\Models\JobSeeker\Education\JobSeekerEducation;
use App\Models\JobSeeker\Experience\JobSeekerExperience;
use App\Models\JobSeeker\Language\JobSeekerLanguage;
use App\Models\JobSeeker\Skill\JobSeekerSkill;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobSeekerProfile extends Model
{
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'middle_name',
        'birth_date',
        'gender',
        'location',
        'address',
        'summary'
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];
    public function links(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Link::class, 'linkable');
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function education():HasMany
    {
        return $this->hasMany(JobSeekerEducation::class,'job_seeker_profile_id');
    }

    public function experiences():HasMany
    {
        return $this->hasMany(JobSeekerExperience::class,'job_seeker_profile_id');
    }

    public function skills():HasMany
    {
        return $this->hasMany(JobSeekerSkill::class,'job_seeker_profile_id');
    }

    public function languages():HasMany
    {
        return $this->hasMany(JobSeekerLanguage::class,'job_seeker_profile_id');
    }

    public function additions():HasMany
    {
        return $this->hasMany(JobSeekerAddition::class,'job_seeker_profile_id');
    }
}
