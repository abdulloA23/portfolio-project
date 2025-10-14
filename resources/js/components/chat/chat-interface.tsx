import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip, Mic, Image } from "lucide-react"
import { User } from '@/types';
import ChatPlaceholder from '@/components/chat/chat-placeholder';
import { useInitials } from '@/hooks/use-initials';


type Message = {
    id: string
    content: string
    sender: "user" | "assistant"
    timestamp: Date
}

type ChatInterfaceProps = {
    users:User[];
    selectedUser?: User | null
}
export default function ChatInterface({users, selectedUser }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const getInitials = useInitials()

    // Find the selected user from our data
    const selectedUserData = selectedUser ? users.find((user) => user.id === selectedUser.id) : null

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, scrollToBottom])

    const handleSendMessage = () => {
        if (inputValue.trim() === "") return

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputValue,
            sender: "user",
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInputValue("")

        // Simulate assistant typing
        setIsTyping(true)

        // Simulate assistant response after a delay
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: `I received your message: "${inputValue}"`,
                sender: "assistant",
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, assistantMessage])
            setIsTyping(false)
        }, 1500)
    }

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    return (
        <div className="flex flex-col h-full bg-background">
            {/* Header */}
            <div className="flex items-center p-4 border-b">
                {selectedUserData ? (
                    <>
                        <Avatar className="h-8 w-8 overflow-hidden">
                            <AvatarImage className='rounded-full object-cover'    src={selectedUserData.avatar ? `/storage/images/${selectedUserData.avatar}` : undefined}
                                         alt={selectedUserData.name} />
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                {getInitials(selectedUserData.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="font-semibold">{selectedUserData.name}</h2>
                            {/*<p className="text-xs text-muted-foreground capitalize">{selectedUserData.status}</p>*/}
                        </div>
                    </>
                ) : (
                    <>
                        {/*<Avatar className="h-10 w-10 mr-3">*/}
                        {/*    <div className="bg-primary text-white rounded-full h-full w-full flex items-center justify-center font-semibold">*/}
                        {/*        AI*/}
                        {/*    </div>*/}
                        {/*</Avatar>*/}
                        {/*<div>*/}
                        {/*    <h2 className="font-semibold">AI Assistant</h2>*/}
                        {/*    <p className="text-xs text-muted-foreground">Always online</p>*/}
                        {/*</div>*/}
                    </>
                )}
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                    message.sender === "user"
                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                        : "bg-muted rounded-bl-none"
                                }`}
                            >
                                <p>{message.content}</p>
                                <div
                                    className={`text-xs mt-1 ${
                                        message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                                    }`}
                                >
                                    {formatTime(message.timestamp)}
                                </div>
                            </div>
                        </div>
                    ))}

                    {messages.length===0 && (<>
                        <ChatPlaceholder selectedUser={selectedUserData} messages={messages} />
                    </>)}

                    {/*{isTyping && (*/}
                    {/*    <div className="flex justify-start">*/}
                    {/*        <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-2">*/}
                    {/*            <div className="flex space-x-1">*/}
                    {/*                <div*/}
                    {/*                    className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"*/}
                    {/*                    style={{ animationDelay: "0ms" }}*/}
                    {/*                ></div>*/}
                    {/*                <div*/}
                    {/*                    className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"*/}
                    {/*                    style={{ animationDelay: "150ms" }}*/}
                    {/*                ></div>*/}
                    {/*                <div*/}
                    {/*                    className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"*/}
                    {/*                    style={{ animationDelay: "300ms" }}*/}
                    {/*                ></div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="rounded-full">
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                        <Image className="h-5 w-5" />
                    </Button>
                    <div className="flex-1 relative">
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                            className="pr-10 rounded-full"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSendMessage()
                                }
                            }}
                        />
                    </div>
                    <Button onClick={handleSendMessage} size="icon" className="rounded-full text-white" disabled={inputValue.trim() === ""}>
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
