<?php

namespace App\Models\JobSeeker\Skill;

use Illuminate\Database\Eloquent\Model;


class SkillCategory extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'slug'
    ];
}
