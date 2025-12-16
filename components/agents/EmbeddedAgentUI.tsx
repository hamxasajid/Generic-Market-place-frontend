"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { type Agent } from "@/lib/constants";

export interface EmbeddedAgentUIProps {
    agent: Agent;
}

export function EmbeddedAgentUI({ agent }: EmbeddedAgentUIProps) {
    const [url, setUrl] = useState("");
    const [connectedUrl, setConnectedUrl] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = url.trim();
        if (!trimmed) return;
        setIsConnecting(true);
        
        // Simulate connection delay
        setTimeout(() => {
            setConnectedUrl(trimmed);
            setIsConnecting(false);
        }, 800);
    };

    const handleDisconnect = () => {
        setConnectedUrl(null);
        setUrl("");
    };

    const getDisplayHost = (value: string) => {
        try {
            const url = new URL(value);
            return url.host.startsWith('www.') ? url.host.substring(4) : url.host;
        } catch {
            return value;
        }
    };

    return (
        <Card variant="bordered" padding="none" className="overflow-hidden flex flex-col h-full">
            {/* Top Bar */}
            <div className="bg-background-secondary/70 backdrop-blur-xl px-4 py-2 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-red-500/80" />
                        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                        <span className="h-3 w-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary-600 text-white text-xs">
                            {agent.icon}
                        </div>
                        <span className="text-sm font-medium text-foreground">
                            {agent.name}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="default" size="sm">{agent.category}</Badge>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-background">
                {!connectedUrl ? (
                    /* Initial State - URL Input */
                    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary-50/30 to-background">
                        <div className="max-w-md w-full space-y-6">
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 text-3xl">
                                    {agent.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-1">{agent.name}</h3>
                                <p className="text-sm text-foreground-secondary">
                                    {agent.description}
                                </p>
                            </div>
                            
                            <form onSubmit={handleConnect} className="w-full">
                                <div className="relative">
                                    <Input
                                        type="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="https://"
                                        className="w-full pr-12 text-sm h-10"
                                        autoFocus
                                    />
                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-4 text-sm"
                                        isLoading={isConnecting}
                                    >
                                        Go
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    /* Connected State - Full Preview */
                    <div className="flex-1 flex flex-col h-full">
                        {/* URL Bar */}
                        <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-background-secondary/50">
                            <button 
                                onClick={handleDisconnect}
                                className="p-1 rounded-full hover:bg-foreground/10 text-foreground-secondary hover:text-foreground"
                                aria-label="Disconnect"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                            <div className="flex-1 flex items-center h-8 px-3 rounded-md bg-background border border-border text-sm text-foreground-secondary font-mono truncate">
                                {connectedUrl}
                            </div>
                            <div className="text-xs px-2 py-0.5 rounded bg-primary-100 text-primary-800">
                                {getDisplayHost(connectedUrl)}
                            </div>
                        </div>
                        
                        {/* Iframe Preview */}
                        <div className="flex-1 bg-white overflow-hidden flex flex-col">
                            <iframe
                                src={connectedUrl}
                                className="w-full flex-1 border-0"
                                loading="lazy"
                                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}
