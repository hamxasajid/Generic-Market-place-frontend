"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon, type = "text", ...props }, ref) => {
        return (
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted",
                        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "transition-all duration-[var(--transition-fast)]",
                        icon && "pl-10",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
