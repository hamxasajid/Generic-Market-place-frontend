import { Skeleton, SkeletonCard } from "@/components/skeletons";

export default function Loading() {
    return (
        <div className="p-6 space-y-6">
            {/* Featured Banner Skeleton */}
            <div className="rounded-lg border-2 border-primary-200 bg-primary-50 p-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-3">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-96" />
                    </div>
                    <Skeleton className="h-24 w-24 rounded-lg hidden lg:block" />
                </div>
            </div>

            {/* Filters Skeleton */}
            <div className="flex flex-col lg:flex-row gap-4">
                <Skeleton className="h-10 w-full max-w-lg" />
                <div className="flex gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-24 rounded-full" />
                    ))}
                </div>
            </div>

            {/* Categories Skeleton */}
            <div className="flex gap-4 border-b border-border pb-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-20" />
                ))}
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
}
