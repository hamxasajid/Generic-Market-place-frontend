"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { type Agent } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
    CheckIcon,
    ArrowRightIcon,
    PlayIcon,
} from "@heroicons/react/24/outline";

export interface WorkflowAgentUIProps {
    agent: Agent;
}

const mockSteps = [
    { id: 1, name: "Input Data", status: "completed" as const },
    { id: 2, name: "Process Request", status: "current" as const },
    { id: 3, name: "Validate Output", status: "pending" as const },
    { id: 4, name: "Generate Report", status: "pending" as const },
    { id: 5, name: "Deliver Results", status: "pending" as const },
];

export function WorkflowAgentUI({ agent }: WorkflowAgentUIProps) {
    const [steps, setSteps] = useState(mockSteps);
    const [isRunning, setIsRunning] = useState(false);
    const allCompleted = steps.every((s) => s.status === "completed");

    const runWorkflow = () => {
        setIsRunning(true);
        let currentStep = steps.findIndex((s) => s.status === "current");

        const interval = setInterval(() => {
            setSteps((prev) => {
                const newSteps = [...prev];
                if (currentStep >= 0 && currentStep < newSteps.length) {
                    newSteps[currentStep].status = "completed" as const;
                    if (currentStep + 1 < newSteps.length) {
                        newSteps[currentStep + 1].status = "current" as const;
                    }
                    currentStep++;
                }
                if (currentStep >= newSteps.length) {
                    clearInterval(interval);
                    setIsRunning(false);
                }
                return newSteps;
            });
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <Card variant="default" padding="lg">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white text-xl">
                            {agent.icon}
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">{agent.name} – Workflow</h3>
                            <p className="text-sm text-foreground-secondary mt-0.5">{agent.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant={isRunning ? "primary" : allCompleted ? "success" : "default"}>
                            {isRunning ? "Running" : allCompleted ? "Completed" : "Ready"}
                        </Badge>
                        <Badge variant="default">{agent.category}</Badge>
                        {allCompleted ? (
                            <Button onClick={() => setSteps(mockSteps)} size="sm">
                                Restart
                            </Button>
                        ) : (
                            <Button onClick={runWorkflow} isLoading={isRunning} disabled={isRunning}>
                                <PlayIcon className="h-4 w-4" />
                                Run Workflow
                            </Button>
                        )}
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/40 to-border" />
                    <div className="space-y-6">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative flex items-center gap-4"
                            >
                                <div
                                    className={cn(
                                        "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2",
                                        step.status === "completed" && "bg-primary-600 border-primary-600 text-white",
                                        step.status === "current" && "bg-primary-100 border-primary-600 text-primary-600 ring-2 ring-primary-500/30",
                                        step.status === "pending" && "bg-background border-border text-foreground-muted"
                                    )}
                                >
                                    {step.status === "completed" ? (
                                        <CheckIcon className="h-5 w-5" />
                                    ) : (
                                        <span className="font-medium">{step.id}</span>
                                    )}
                                </div>
                                <div className={cn(
                                    "flex-1 flex items-center justify-between rounded-md",
                                    step.status === "current" && "bg-background/60 border border-border/60 backdrop-blur-sm px-3 py-2"
                                )}>
                                    <span
                                        className={`font-medium ${step.status === "pending"
                                                ? "text-foreground-muted"
                                                : "text-foreground"
                                            }`}
                                    >
                                        {step.name}
                                    </span>
                                    <Badge
                                        variant={
                                            step.status === "completed"
                                                ? "success"
                                                : step.status === "current"
                                                    ? "primary"
                                                    : "default"
                                        }
                                    >
                                        {step.status}
                                    </Badge>
                                </div>
                                {index < steps.length - 1 && (
                                    <ArrowRightIcon className="h-4 w-4 text-foreground-muted absolute -right-8 hidden lg:block" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
}
