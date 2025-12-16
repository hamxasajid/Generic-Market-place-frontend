import { SkeletonStat, Skeleton } from "@/components/skeletons";

export default function Loading() {
    return (
        <div className="p-6 space-y-6">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-64" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonStat key={i} />
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-border rounded-lg p-6">
                    <Skeleton className="h-6 w-32 mb-6" />
                    <Skeleton className="h-48 w-full" />
                </div>
                <div className="border border-border rounded-lg p-6">
                    <Skeleton className="h-6 w-32 mb-6" />
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>

            {/* Top Agents */}
            <div className="border border-border rounded-lg p-6">
                <Skeleton className="h-6 w-48 mb-6" />
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-2 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
