"use client";

import { useState } from "react";
import { Topbar, MainContent, PageTransition } from "@/components/layout";
import { Button, Input, Badge, EmptyState } from "@/components/ui";
import { Card } from "@/components/ui/Card";
import { AgentCard } from "@/components/cards";
import { MOCK_AGENTS, AGENT_CATEGORIES, AGENT_UI_TYPES, type AgentUIType } from "@/lib/constants";
import { MagnifyingGlassIcon, SparklesIcon, ListBulletIcon, Squares2X2Icon, AdjustmentsHorizontalIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

// Enterprise Imports
import { DataTable } from "@/components/ui/data-table/DataTable";
import { columns } from "./columns";

export default function MarketplacePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedUIType, setSelectedUIType] = useState<AgentUIType | "all">("all");

    const [viewMode, setViewMode] = useState<"grid" | "table">("table");
    const [density, setDensity] = useState<"normal" | "compact">("normal");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    const filteredAgents = MOCK_AGENTS.filter((agent) => {
        const matchesSearch =
            agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agent.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" || agent.category === selectedCategory;
        const matchesUIType =
            selectedUIType === "all" || agent.uiType === selectedUIType;
        return matchesSearch && matchesCategory && matchesUIType;
    });

    // Pagination Logic for Grid View
    const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
    const paginatedAgents = filteredAgents.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset page on search
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    return (
        <>
            <Topbar
                title="Marketplace"
                subtitle="Discover and deploy AI agents from the community"
            />
            <MainContent>
                <PageTransition>
                    <div className="space-y-6">
                        {/* Featured Banner - Keep this for marketing impact */}
                        <Card variant="bordered" padding="lg" className="bg-linear-to-r from-primary-50 to-primary-100 border-primary-200 dark:from-primary-900/20 dark:to-primary-900/10 dark:border-primary-800/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <SparklesIcon className="h-5 w-5 text-primary-600" />
                                        <Badge variant="primary">Enterprise Ready</Badge>
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">
                                        Global Service Catalog
                                    </h2>
                                    <p className="text-foreground-secondary max-w-lg">
                                        Browse over 1 million enterprise-grade AI agents. Deploy instantly to your organization.
                                    </p>
                                </div>
                                <div className="hidden lg:block text-8xl grayscale opacity-50">🏢</div>
                            </div>
                        </Card>

                        {/* Search and Filters Toolbar */}
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col lg:flex-row gap-4 justify-between items-end lg:items-center">
                                {/* Search */}
                                <div className="w-full lg:w-96">
                                    <Input
                                        type="search"
                                        placeholder="Search catalog by name, ID or keywords..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        icon={<MagnifyingGlassIcon className="h-4 w-4" />}
                                        className="bg-background"
                                    />
                                </div>

                                {/* View Controls */}
                                <div className="flex items-center gap-2">
                                    {/* Density Toggle (Only for Table) */}
                                    {viewMode === "table" && (
                                        <div className="flex bg-background-tertiary rounded-lg p-1 border border-border">
                                            <button
                                                onClick={() => setDensity("normal")}
                                                className={cn(
                                                    "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                                    density === "normal" ? "bg-background shadow-sm text-foreground" : "text-foreground-secondary"
                                                )}
                                            >
                                                Comfortable
                                            </button>
                                            <button
                                                onClick={() => setDensity("compact")}
                                                className={cn(
                                                    "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                                    density === "compact" ? "bg-background shadow-sm text-foreground" : "text-foreground-secondary"
                                                )}
                                            >
                                                Compact
                                            </button>
                                        </div>
                                    )}

                                    {/* View Mode Toggle */}
                                    <div className="flex bg-background-tertiary rounded-lg p-1 border border-border">
                                        <button
                                            onClick={() => setViewMode("table")}
                                            className={cn(
                                                "p-1.5 rounded-md transition-all",
                                                viewMode === "table" ? "bg-background shadow-sm text-foreground" : "text-foreground-secondary"
                                            )}
                                            title="Table View"
                                        >
                                            <ListBulletIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode("grid")}
                                            className={cn(
                                                "p-1.5 rounded-md transition-all",
                                                viewMode === "grid" ? "bg-background shadow-sm text-foreground" : "text-foreground-secondary"
                                            )}
                                            title="Grid View"
                                        >
                                            <Squares2X2Icon className="h-5 w-5" />
                                        </button>
                                    </div>


                                </div>
                            </div>

                            {/* Categories Tabs */}
                            <div className="flex flex-wrap gap-2 border-b border-border pb-4 overflow-x-auto">
                                {AGENT_CATEGORIES.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={cn(
                                            "px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                                            selectedCategory === category
                                                ? "text-primary-600 border-b-2 border-primary-600"
                                                : "text-foreground-secondary hover:text-foreground"
                                        )}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* DATA DISPLAY AREA */}
                        <div className="min-h-[400px]">
                            {filteredAgents.length > 0 ? (
                                viewMode === "table" ? (
                                    <DataTable
                                        columns={columns}
                                        data={filteredAgents} // Table handles its own pagination 
                                        density={density}
                                    />
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {paginatedAgents.map((agent) => (
                                                <AgentCard key={agent.id} agent={agent} />
                                            ))}
                                        </div>

                                        {/* Pagination Controls (Grid Only) */}
                                        {totalPages > 1 && (
                                            <div className="flex items-center justify-center gap-2 mt-8">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                                    disabled={currentPage === 1}
                                                >
                                                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                                                    Previous
                                                </Button>
                                                <div className="flex items-center gap-1 mx-2">
                                                    {/* Simple Pagination: Show current / total */}
                                                    <span className="text-sm font-medium text-foreground-secondary">
                                                        Page {currentPage} of {totalPages}
                                                    </span>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                                    disabled={currentPage === totalPages}
                                                >
                                                    Next
                                                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                                                </Button>
                                            </div>
                                        )}
                                    </>
                                )
                            ) : (
                                <EmptyState
                                    title="No agents found"
                                    description="Try adjusting your search or filters."
                                    action={
                                        <Button
                                            variant="secondary"
                                            onClick={() => {
                                                setSearchQuery("");
                                                setSelectedCategory("All");
                                                setCurrentPage(1);
                                            }}
                                        >
                                            Clear Filters
                                        </Button>
                                    }
                                />
                            )}
                        </div>
                    </div>
                </PageTransition>
            </MainContent>
        </>
    );
}
