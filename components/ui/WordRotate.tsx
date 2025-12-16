"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordRotateProps {
    words: string[];
    className?: string;
    duration?: number; // Time to stay visible (ms)
}

export function WordRotate({
    words,
    className,
    duration = 2000,
}: WordRotateProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, duration);

        return () => clearInterval(interval);
    }, [words, duration]);

    return (
        <motion.div
            animate={{ width: `${words[index].length + 1}ch` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative overflow-hidden inline-flex items-center justify-center h-[1.2em] text-left"
        >
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={words[index]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    className={cn("absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent px-1", className)}
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </motion.div>
    );
}
