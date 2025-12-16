"use client";


import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { type Agent, AGENT_STATUSES } from "@/lib/constants";

export interface AgentCardProps {
    agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
    const status = AGENT_STATUSES[agent.status];

    return (
        <Link href={`/agents/${agent.id}`}>
            <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
            >
                <Card
                    variant="default"
                    padding="md"
                    className="relative h-full cursor-pointer hover:border-primary-300 hover:shadow-[var(--shadow-md)] transition-all duration-[var(--transition-normal)]"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-primary-100 text-2xl">
                                {agent.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground line-clamp-1 pr-16">
                                    {agent.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-xs text-foreground-muted">
                                        by AI AGENTSHIVE
                                    </p>
                                    <span className="text-border">|</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className={`h-1.5 w-1.5 rounded-full ${status.color}`} />
                                        <span className="text-xs text-foreground-muted">{status.label}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ABSOLUTE POSITIONED BADGE - TOP RIGHT */}
                        <div className="absolute top-0 right-4">
                            <Badge variant="default" className="rounded-md font-normal text-[10px] px-2 py-0.5 border border-border/50 bg-background/50 backdrop-blur-sm">
                                {agent.category}
                            </Badge>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-foreground-secondary line-clamp-2">
                        {agent.description}
                    </p>
                </Card>
            </motion.div>
        </Link>
    );
}
