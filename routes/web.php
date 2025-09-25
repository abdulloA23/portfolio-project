<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth','verified'])->group(function () {
    Route::get('dashboard',[\App\Http\Controllers\DashboardController::class,'index'])->name('dashboard');
});
Route::get('/recommended-vacancy/{profileId}',[\App\Http\Controllers\RecommendedController::class,'recommendVacancy'])->name('recommended.vacancy');
Route::post('/recommended-user',[\App\Http\Controllers\RecommendedController::class,'recommendUser'])->name('recommended.user');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/employer.php';
require __DIR__.'/jobseeker.php';
