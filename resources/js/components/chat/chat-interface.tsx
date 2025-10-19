// import { useState, useRef, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Send, Paperclip, Image } from "lucide-react"
// import { User } from '@/types';
// import ChatPlaceholder from '@/components/chat/chat-placeholder';
// import { useInitials } from '@/hooks/use-initials';
//
//
// type Message = {
//     id: string
//     content: string
//     sender: "user" | "assistant"
//     timestamp: Date
// }
//
// type ChatInterfaceProps = {
//     users:User[];
//     selectedUser?: User | null
// }
// export default function ChatInterface({users, selectedUser }: ChatInterfaceProps) {
//     const [messages, setMessages] = useState<Message[]>([])
//     const [inputValue, setInputValue] = useState("")
//     const messagesEndRef = useRef<HTMLDivElement>(null)
//     const getInitials = useInitials()
//
//     const selectedUserData = selectedUser ? users.find((user) => user.id === selectedUser.id) : null
//
//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//     }
//
//     useEffect(() => {
//         scrollToBottom()
//     }, [messages, scrollToBottom])
//
//     const formatTime = (date: Date) => {
//         return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//     }
//
//     return (
//         <div className="flex flex-col h-full bg-background">
//             {/* Header */}
//             <div className="flex items-center p-4 border-b">
//                 {selectedUserData ? (
//                     <>
//                         <Avatar className="h-8 w-8 overflow-hidden">
//                             <AvatarImage className='rounded-full object-cover'    src={selectedUserData.avatar ? `/storage/images/${selectedUserData.avatar}` : undefined}
//                                          alt={selectedUserData.name} />
//                             <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
//                                 {getInitials(selectedUserData.name)}
//                             </AvatarFallback>
//                         </Avatar>
//                         <div>
//                             <h2 className="font-semibold">{selectedUserData.name}</h2>
//                             {/*<p className="text-xs text-muted-foreground capitalize">{selectedUserData.status}</p>*/}
//                         </div>
//                     </>
//                 ) : (
//                     <>
//                         {/*<Avatar className="h-10 w-10 mr-3">*/}
//                         {/*    <div className="bg-primary text-white rounded-full h-full w-full flex items-center justify-center font-semibold">*/}
//                         {/*        AI*/}
//                         {/*    </div>*/}
//                         {/*</Avatar>*/}
//                         {/*<div>*/}
//                         {/*    <h2 className="font-semibold">AI Assistant</h2>*/}
//                         {/*    <p className="text-xs text-muted-foreground">Always online</p>*/}
//                         {/*</div>*/}
//                     </>
//                 )}
//             </div>
//
//             {/* Messages */}
//             <ScrollArea className="flex-1 p-4">
//                 <div className="space-y-4">
//                     {messages.map((message) => (
//                         <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
//                             <div
//                                 className={`max-w-[80%] rounded-2xl px-4 py-2 ${
//                                     message.sender === "user"
//                                         ? "bg-primary text-primary-foreground rounded-br-none"
//                                         : "bg-muted rounded-bl-none"
//                                 }`}
//                             >
//                                 <p>{message.content}</p>
//                                 <div
//                                     className={`text-xs mt-1 ${
//                                         message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
//                                     }`}
//                                 >
//                                     {formatTime(message.timestamp)}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//
//                     {messages.length===0 && (<>
//                         <ChatPlaceholder selectedUser={selectedUserData} messages={messages} />
//                     </>)}
//
//                     {/*{isTyping && (*/}
//                     {/*    <div className="flex justify-start">*/}
//                     {/*        <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-2">*/}
//                     {/*            <div className="flex space-x-1">*/}
//                     {/*                <div*/}
//                     {/*                    className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"*/}
//                     {/*                    style={{ animationDelay: "0ms" }}*/}
//                     {/*                ></div>*/}
//                     {/*                <div*/}
//                     {/*                    className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"*/}
//                     {/*                    style={{ animationDelay: "150ms" }}*/}
//                     {/*                ></div>*/}
//                     {/*                <div*/}
//                     {/*                    className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"*/}
//                     {/*                    style={{ animationDelay: "300ms" }}*/}
//                     {/*                ></div>*/}
//                     {/*            </div>*/}
//                     {/*        </div>*/}
//                     {/*    </div>*/}
//                     {/*)}*/}
//                     <div ref={messagesEndRef} />
//                 </div>
//             </ScrollArea>
//
//             {/* Input */}
//             <div className="p-4 border-t">
//                 <div className="flex items-center gap-2">
//                     <Button variant="outline" size="icon" className="rounded-full">
//                         <Paperclip className="h-5 w-5" />
//                     </Button>
//                     <Button variant="outline" size="icon" className="rounded-full">
//                         <Image className="h-5 w-5" />
//                     </Button>
//                     <div className="flex-1 relative">
//                         <Input
//                             value={inputValue}
//                             onChange={(e) => setInputValue(e.target.value)}
//                             placeholder="Type a message..."
//                             className="pr-10 rounded-full"
//                             onKeyDown={(e) => {
//                                 if (e.key === "Enter") {
// //
//                                 }
//                             }}
//                         />
//                     </div>
//                     <Button size="icon" className="rounded-full text-white" disabled={inputValue.trim() === ""}>
//                         <Send className="h-5 w-5" />
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }


import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, Image } from "lucide-react";
import { SharedData, User } from '@/types';
import ChatPlaceholder from "@/components/chat/chat-placeholder";
import { useInitials } from "@/hooks/use-initials";
import { usePage } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';

type Message = {
    id: number;
    body: string;
    sender_id: number;
    receiver_id: number;
    created_at: string;
};

type ChatInterfaceProps = {
    users: User[];
    selectedUser?: User | null;
};

export default function ChatInterface({ users, selectedUser }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversationId, setConversationId] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const getInitials = useInitials();

    const currentUserId = usePage<SharedData>().props.auth.user.id;

    useEffect(() => {
        if (selectedUser) {
            fetch(`/chat/conversation/${selectedUser.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setConversationId(data.conversation_id);
                    setMessages(data.messages);
                });
        } else {
            setMessages([]);
            setConversationId(null);
        }
    }, [selectedUser]);
    useEcho(
        `orders `,
        'MessageSent',
        (e) => {
            console.log(e);
            // setMessages(prev => [...prev, e.message]); // можно сразу обновлять чат
        }
    );


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!inputValue.trim() || !conversationId || !selectedUser) return;
        const res = await fetch("/chat/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content,
            },
            body: JSON.stringify({
                conversation_id: conversationId,
                receiver_id: selectedUser.id,
                body: inputValue,
            }),
        });
        const newMsg = await res.json();
        setMessages((prev) => [...prev, newMsg]);
        setInputValue("");
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            {selectedUser && (
                <div className="flex items-center p-4 border-b">
                    <Avatar className="h-8 w-8 overflow-hidden mr-2">
                        <AvatarImage
                            src={selectedUser.avatar ? `/storage/images/${selectedUser.avatar}` : undefined}
                            alt={selectedUser.name}
                        />
                        <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="font-semibold">{selectedUser.name}</h2>
                    </div>
                </div>
            )}

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
                <div className="flex flex-col space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender_id === currentUserId ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] px-4 py-2 rounded-2xl ${message.sender_id === currentUserId ? "bg-primary text-white rounded-br-none" : "bg-muted rounded-bl-none"}`}>
                                {message.body}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            {/* Input */}
            {selectedUser && (
                <div className="p-4 border-t">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <div className="flex-1 relative">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type a message..."
                                className="pr-10 rounded-full"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessage()
                                    }
                                }}
                            />
                        </div>
                        <Button onClick={sendMessage} size="icon" className="rounded-full text-white" disabled={inputValue.trim() === ""}>
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
