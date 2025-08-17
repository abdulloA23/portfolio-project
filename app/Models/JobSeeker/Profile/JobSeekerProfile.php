<?php

namespace App\Models\JobSeeker\Profile;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class JobSeekerProfile extends Model
{
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'middle_name',
        'birth_date',
        'gender',
        'phone',
        'location',
        'address',
        'summary'
    ];

    public function links(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Link::class, 'linkable');
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
