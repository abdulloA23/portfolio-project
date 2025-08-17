<?php

namespace App\Models\JobSeeker\File;

use App\Models\JobSeeker\Profile\JobSeekerProfile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JonSeekerFile extends Model
{
    protected $fillable = [
        'job_seeker_profile_id',
        'file_path',
        'file_name',
        'file_type',
        'mime_type',
        'title',
        'description',
    ];

    public function jobSeekerProfile():BelongsTo
    {
        return $this->belongsTo(JobSeekerProfile::class);
    }
}
