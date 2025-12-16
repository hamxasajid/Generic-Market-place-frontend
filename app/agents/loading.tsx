import { SkeletonCard } from "@/components/skeletons";
import { Skeleton } from "@/components/skeletons";

export default function Loading() {
    return (
        <div className="p-6 space-y-6">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-48" />
            </div>

            {/* Filters Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-10 w-full max-w-md" />
                <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-20 rounded-full" />
                    ))}
                </div>
            </div>

            {/* Agents Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
}
