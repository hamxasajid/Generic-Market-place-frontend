"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <div className="text-center max-w-md">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 mx-auto mb-6">
                    <ExclamationTriangleIcon className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                    Something went wrong!
                </h1>
                <p className="text-foreground-secondary mb-6">
                    An unexpected error occurred. Please try again or contact support if
                    the problem persists.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => reset()}>Try Again</Button>
                    <Button variant="outline" onClick={() => (window.location.href = "/")}>
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    );
}
