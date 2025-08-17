<?php

namespace App\Models\JobSeeker\Education;

use App\Models\JobSeeker\Profile\JobSeekerProfile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobSeekerEducation extends Model
{
    protected $fillable = [
        'job_seeker_profile_id',
        'institution',
        'degree',
        'field_of_study',
        'start_date',
        'end_date',
        'description',
        'is_current',
        'sort_order'
    ];

    public function jobSeekerProfile():BelongsTo
    {
        return $this->belongsTo(JobSeekerProfile::class);
    }
}
