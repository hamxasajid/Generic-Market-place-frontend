import { SkeletonStat, SkeletonCard } from "@/components/skeletons";

export default function Loading() {
    return (
        <div className="p-6 space-y-8">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <div className="skeleton h-8 w-32 rounded-md" />
                <div className="skeleton h-4 w-64 rounded-md" />
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonStat key={i} />
                ))}
            </div>

            {/* Featured Agents Skeleton */}
            <div className="space-y-4">
                <div className="skeleton h-6 w-40 rounded-md" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
