"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { type Agent } from "@/lib/constants";

export interface EmbeddedAgentUIProps {
    agent: Agent;
}

export function EmbeddedAgentUI({ agent }: EmbeddedAgentUIProps) {
    return (
        <Card variant="bordered" padding="none" className="overflow-hidden">
            <div className="bg-background-secondary/70 backdrop-blur-xl px-4 py-2 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-border" />
                        <span className="h-3 w-3 rounded-full bg-primary-600/30" />
                        <span className="h-3 w-3 rounded-full bg-border-light" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-600 text-white text-sm">
                            {agent.icon}
                        </div>
                        <span className="text-sm text-foreground">
                            {agent.name} – Embedded App
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="primary" size="sm">Live</Badge>
                    <Badge variant="default" size="sm">{agent.category}</Badge>
                </div>
            </div>

            <div className="relative h-[520px] flex items-center justify-center bg-gradient-to-br from-primary-50 to-background">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

                <div className="relative text-center px-8">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 text-3xl">
                        {agent.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{agent.name}</h3>
                    <p className="text-sm text-foreground-secondary max-w-md mx-auto">{agent.description}</p>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 backdrop-blur-sm px-4 py-2">
                        <span className="text-xs text-foreground-muted">Embedded surface</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
                        <span className="text-xs text-foreground-secondary">Ready</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
