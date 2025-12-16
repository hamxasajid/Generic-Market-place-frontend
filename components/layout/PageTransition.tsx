"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";

export interface PageTransitionProps {
    children: React.ReactNode;
}

const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 8,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.25,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        y: -8,
        transition: {
            duration: 0.15,
            ease: "easeIn",
        },
    },
};

export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                variants={pageVariants}
                initial="initial"
                animate="enter"
                exit="exit"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
