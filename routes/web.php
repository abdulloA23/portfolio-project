<?php

use App\Http\Controllers\ChatController;
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

Route::middleware('auth')->group(function () {
    Route::get('/chat',[ChatController::class,'index'])->name('chat');
    Route::get('/chat/users', [ChatController::class, 'getUsers'])->name('chat.users');
    Route::get('/chat/{userId}', [ChatController::class, 'getChat'])->name('chat.get');
    Route::post('/chat/messages', [ChatController::class, 'sendMessage'])->name('chat.send');
    Route::post('/chat/mark-read', [ChatController::class, 'markAsRead'])->name('chat.read');
    Route::get('/chat/{chat}/messages', [ChatController::class, 'getMessages'])->name('chat.messages');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/employer.php';
require __DIR__.'/jobseeker.php';
