"use client";

import React from "react";
import { LockClosedIcon } from "@heroicons/react/24/outline";

// Mock hook for demo purposes - In real app this connects to Auth Context
const useUserPermissions = () => {
    // Demo: Current user has 'read' but maybe not 'admin'
    // You can toggle these to test
    return {
        permissions: ["read", "write", "execute"], // Missing 'admin'
        role: "member"
    };
};

interface PermissionGateProps {
    requiredPermission: string;
    children: React.ReactNode;
    fallback?: "hidden" | "locked";
}

export function PermissionGate({
    requiredPermission,
    children,
    fallback = "hidden"
}: PermissionGateProps) {
    const { permissions } = useUserPermissions();
    const hasPermission = permissions.includes(requiredPermission);

    if (hasPermission) {
        return <>{children}</>;
    }

    if (fallback === "hidden") {
        return null;
    }

    // Locked State (Blur + Lock Icon)
    return (
        <div className="relative group cursor-not-allowed select-none">
            <div className="opacity-50 blur-[2px] pointer-events-none grayscale">
                {children}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/80 backdrop-blur-md border border-border/50 p-2 rounded-full shadow-lg">
                    <LockClosedIcon className="w-5 h-5 text-foreground-secondary" />
                </div>
            </div>
        </div>
    );
}
