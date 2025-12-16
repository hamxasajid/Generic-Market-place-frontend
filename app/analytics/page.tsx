"use client";

import { Topbar, MainContent, PageTransition } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui";
import { DASHBOARD_STATS } from "@/lib/constants";

const mockChartData = {
    daily: [65, 78, 82, 75, 89, 94, 88, 92, 85, 90, 95, 88, 82, 78],
    weekly: [450, 520, 480, 610, 580, 650, 720],
};

const mockTopAgents = [
    { name: "ChatBot Pro", requests: 45230, change: "+12%" },
    { name: "Data Analyst", requests: 38450, change: "+8%" },
    { name: "Code Assistant", requests: 32100, change: "+15%" },
    { name: "Content Writer", requests: 28750, change: "+5%" },
    { name: "Image Generator", requests: 24300, change: "+22%" },
];

export default function AnalyticsPage() {
    const maxRequests = Math.max(...mockTopAgents.map((a) => a.requests));

    return (
        <>
            <Topbar
                title="Analytics"
                subtitle="Monitor your agents' performance and usage"
            />
            <MainContent>
                <PageTransition>
                    <div className="space-y-6">
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {DASHBOARD_STATS.map((stat) => (
                                <Card key={stat.id} variant="default" padding="md">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-2xl">{stat.icon}</span>
                                        <Badge
                                            variant={
                                                stat.changeType === "positive"
                                                    ? "success"
                                                    : stat.changeType === "negative"
                                                        ? "error"
                                                        : "default"
                                            }
                                        >
                                            {stat.change}
                                        </Badge>
                                    </div>
                                    <p className="text-2xl font-bold text-foreground">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm text-foreground-secondary">
                                        {stat.label}
                                    </p>
                                </Card>
                            ))}
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Daily Requests Chart */}
                            <Card variant="default" padding="lg">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Daily Requests</CardTitle>
                                        <Badge variant="primary">Last 14 days</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="h-48 flex items-end gap-2">
                                        {mockChartData.daily.map((value, index) => (
                                            <div
                                                key={index}
                                                className="flex-1 bg-primary-100 hover:bg-primary-200 rounded-t transition-colors"
                                                style={{ height: `${value}%` }}
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Weekly Trend */}
                            <Card variant="default" padding="lg">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Weekly Trend</CardTitle>
                                        <Badge variant="primary">This week</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="h-48 flex items-end gap-4">
                                        {mockChartData.weekly.map((value, index) => {
                                            const maxVal = Math.max(...mockChartData.weekly);
                                            const height = (value / maxVal) * 100;
                                            const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                                            return (
                                                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                                    <div
                                                        className="w-full bg-primary-500 hover:bg-primary-600 rounded-t transition-colors"
                                                        style={{ height: `${height}%` }}
                                                    />
                                                    <span className="text-xs text-foreground-muted">
                                                        {days[index]}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Top Agents */}
                        <Card variant="default" padding="lg">
                            <CardHeader>
                                <CardTitle>Top Performing Agents</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    {mockTopAgents.map((agent, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-medium text-foreground-muted w-6">
                                                        #{index + 1}
                                                    </span>
                                                    <span className="font-medium text-foreground">
                                                        {agent.name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm text-foreground-secondary">
                                                        {agent.requests.toLocaleString()} requests
                                                    </span>
                                                    <Badge variant="success" size="sm">
                                                        {agent.change}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary-500 rounded-full transition-all"
                                                    style={{
                                                        width: `${(agent.requests / maxRequests) * 100}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </PageTransition>
            </MainContent>
        </>
    );
}
