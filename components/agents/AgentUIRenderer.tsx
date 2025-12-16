import dynamic from "next/dynamic";
import { type Agent, type AgentUIType } from "@/lib/constants";
import { Skeleton } from "@/components/skeletons";

// Dynamic imports for agent UIs
const ChatAgentUI = dynamic(() => import("./ChatAgentUI").then((mod) => mod.ChatAgentUI), {
    loading: () => <AgentUILoader />,
});

const FormAgentUI = dynamic(() => import("./FormAgentUI").then((mod) => mod.FormAgentUI), {
    loading: () => <AgentUILoader />,
});

const DashboardAgentUI = dynamic(() => import("./DashboardAgentUI").then((mod) => mod.DashboardAgentUI), {
    loading: () => <AgentUILoader />,
});

const WorkflowAgentUI = dynamic(() => import("./WorkflowAgentUI").then((mod) => mod.WorkflowAgentUI), {
    loading: () => <AgentUILoader />,
});

const EmbeddedAgentUI = dynamic(() => import("./EmbeddedAgentUI").then((mod) => mod.EmbeddedAgentUI), {
    loading: () => <AgentUILoader />,
});

const ApiOnlyAgentUI = dynamic(() => import("./ApiOnlyAgentUI").then((mod) => mod.ApiOnlyAgentUI), {
    loading: () => <AgentUILoader />,
});

function AgentUILoader() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
        </div>
    );
}

const UI_TYPE_MAP: Record<AgentUIType, React.ComponentType<{ agent: Agent }>> = {
    chat: ChatAgentUI,
    form: FormAgentUI,
    dashboard: DashboardAgentUI,
    workflow: WorkflowAgentUI,
    embedded: EmbeddedAgentUI,
    "api-only": ApiOnlyAgentUI,
};

export interface AgentUIRendererProps {
    agent: Agent;
}

export function AgentUIRenderer({ agent }: AgentUIRendererProps) {
    const UIComponent = UI_TYPE_MAP[agent.uiType];

    if (!UIComponent) {
        return (
            <div className="text-center py-16">
                <p className="text-foreground-secondary">
                    Unknown agent UI type: {agent.uiType}
                </p>
            </div>
        );
    }

    return <UIComponent agent={agent} />;
}
