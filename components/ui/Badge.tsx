import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "primary" | "success" | "warning" | "error" | "outline";
    size?: "sm" | "md";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = "default", size = "sm", ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center font-medium rounded-[var(--radius-full)]";

        const variants = {
            default: "bg-background-tertiary text-foreground-secondary",
            primary: "bg-primary-100 text-primary-700",
            success: "bg-emerald-100 text-emerald-700",
            warning: "bg-amber-100 text-amber-700",
            error: "bg-red-100 text-red-700",
            outline: "bg-transparent border border-border text-foreground",
        };

        const sizes = {
            sm: "px-2 py-0.5 text-xs",
            md: "px-2.5 py-1 text-sm",
        };

        return (
            <span
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            />
        );
    }
);

Badge.displayName = "Badge";

export { Badge };
