<?php

namespace Database\Seeders;

use App\Models\JobSeeker\Skill\SkillCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SkillCategory::create(['name' => 'Web Development','slug'=>"web-development"]);
    }
}
