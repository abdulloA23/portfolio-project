<?php

namespace App\Models\JobSeeker\Skill;

use App\Models\JobSeeker\Profile\JobSeekerProfile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobSeekerSkill extends Model
{
    protected $fillable = [
        'job_seeker_profile_id',
        'name',
        'skill_category_id',
        'sort_order'
    ];

    public function profile():BelongsTo
    {
        return $this->belongsTo(JobSeekerProfile::class);
    }

    public function skillCategory():BelongsTo
    {
        return $this->belongsTo(SkillCategory::class);
    }
}
