"use client";

import { useState } from "react";
import {
    MagnifyingGlassIcon,
    BellIcon,
    UserCircleIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/Input";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export interface TopbarProps {
    title?: string;
    subtitle?: string;
    showSearch?: boolean;
}

export function Topbar({
    title = "Dashboard",
    subtitle = "Welcome back, Agent Smith",
    showSearch = true
}: TopbarProps) {
    const [hasNotifications] = useState(true);
    const [searchFocused, setSearchFocused] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Glass morphism background with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/85 backdrop-blur-xl" />

            {/* Subtle border with gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

            <div className="relative h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-end md:justify-between">

                {/* Left Section - Title with enhanced typography (Hidden on mobile) */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="relative">
                        {/* Decorative accent */}
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500/80 rounded-full" />

                        <div className="pl-3">
                            {title && (
                                <h1 className="text-xl font-bold text-foreground tracking-tight">
                                    {title}
                                </h1>
                            )}
                            {subtitle && (
                                <p className="text-xs sm:text-sm text-foreground-secondary/80 font-medium tracking-wide mt-0.5">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Section - Actions */}
                <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                    {/* Action buttons container */}
                    <div className="flex items-center gap-1">

                        {/* Theme Toggle - Enhanced */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-600/0 rounded-[var(--radius-md)] group-hover:from-primary-500/5 group-hover:to-primary-600/5 transition-all duration-300" />
                            <ThemeToggle
                                className="relative p-2.5 hover:scale-105 transition-transform duration-200"
                                aria-label="Toggle theme"
                            />
                        </div>

                        {/* Vertical divider */}
                        <div className="h-6 w-px bg-gradient-to-b from-border/30 via-border/50 to-border/30 mx-1" />

                        {/* Notifications with animated indicator */}
                        <button
                            className="relative group p-2.5 rounded-[var(--radius-md)] transition-all duration-300 hover:scale-105"
                            aria-label="Notifications"
                        >
                            {/* Background glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-600/0 rounded-[var(--radius-md)] group-hover:from-primary-500/10 group-hover:to-primary-600/10 transition-all duration-300" />

                            <BellIcon className="relative h-5 w-5 text-foreground-secondary group-hover:text-foreground transition-colors duration-200" />

                            {hasNotifications && (
                                <>
                                    {/* Notification count */}
                                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary-600 text-xs text-white font-semibold flex items-center justify-center animate-bounce">
                                        3
                                    </span>
                                </>
                            )}
                        </button>

                        {/* User Profile with dropdown hint */}
                        <button
                            className="group flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-[var(--radius-md)] hover:bg-background-tertiary/50 transition-all duration-300"
                            aria-label="User menu"
                        >
                            {/* Avatar with gradient border */}
                            <div className="relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                                <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
                                    <UserCircleIcon className="h-6 w-6 text-primary-600" />
                                </div>
                            </div>

                            {/* User info - hidden on mobile, visible on tablet+ */}
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-medium text-foreground">Agent Smith</p>
                                <p className="text-xs text-foreground-secondary/70">Admin</p>
                            </div>

                            {/* Dropdown indicator */}
                            <ChevronDownIcon className="hidden sm:block h-4 w-4 text-foreground-secondary/50 group-hover:text-foreground transition-colors ml-1" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile search bar (only shows when needed) */}
            {showSearch && (
                <div className="md:hidden px-4 pb-3 pt-1">
                    <div className="relative">
                        <Input
                            type="search"
                            placeholder="Search..."
                            icon={<MagnifyingGlassIcon className="h-4 w-4 text-foreground-secondary/70" />}
                            className="bg-background-tertiary/50 border-border/50"
                        />
                    </div>
                </div>
            )}
        </header>
    );
}