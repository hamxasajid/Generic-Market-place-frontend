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
            <div className="bg-background-tertiary px-4 py-2 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-red-400" />
                        <span className="h-3 w-3 rounded-full bg-amber-400" />
                        <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-sm text-foreground-secondary ml-2">
                        {agent.name} - Embedded App
                    </span>
                </div>
                <Badge variant="primary" size="sm">
                    Live
                </Badge>
            </div>
            <div className="h-[500px] bg-gradient-to-br from-primary-50 to-background flex items-center justify-center">
                <div className="text-center px-8">
                    <div className="text-6xl mb-4">{agent.icon}</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                        {agent.name}
                    </h3>
                    <p className="text-foreground-secondary max-w-md">
                        {agent.description}
                    </p>
                    <p className="text-sm text-foreground-muted mt-4">
                        This is a placeholder for an embedded application.
                        <br />
                        The agent would render its custom UI here.
                    </p>
                </div>
            </div>
        </Card>
    );
}
