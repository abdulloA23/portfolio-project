import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import type { BreadcrumbItem, SharedData, User } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { useEcho } from '@laravel/echo-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatInterface from '@/components/chat/chat-interface';
import UserSidebar from '@/components/chat/user-sidebar';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Чат',
        href: '/chat',
    },
];
interface Message {
    id: number
    text: string
    time: string
    sender: "user" | "other"
}

interface Contact {
    id: number
    name: string
    avatar: string
    lastMessage: string
    time: string
    unread?: number
    online?: boolean
}

interface Chat {
    [contactId: number]: Message[]
}
export default function ChatPage({
    users
                                 }:{users:User[]}){

    const [selectedUser,setSelectedUser] = useState<User|null>(null)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Чат" />
            <div className={'flex h-full'}>
                <UserSidebar users={users} onSelectUser={setSelectedUser} selectedUser={selectedUser} />
                <div className="flex-1 flex items-center justify-center">
                    <div
                        className="w-full  h-full shadow-xl rounded-xl overflow-hidden">
                        <ChatInterface users={users} selectedUser={selectedUser} />
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
