<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
        ]);
        $jobseeker = User::create([
            'name' => 'Job Seeker',
            'email' => 'jobseeker@jobseeker.com',
            'password' => Hash::make('password'),
        ]);
        $employer = User::create([
            'name' => 'Employer',
            'email' => 'employer@employer.com',
            'password' => Hash::make('password'),
        ]);
        $admin->assignRole('admin');
        $jobseeker->assignRole('jobseeker');
        $employer->assignRole('employer');
    }
}
