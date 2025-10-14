<?php

namespace App\Http\Controllers;

use App\Events\MessageRead;
use App\Events\MessageSent;
use App\Models\Chat;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $currentUserId = $user->id;

        $chats = Chat::where('user1_id', $currentUserId)
            ->orWhere('user2_id', $currentUserId)
            ->with(['user1', 'user2', 'messages' => function ($query) {
                $query->latest()->first();
            }])
            ->get();

        $users = $chats->map(function ($chat) use ($currentUserId) {
            return $chat->user1_id == $currentUserId ? $chat->user2 : $chat->user1;
        })->unique('id')->values();
        return Inertia::render('chat',['users'=>$users]);
    }
    public function getChat($userId)
    {
        $user = Auth::user();
        $chat = Chat::where(function ($query) use ($user, $userId) {
            $query->where('user1_id', $user->id)->where('user2_id', $userId);
        })->orWhere(function ($query) use ($user, $userId) {
            $query->where('user1_id', $userId)->where('user2_id', $user->id);
        })->first();

        if (!$chat) {
            $chat = Chat::create([
                'user1_id' => min($user->id, $userId),
                'user2_id' => max($user->id, $userId),
            ]);
        }

        return response()->json(['chat_id' => $chat->id]);
    }

    public function getUsers()
    {
        $currentUser = Auth::user();
        $users = User::where('id', '!=', $currentUser->id)
            ->with(['chats' => function ($query) use ($currentUser) {
                $query->where('user1_id', $currentUser->id)
                    ->orWhere('user2_id', $currentUser->id);
            }])
            ->get()
            ->map(function ($user) use ($currentUser) {
                $chat = $user->chats->first();
                $lastMessage = $chat
                    ? Message::where('chat_id', $chat->id)
                        ->latest()
                        ->first()
                    : null;
                $unreadCount = $chat
                    ? Message::where('chat_id', $chat->id)
                        ->where('sender_id', '!=', $currentUser->id)
                        ->where('is_read', false)
                        ->count()
                    : 0;

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'avatar' => $user->avatar,
                    'status' => 'offline',
                    'last_message' => $lastMessage ? ($lastMessage->type === 'file' ? $lastMessage->file_name : $lastMessage->content) : null,
                    'unread' => $unreadCount,
                ];
            });

        return response()->json($users);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'chat_id' => 'required|exists:chats,id',
            'content' => 'required_without:file|string|max:1000',
            'file' => 'nullable|file|max:10240|mimes:jpg,png,pdf,docx', // до 10MB
        ]);

        $messageData = [
            'chat_id' => $request->chat_id,
            'sender_id' => Auth::id(),
            'content' => $request->input['content'],
            'type' => $request->file ? 'file' : 'text',
        ];

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->store('chat_files', 'public');
            $messageData['file_path'] = Storage::url($path);
            $messageData['file_name'] = $file->getClientOriginalName();
        }

        $message = Message::create($messageData);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message);
    }

    public function markAsRead(Request $request)
    {
        $request->validate(['chat_id' => 'required|exists:chats,id']);

        $messages = Message::where('chat_id', $request->chat_id)
            ->where('sender_id', '!=', Auth::id())
            ->where('is_read', false)
            ->get();

        $messageIds = $messages->pluck('id')->toArray();

        Message::whereIn('id', $messageIds)->update([
            'is_read' => true,
            'read_at' => now(),
        ]);

        broadcast(new MessageRead($messageIds, $request->chat_id))->toOthers();

        return response()->json(['status' => 'success']);
    }

    public function getMessages(Chat $chat)
    {
        return Message::where('chat_id', $chat->id)
            ->with('sender')
            ->latest()
            ->paginate(20);
    }
}
