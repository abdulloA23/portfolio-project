import { useState } from 'react';
import { Plus, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types';
import NoUsersPlaceholder from '@/components/chat/no-users-placeholder';
import { useInitials } from '@/hooks/use-initials';


type UserSidebarProps = {
    users:User[];
    onSelectUser: (user: User) => void;
    selectedUser: User | null;
};

export default function UserSidebar({ users,onSelectUser, selectedUser }: UserSidebarProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const getInitials = useInitials()
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "online":
                return "bg-green-500";
            case "away":
                return "bg-yellow-500";
            case "offline":
                return "bg-gray-400";
            default:
                return "bg-gray-400";
        }
    };

    return (
        <div className="flex flex-col h-full w-64 bg-background border-r border-border">
            {/* Header */}
            <div className="p-4 border-b border-border">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Поиск пользователей..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-2">
                <div className="mb-2">
                    <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase">
                        Последние чаты
                    </h3>
                </div>
                <div className="space-y-1">
                    {filteredUsers.map((user) => (
                        <button
                            key={user.id}
                            className={`flex items-center gap-3 w-full p-2 rounded-md text-left hover:bg-accent ${
                                selectedUser?.id === user.id ? 'bg-accent' : ''
                            }`}
                            onClick={() => onSelectUser(user)}
                        >
                            <div className="relative">
                                <Avatar className="h-8 w-8 overflow-hidden">
                                    <AvatarImage className='rounded-full object-cover'    src={user.avatar ? `/storage/images/${user.avatar}` : undefined}
                                                 alt={user.name} />
                                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                {/*<div*/}
                                {/*    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(user.status)}`}*/}
                                {/*/>*/}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium truncate">{user.name}</span>
                                    {/*{user.unread > 0 && (*/}
                                    {/*    <Badge variant="default" className="ml-2 px-1.5 py-0.5 text-white text-xs">*/}
                                    {/*        {user.unread}*/}
                                    {/*    </Badge>*/}
                                    {/*)}*/}
                                </div>
                                <p className="text-xs text-muted-foreground truncate">sadsad</p>
                            </div>
                        </button>
                    ))}
                    {filteredUsers.length === 0 && (
                        <>
                            <NoUsersPlaceholder />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
