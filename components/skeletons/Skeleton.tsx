import { cn } from "@/lib/utils";

export interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn("skeleton rounded-[var(--radius-md)]", className)}
            aria-hidden="true"
        />
    );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
    return (
        <div className={cn("space-y-2", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn(
                        "h-4",
                        i === lines - 1 ? "w-3/4" : "w-full"
                    )}
                />
            ))}
        </div>
    );
}

export function SkeletonCard({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "rounded-[var(--radius-lg)] border border-border p-6 space-y-4",
                className
            )}
        >
            <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-[var(--radius-lg)]" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                </div>
            </div>
            <SkeletonText lines={2} />
            <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
            </div>
        </div>
    );
}

export function SkeletonStat({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "rounded-[var(--radius-lg)] border border-border p-6 space-y-3",
                className
            )}
        >
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-10 rounded-[var(--radius-md)]" />
                <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-20" />
        </div>
    );
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
    return (
        <div className="space-y-3">
            <div className="flex gap-4 pb-3 border-b border-border">
                {Array.from({ length: cols }).map((_, i) => (
                    <Skeleton key={i} className="h-4 flex-1" />
                ))}
            </div>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-4 py-2">
                    {Array.from({ length: cols }).map((_, colIndex) => (
                        <Skeleton
                            key={colIndex}
                            className={cn(
                                "h-4 flex-1",
                                colIndex === 0 ? "w-1/4" : ""
                            )}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
