import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: React.ElementType;
    action?: ReactNode;
    className?: string;
}

export function EmptyState({
    title,
    description,
    icon: Icon,
    action,
    className
}: EmptyStateProps) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm border-dashed",
            className
        )}>
            {Icon && (
                <div className="h-12 w-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
            )}
            <h3 className="text-lg font-semibold text-foreground mb-2">
                {title}
            </h3>
            <p className="text-sm text-foreground-secondary max-w-sm mb-6 leading-relaxed">
                {description}
            </p>
            {action && (
                <div>
                    {action}
                </div>
            )}
        </div>
    );
}
