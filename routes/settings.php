<?php

use App\Http\Controllers\Settings\JobSeekerController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::delete('settings/profile/avatar', [ProfileController::class, 'destroyAvatar'])
        ->name('profile.avatar.destroy');

    Route::get('settings/destroy-account', function (){
        return Inertia::render('settings/destroy-account');
    });
    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('password.update');
    Route::middleware('role:jobseeker')->group(function () {
        Route::get('/settings/jobseeker',[JobSeekerController::class,'index'])->name('jobseeker.index');
        Route::post('/settings/jobseeker/upload',[JobSeekerController::class,'store'])->name('jobseeker.store');
        Route::get('/settings/jobseeker/edit', [JobSeekerController::class, 'edit'])->name('jobseeker.edit');
        Route::patch('settings/jobseeker/patch', [JobSeekerController::class, 'patch'])->name('jobseeker.patch');
    });
});

