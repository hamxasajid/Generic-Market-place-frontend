"use client";

import { useState } from "react";
import { Topbar, MainContent, PageTransition } from "@/components/layout";
import { AgentCard } from "@/components/cards";
import { Button, Input, EmptyState } from "@/components/ui";
import { MOCK_AGENTS, AGENT_CATEGORIES } from "@/lib/constants";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export default function AgentsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Mock data for purchased agents - in a real app this would come from user profile/backend
    const PURCHASED_AGENT_IDS = ["acc-001", "hr-003", "social-002", "cx-001", "sales-004"];

    const filteredAgents = MOCK_AGENTS.filter((agent) => {
        // First check if user owns this agent
        if (!PURCHASED_AGENT_IDS.includes(agent.id)) return false;

        const matchesSearch =
            agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agent.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" || agent.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Topbar
                title="My Agents"
                subtitle={`${PURCHASED_AGENT_IDS.length} agents deployed`}
            />
            <MainContent>
                <PageTransition>
                    <div className="space-y-6">
                        {/* Filters */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 max-w-md">
                                <Input
                                    type="search"
                                    placeholder="Search agents..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    icon={<MagnifyingGlassIcon className="h-4 w-4" />}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <FunnelIcon className="h-4 w-4 text-foreground-muted" />
                                <div className="flex flex-wrap gap-2">
                                    {AGENT_CATEGORIES.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={cn(
                                                "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
                                                selectedCategory === category
                                                    ? "bg-primary-600 text-white"
                                                    : "bg-background-tertiary text-foreground-secondary hover:bg-primary-100 hover:text-primary-700"
                                            )}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Agents Grid */}
                        {filteredAgents.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredAgents.map((agent) => (
                                    <AgentCard key={agent.id} agent={agent} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                title="No agents found"
                                description="You haven't deployed any agents yet, or none match your search."
                                action={
                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedCategory("All");
                                        }}
                                    >
                                        Clear filters
                                    </Button>
                                }
                            />
                        )}
                    </div>
                </PageTransition>
            </MainContent>
        </>
    );
}
