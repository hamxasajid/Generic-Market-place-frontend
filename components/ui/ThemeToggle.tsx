"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/Button";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function ThemeToggle({ className, ...props }: React.ComponentProps<typeof Button>) {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="sm"
                className={cn("w-12 px-0", className)}
                {...props}
                style={{
                    outline: "none",
                    outlineOffset: "0px",
                    boxShadow: "none",
                }}
                onFocus={(e) => e.target.blur()}
            >
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={cn(
                "w-12 px-0",
                "hover:bg-transparent",
                "focus:outline-none",
                "focus:ring-0",
                "focus-visible:outline-none",
                "focus-visible:ring-0",
                "focus-visible:ring-offset-0",
                className
            )}
            title="Toggle theme"
            style={{
                outline: "none",
                outlineOffset: "0px",
                boxShadow: "none",
                WebkitTapHighlightColor: "transparent",
            }}
            onMouseDown={(e) => e.preventDefault()}
            onFocus={(e) => {
                e.target.style.outline = "none";
                e.target.style.boxShadow = "none";
                e.target.blur();
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
            }}
            {...props}
        >
            {theme === "light" ? (
                <MoonIcon className="h-8 w-8 text-foreground-secondary" />
            ) : (
                <SunIcon className="h-8 w-8 text-foreground-secondary" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}