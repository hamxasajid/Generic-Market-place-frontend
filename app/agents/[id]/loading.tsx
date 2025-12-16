import { Skeleton } from "@/components/skeletons";

export default function Loading() {
    return (
        <div className="p-6 space-y-6">
            {/* Agent Header Skeleton */}
            <div className="flex items-center justify-between pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-20" />
                    <div className="h-6 w-px bg-border" />
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-12 w-12 rounded-lg" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-40" />
                            <div className="flex gap-2">
                                <Skeleton className="h-5 w-24 rounded-full" />
                                <Skeleton className="h-5 w-20" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-9" />
                </div>
            </div>

            {/* Agent Content Skeleton */}
            <div className="space-y-4">
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-64 w-full" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-24" />
                    ))}
                </div>
            </div>
        </div>
    );
}
