"use client"
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { type Agent } from "@/lib/constants";
import { ClipboardDocumentIcon, CodeBracketIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export interface ApiOnlyAgentUIProps {
    agent: Agent;
}

export function ApiOnlyAgentUI({ agent }: ApiOnlyAgentUIProps) {
    const mockEndpoints = [
        { method: "POST", path: `/api/agents/${agent.id}/execute`, description: "Execute the agent" },
        { method: "GET", path: `/api/agents/${agent.id}/status`, description: "Get agent status" },
        { method: "GET", path: `/api/agents/${agent.id}/results`, description: "Get execution results" },
    ];

    return (
        <div className="space-y-6">
            <Card variant="default" padding="lg">
                <div className="flex items-center gap-3 mb-6">
                    <CodeBracketIcon className="h-8 w-8 text-primary-600" />
                    <div>
                        <h3 className="font-semibold text-foreground">{agent.name}</h3>
                        <p className="text-sm text-foreground-secondary">
                            API-Only Agent - No UI Interface
                        </p>
                    </div>
                </div>

                <div className="bg-foreground rounded-[var(--radius-lg)] p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-foreground-muted">API Key</span>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-white hover:bg-white/10"
                                onClick={() => {
                                    navigator.clipboard.writeText(`sk_live_${agent.id}_${Math.random().toString(36).substring(7)}`);
                                    alert("Copied to clipboard!");
                                }}
                            >
                                <ClipboardDocumentIcon className="h-4 w-4 mr-1.5" />
                                Copy
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-white hover:bg-white/10"
                                onClick={() => {
                                    // Regenerate mock key
                                    const newKey = `sk_live_${agent.id}_${Math.random().toString(36).substring(7)}`;
                                    // In a real app, this would update state
                                    alert("New Key Generated: " + newKey);
                                }}
                            >
                                <ArrowPathIcon className="h-4 w-4 mr-1.5" />
                                Regenerate
                            </Button>
                        </div>
                    </div>
                    <code className="text-primary-400 text-sm font-mono break-all">
                        sk_live_{agent.id}_8923487234
                    </code>
                    <p className="text-[10px] text-zinc-500 mt-2">
                        * Keep this key secure. Do not share it in client-side code.
                    </p>
                </div>

                <h4 className="font-medium text-foreground mb-3">Available Endpoints</h4>
                <div className="space-y-3">
                    {mockEndpoints.map((endpoint, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-background-secondary rounded-[var(--radius-md)] border border-border"
                        >
                            <Badge
                                variant={endpoint.method === "POST" ? "primary" : "success"}
                                size="sm"
                            >
                                {endpoint.method}
                            </Badge>
                            <code className="text-sm font-mono text-foreground flex-1">
                                {endpoint.path}
                            </code>
                            <span className="text-sm text-foreground-muted hidden md:block">
                                {endpoint.description}
                            </span>
                        </div>
                    ))}
                </div>
            </Card>

            <Card variant="default" padding="lg">
                <h4 className="font-medium text-foreground mb-3">Example Request</h4>
                <pre className="bg-foreground text-primary-300 p-4 rounded-[var(--radius-md)] overflow-x-auto text-sm">
                    <code>{`curl -X POST https://api.aiagentshive.com/api/agents/${agent.id}/execute \\
  -H "Authorization: Bearer sk-agent-xxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"input": "Your input data here"}'`}</code>
                </pre>
            </Card>
        </div>
    );
}
