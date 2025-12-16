"use client";

import { Fragment, type ReactNode } from "react";
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
};

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = "md",
}: ModalProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel
                                className={cn(
                                    "w-full transform overflow-hidden rounded-[var(--radius-xl)] bg-background p-6 shadow-[var(--shadow-xl)] transition-all",
                                    sizeClasses[size]
                                )}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        {title && (
                                            <DialogTitle className="text-lg font-semibold text-foreground">
                                                {title}
                                            </DialogTitle>
                                        )}
                                        {description && (
                                            <p className="mt-1 text-sm text-foreground-secondary">
                                                {description}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="rounded-[var(--radius-md)] p-1 text-foreground-muted hover:bg-background-tertiary hover:text-foreground transition-colors"
                                    >
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="mt-4">{children}</div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
