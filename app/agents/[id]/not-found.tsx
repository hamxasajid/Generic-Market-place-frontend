import Link from "next/link";
import { Button, EmptyState } from "@/components/ui";
import { Topbar, MainContent } from "@/components/layout";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function AgentNotFound() {
    return (
        <>
            <Topbar title="Agent Not Found" />
            <MainContent>
                <EmptyState
                    title="Agent not found"
                    description="The agent you're looking for doesn't exist or has been removed."
                    icon={ExclamationTriangleIcon}
                    action={
                        <Link href="/agents">
                            <Button>Back to Agents</Button>
                        </Link>
                    }
                />
            </MainContent>
        </>
    );
}
