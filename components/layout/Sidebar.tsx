"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";

export function Sidebar() {
    const pathname = usePathname();
    const { isCollapsed, toggle } = useSidebar();

    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    const desktopWidth = isCollapsed ? 80 : 280;

    const openMobile = () => setIsMobileOpen(true);
    const closeMobile = () => setIsMobileOpen(false);

    return (
        <>
            {/* MOBILE TOP BAR (no sidebar on mobile, just hamburger) */}

            <div className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 md:hidden z-[60] pointer-events-none">
                <button
                    onClick={openMobile}
                    className="flex items-center justify-center rounded-md p-2 text-foreground-secondary hover:bg-background-tertiary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 pointer-events-auto"
                    aria-label="Open navigation"
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>
            </div>

            {/* DESKTOP SIDEBAR */}
            <motion.aside
                initial={false}
                animate={{ width: desktopWidth }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={cn(
                    "hidden md:flex fixed left-0 top-0 h-screen bg-background border-r border-border",
                    "z-50 flex-col shadow-sm"
                )}
                style={{ width: `${desktopWidth}px` }}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-border shrink-0">
                    {isCollapsed ? (
                        // COLLAPSED: AI logo only; on hover AI -> > ; on click open sidebar
                        <button
                            onClick={toggle}
                            className={cn(
                                "group relative flex items-center",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
                            )}
                            aria-label="Expand sidebar"
                        >
                            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-lg shrink-0">
                                {/* AI text (hidden on hover) */}
                                <span className="transition-opacity duration-150 group-hover:opacity-0">
                                    AI
                                </span>
                                {/* ChevronRight (shown on hover) */}
                                <ChevronRightIcon
                                    className={cn(
                                        "absolute h-5 w-5 text-white",
                                        "opacity-0 translate-x-[-4px]",
                                        "transition-all duration-150",
                                        "group-hover:opacity-100 group-hover:translate-x-0"
                                    )}
                                />
                            </div>
                        </button>
                    ) : (
                        // EXPANDED: Logo + text + collapse button
                        <>
                            <Link
                                href="/"
                                className="flex items-center gap-3 overflow-hidden"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-lg shrink-0">
                                    AI
                                </div>
                                <motion.span
                                    initial={false}
                                    animate={{ opacity: 1, width: "auto" }}
                                    transition={{ duration: 0.15 }}
                                    className="font-semibold text-foreground whitespace-nowrap"
                                >
                                    AI Agents Hive
                                </motion.span>
                            </Link>

                            {/* Collapse button on the right */}
                            <button
                                onClick={toggle}
                                className={cn(
                                    "flex items-center justify-center rounded-md p-2",
                                    "text-foreground-secondary hover:bg-background-tertiary hover:text-foreground",
                                    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                                )}
                                aria-label="Collapse sidebar"
                                title="Collapse sidebar"
                            >
                                <ChevronLeftIcon className="h-5 w-5" />
                            </button>
                        </>
                    )}
                </div>

                {/* Navigation */}
                <SidebarNav
                    pathname={pathname}
                    isCollapsed={isCollapsed}
                />
            </motion.aside>

            {/* MOBILE OFF-CANVAS SIDEBAR */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-[100] md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/40"
                            onClick={closeMobile}
                        />

                        {/* Panel */}
                        <motion.aside
                            initial={{ x: -320 }}
                            animate={{ x: 0 }}
                            exit={{ x: -320 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="relative h-full w-72 bg-background border-r border-border shadow-xl flex flex-col"
                        >
                            {/* Mobile header */}
                            <div className="h-16 flex items-center justify-between px-4 border-b border-border shrink-0">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-lg shrink-0">
                                        AI
                                    </div>
                                    <span className="font-semibold text-foreground whitespace-nowrap">
                                        AI Agents Hive
                                    </span>
                                </div>

                                <button
                                    onClick={closeMobile}
                                    className={cn(
                                        "flex items-center justify-center rounded-md p-2",
                                        "text-foreground-secondary hover:bg-background-tertiary hover:text-foreground",
                                        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                                    )}
                                    aria-label="Close navigation"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Mobile navigation (always expanded) */}
                            <SidebarNav
                                pathname={pathname}
                                isCollapsed={false}
                                onItemClick={closeMobile}
                            />
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/**
 * Shared navigation list for desktop & mobile
 */
function SidebarNav({
    pathname,
    isCollapsed,
    onItemClick,
}: {
    pathname: string;
    isCollapsed: boolean;
    onItemClick?: () => void;
}) {
    return (
        <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
                {NAVIGATION_ITEMS.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                onClick={onItemClick ? () => onItemClick() : undefined}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200",
                                    isActive
                                        ? "bg-primary-50 text-foreground dark:bg-primary-900/40 dark:text-primary-700"
                                        : "text-foreground-secondary hover:bg-background-tertiary hover:text-foreground"
                                )}
                                title={isCollapsed ? item.name : undefined}
                            >
                                <Icon
                                    className={cn(
                                        "h-5 w-5 shrink-0",
                                        isActive && "text-primary-600 dark:text-primary-400"
                                    )}
                                />
                                <motion.span
                                    initial={false}
                                    animate={{
                                        opacity: isCollapsed ? 0 : 1,
                                        width: isCollapsed ? 0 : "auto",
                                    }}
                                    transition={{ duration: 0.15 }}
                                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                                >
                                    {item.name}
                                </motion.span>
                                {isActive && !isCollapsed && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-600"
                                    />
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}