import { Skeleton } from "@/components/skeletons";

export default function Loading() {
    return (
        <div className="p-6 space-y-6 max-w-4xl">
            {/* Header */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-48" />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-background-tertiary rounded-lg w-fit">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-24 rounded-md" />
                ))}
            </div>

            {/* Content */}
            <div className="border border-border rounded-lg p-6 space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
