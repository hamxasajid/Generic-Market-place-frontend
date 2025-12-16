"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { type Agent } from "@/lib/constants";

export interface FormAgentUIProps {
    agent: Agent;
}

export function FormAgentUI({ agent }: FormAgentUIProps) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        priority: "medium",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setResult(null);

        // Simulate form processing
        setTimeout(() => {
            setResult(`${agent.name} processed your request successfully! Form data received.`);
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="max-w-2xl">
            <Card variant="default" padding="lg">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white text-xl">
                            {agent.icon}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">{agent.name}</h2>
                            <p className="text-xs text-foreground-secondary">Provide details to run this agent</p>
                        </div>
                    </div>
                    <Badge variant="default">{agent.category}</Badge>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                            Title
                        </label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter a title"
                            disabled={isSubmitting}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Enter a description"
                            className="flex min-h-[100px] w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            disabled={isSubmitting}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="flex h-10 w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                disabled={isSubmitting}
                                required
                            >
                                <option value="">Select category</option>
                                <option value="general">General</option>
                                <option value="technical">Technical</option>
                                <option value="business">Business</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                Priority
                            </label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                className="flex h-10 w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                disabled={isSubmitting}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="pt-4">
                        <Button type="submit" isLoading={isSubmitting} className="w-full">
                            Process with {agent.name}
                        </Button>
                    </div>
                </form>
                {result && (
                    <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-[var(--radius-md)]">
                        <p className="text-sm text-primary-700">{result}</p>
                    </div>
                )}
            </Card>
        </div>
    );
}
