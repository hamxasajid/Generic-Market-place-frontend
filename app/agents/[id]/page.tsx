import { notFound } from "next/navigation";
import { Topbar, MainContent, PageTransition } from "@/components/layout";
import { AgentShellHeader, AgentUIRenderer } from "@/components/agents";
import { MOCK_AGENTS } from "@/lib/constants";

interface AgentPageProps {
    params: Promise<{
        id: string;
    }>;
}

// Generate static params for all known agents
export function generateStaticParams() {
    return MOCK_AGENTS.map((agent) => ({
        id: agent.id,
    }));
}

export default async function AgentPage({ params }: AgentPageProps) {
    const { id } = await params;
    const agent = MOCK_AGENTS.find((a) => a.id === id);

    if (!agent) {
        notFound();
    }

    return (
        <>
            <Topbar title={agent.name} subtitle={agent.category} />
            <MainContent>
                <PageTransition>
                    <div className="space-y-6">
                        {/* Agent Shell Header */}
                        <AgentShellHeader agent={agent} />

                        {/* Dynamic Agent UI */}
                        <div className="mt-6">
                            <AgentUIRenderer agent={agent} />
                        </div>
                    </div>
                </PageTransition>
            </MainContent>
        </>
    );
}
