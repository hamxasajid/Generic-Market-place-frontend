"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { type DashboardStat } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface StatCardProps {
    stat: DashboardStat;
    index?: number;
}

export function StatCard({ stat, index = 0 }: StatCardProps) {
    const changeColors = {
        positive: "text-emerald-600 bg-emerald-100",
        negative: "text-red-600 bg-red-100",
        neutral: "text-foreground-secondary bg-background-tertiary",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
        >
            <Card variant="default" padding="md" className="h-full">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{stat.icon}</span>
                    <span
                        className={cn(
                            "text-xs font-medium px-2 py-1 rounded-full",
                            changeColors[stat.changeType]
                        )}
                    >
                        {stat.change}
                    </span>
                </div>
                <div className="space-y-1">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-foreground-secondary">{stat.label}</p>
                </div>
            </Card>
        </motion.div>
    );
}
