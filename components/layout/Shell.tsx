"use client";

import { useSidebar } from "./SidebarContext";
import { usePathname } from "next/navigation";

export function LayoutShell({ children }: { children: React.ReactNode }) {
    const { isCollapsed } = useSidebar();
    const pathname = usePathname();

    const sidebarWidth = isCollapsed ? 80 : 280;

    return (
        <div
            className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out w-full ml-0 md:ml-[var(--sidebar-width)] md:w-[calc(100%-var(--sidebar-width))]"
            style={{
                "--sidebar-width": `${sidebarWidth}px`,
            } as React.CSSProperties}
        >
            {children}
        </div>
    );
}
