<?php

use App\Models\Chat;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat.{chatId}', function (User $user, $chatId) {
    $chat = Chat::findOrFail($chatId);
    return Auth::check() && ($chat->user1_id == $user->id || $chat->user2_id == $user->id);
});
