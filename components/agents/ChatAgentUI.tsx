"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    PaperAirplaneIcon,
    UserCircleIcon,
    ChatBubbleLeftRightIcon,
    SparklesIcon,
    ClockIcon,
    CheckIcon,
    ArrowPathIcon,
    EllipsisHorizontalIcon
} from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { type Agent } from "@/lib/constants";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    status?: "sent" | "delivered" | "read";
}

export interface ChatAgentUIProps {
    agent: Agent;
}

export function ChatAgentUI({ agent }: ChatAgentUIProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: `Hello! I'm ${agent.name}. ${agent.description} How can I help you today?`,
            timestamp: new Date(),
            status: "read"
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!isLoading && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date(),
            status: "sent"
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);
        setIsTyping(true);

        // Update message status to delivered after a delay
        setTimeout(() => {
            setMessages(prev => prev.map(msg =>
                msg.id === userMessage.id ? { ...msg, status: "delivered" } : msg
            ));
        }, 300);

        // Simulate AI response with typing indicator
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: `This is a simulated response from ${agent.name}. In a real implementation, this would be connected to an AI backend with real-time streaming capabilities.`,
                timestamp: new Date(),
                status: "read"
            };

            // Simulate typing effect
            setTimeout(() => {
                setMessages((prev) => [...prev, assistantMessage]);
                setIsLoading(false);
                setIsTyping(false);
            }, 800);
        }, 1200);
    };



    const clearChat = () => {
        setMessages([
            {
                id: Date.now().toString(),
                role: "assistant",
                content: `Hello! I'm ${agent.name}. ${agent.description} How can I help you today?`,
                timestamp: new Date(),
                status: "read"
            }
        ]);
    };

    const suggestedPrompts = [
        "What can you help me with?",
        "Explain your capabilities",
        "Give me an example of your work",
        "How do you process requests?"
    ];

    return (
        <div className="flex flex-col h-[700px] bg-gradient-to-br from-background-secondary via-background-secondary to-background-tertiary/50 rounded-2xl border border-border/50 overflow-hidden shadow-2xl backdrop-blur-sm">
            {/* Enhanced Header */}
            <div className="px-6 py-4 border-b border-border/50 bg-gradient-to-r from-background-tertiary/80 to-background-secondary/80">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center shadow-lg">
                                <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-background-secondary flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-white"></div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg text-foreground">{agent.name}</h3>
                                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-500/10 text-primary-600 border border-primary-500/20">
                                    AI Assistant
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <ClockIcon className="h-3 w-3" />
                                    {messages.length} messages
                                </span>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground">Active now</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearChat}
                            className="h-9 px-3 text-muted-foreground hover:text-foreground hover:bg-transparent transition-colors"
                        >
                            <ArrowPathIcon className="h-4 w-4 mr-1.5" />
                            Clear
                        </Button>
                    </div>
                </div>
            </div>

            {/* Messages Area with Gradient Overlay */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto relative p-6 space-y-6 bg-gradient-to-b from-transparent via-background-secondary/20 to-background-secondary"
            >
                {/* Top gradient fade */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background-secondary to-transparent z-10 pointer-events-none" />

                <AnimatePresence initial={false}>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                            className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"
                                }`}
                        >
                            {/* Avatar with Animation */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`relative h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${message.role === "user"
                                    ? "bg-gradient-to-br from-primary-500 to-primary-700"
                                    : "bg-gradient-to-br from-background-tertiary to-border/50 border border-border/50"
                                    }`}
                            >
                                {message.role === "user" ? (
                                    <UserCircleIcon className="h-5 w-5 text-white" />
                                ) : (
                                    <SparklesIcon className="h-5 w-5 text-primary-600" />
                                )}
                            </motion.div>

                            {/* Message Container */}
                            <div className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}>
                                {/* Message Bubble */}
                                <div
                                    className={`max-w-[85%] px-5 py-3.5 rounded-3xl relative shadow-sm ${message.role === "user"
                                        ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-tr-none"
                                        : "bg-gradient-to-r from-background-tertiary to-background border border-border/50 text-foreground rounded-tl-none"
                                        }`}
                                >
                                    {/* Message content with better typography */}
                                    <p className="text-sm leading-relaxed font-medium tracking-wide whitespace-pre-wrap break-words">
                                        {message.content}
                                    </p>

                                    {/* Message footer */}
                                    <div className="flex items-center justify-between mt-2 pt-1 opacity-80">
                                        <div className={`text-[10px] flex items-center gap-1.5 ${message.role === "user" ? "text-primary-100" : "text-muted-foreground"
                                            }`}>
                                            <ClockIcon className="h-3 w-3" />
                                            {message.timestamp.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </div>

                                        {/* Message status for user messages */}
                                        {message.role === "user" && message.status && (
                                            <div className="flex items-center gap-1">
                                                {message.status === "sent" && (
                                                    <CheckIcon className="h-3 w-3 text-primary-200" />
                                                )}
                                                {/* Delivered status hidden as per request */}
                                                {message.status === "read" && (
                                                    <CheckIcon className="h-3 w-3 text-green-400" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3"
                    >
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-background-tertiary to-border/50 border border-border/50 flex items-center justify-center shadow-md">
                            <SparklesIcon className="h-5 w-5 text-primary-600 animate-pulse" />
                        </div>
                        <div className="bg-gradient-to-r from-background-tertiary to-background border border-border/50 px-5 py-3.5 rounded-2xl rounded-bl-none shadow-lg">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    <motion.span
                                        className="h-2 w-2 rounded-full bg-primary-500"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                    />
                                    <motion.span
                                        className="h-2 w-2 rounded-full bg-primary-500"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                    />
                                    <motion.span
                                        className="h-2 w-2 rounded-full bg-primary-500"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                    />
                                </div>
                                <span className="text-sm font-medium text-muted-foreground">
                                    {agent.name} is typing...
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Suggested Prompts when no user messages */}
                {messages.filter(m => m.role === "user").length === 0 && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8"
                    >
                        <p className="text-sm text-muted-foreground text-center mb-4 font-medium">
                            Try asking me something like:
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
                            {suggestedPrompts.map((prompt, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setInput(prompt)}
                                    className="px-4 py-2.5 text-sm bg-gradient-to-r from-background-tertiary to-background border border-border/50 rounded-xl hover:border-primary-500/50 hover:bg-primary-500/5 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                                >
                                    {prompt}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background-secondary to-transparent z-10 pointer-events-none" />
                <div ref={messagesEndRef} className="h-px" />
            </div>

            {/* Enhanced Input Area */}
            <div className="p-4 border-t border-border/50 bg-gradient-to-r from-background-tertiary/80 to-background-secondary/80 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="relative group"
                    >

                        <div className="relative">
                            <textarea
                                ref={(el) => {
                                    // @ts-ignore
                                    inputRef.current = el;
                                    // Auto-resize logic
                                    if (el) {
                                        el.style.height = 'auto';
                                        el.style.height = Math.min(el.scrollHeight, 168) + 'px'; // 168px is approx 7 lines (24px line-height * 7)
                                    }
                                }}
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    // Trigger resize
                                    e.target.style.height = 'auto';
                                    e.target.style.height = Math.min(e.target.scrollHeight, 168) + 'px';
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder={`Message ${agent.name}...`}
                                className="w-full pl-5 pr-24 py-4 min-h-[50px] max-h-[168px] border-2 border-border/50 bg-background/80 backdrop-blur-sm rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all duration-300 text-sm font-medium placeholder:text-muted-foreground/60 resize-none overflow-y-auto"
                                disabled={isLoading}
                                rows={1}
                            />
                            <Button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-1.5 bottom-1.5 h-9 px-4 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg text-white"
                            >
                                <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                                Send
                            </Button>
                        </div>

                        {/* Character count */}
                        {input.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute left-0 -bottom-6 text-xs text-muted-foreground"
                            >
                                {input.length}/2000 characters
                            </motion.div>
                        )}
                    </form>

                    {/* Quick Stats */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/30">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span>Connection stable</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ClockIcon className="h-3 w-3" />
                                <span>Response time: ~1s</span>
                            </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                            <span className="font-medium">{agent.name}</span> • v2.1.0
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}