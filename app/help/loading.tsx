import { Skeleton } from "@/components/skeletons";

export default function Loading() {
    return (
        <div className="p-6 space-y-8 max-w-5xl">
            {/* Search Banner */}
            <div className="border-2 border-primary-200 bg-primary-50 rounded-lg p-8">
                <div className="text-center max-w-xl mx-auto space-y-4">
                    <Skeleton className="h-12 w-12 rounded-full mx-auto" />
                    <Skeleton className="h-8 w-64 mx-auto" />
                    <Skeleton className="h-4 w-80 mx-auto" />
                    <Skeleton className="h-10 w-full max-w-md mx-auto" />
                </div>
            </div>

            {/* Resources */}
            <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="border border-border rounded-lg p-6 space-y-3">
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQs */}
            <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <div className="border border-border rounded-lg divide-y divide-border">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="p-6 space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
