"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { type Agent, type DashboardWidget } from "@/lib/constants";
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    ClockIcon,
    CurrencyDollarIcon,
    ArrowPathIcon,
    ShieldCheckIcon,
    ChartBarIcon
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export interface DashboardAgentUIProps {
    agent: Agent;
}

// Map string icon names to components
const ICON_MAP: Record<string, any> = {
    ShieldCheckIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    ClockIcon,
    CurrencyDollarIcon,
    ChartBarIcon
};

// Mock Data for generic state
const MOCK_DATA = {
    "Accounting": {
        items: [
            { id: 1, text: "Flagged 'Starbucks' charge as Personal", amount: "$14.50", confidence: "High" },
            { id: 2, text: "Unusual vendor 'Garry's Supplies'", amount: "$450.00", confidence: "Medium" },
            { id: 3, text: "Duplicate invoice detected #INV-002", amount: "$1,200.00", confidence: "High" },
        ],
        mainMetric: 1240,
        subMetric: "12,847"
    },
    "Sales Funnel": {
        items: [
            { id: 1, text: "New Enterprise Lead: TechCorp", amount: "$12k", confidence: "Hot" },
            { id: 2, text: "Deal Stalled: Omega Inc", amount: "$45k", confidence: "Risk" },
            { id: 3, text: "Contract Sent: Alpha LLC", amount: "$8.5k", confidence: "High" },
        ],
        mainMetric: 45, // Leads
        subMetric: "$142k" // Pipeline Value
    },
    "HR & Payroll": {
        items: [
            { id: 1, text: "Candidate Match: Snr Dev", amount: "98%", confidence: "High" },
            { id: 2, text: "Missing Timesheet: A. Smith", amount: "2 Days", confidence: "Med" },
        ],
        mainMetric: 12, // Open roles
        subMetric: "15", // Interviews
        chartData: [
            { name: 'Mon', value: 4 },
            { name: 'Tue', value: 3 },
            { name: 'Wed', value: 7 },
            { name: 'Thu', value: 5 },
            { name: 'Fri', value: 8 },
            { name: 'Sat', value: 2 },
            { name: 'Sun', value: 4 },
        ]
    }
};

// Add chart data to other categories as well
// @ts-ignore
MOCK_DATA["Accounting"].chartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
];

// @ts-ignore
MOCK_DATA["Sales Funnel"].chartData = [
    { name: 'Wk1', value: 12 },
    { name: 'Wk2', value: 19 },
    { name: 'Wk3', value: 15 },
    { name: 'Wk4', value: 22 },
];

const DEFAULT_DATA = MOCK_DATA["Accounting"];

export function DashboardAgentUI({ agent }: DashboardAgentUIProps) {
    // @ts-ignore
    const initialData = MOCK_DATA[agent.category] || DEFAULT_DATA;

    const [anomalies, setAnomalies] = useState<any[]>(initialData.items);
    const [mainMetric, setMainMetric] = useState(initialData.mainMetric);
    // @ts-ignore
    const [subMetric, setSubMetric] = useState(initialData.subMetric);
    const [isScanning, setIsScanning] = useState(true);

    // Simulate scanning effect
    useEffect(() => {
        const interval = setInterval(() => {
            setIsScanning(prev => !prev);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Update state when agent changes
    useEffect(() => {
        // @ts-ignore
        const newData = MOCK_DATA[agent.category] || DEFAULT_DATA;
        setAnomalies(newData.items);
        setMainMetric(newData.mainMetric);
        // @ts-ignore
        setSubMetric(newData.subMetric);
    }, [agent.category]);

    const handleAction = (id: number, action: 'approve' | 'reject') => {
        setAnomalies(prev => prev.filter(a => a.id !== id));
        if (action === 'approve') {
            // @ts-ignore
            setMainMetric(prev => typeof prev === 'number' ? prev + 1 : prev);
        }
    };

    // Data Mapping: Connects generic keys in JSON to live state
    const dataMap: Record<string, any> = {
        mainMetric: typeof mainMetric === 'number' ? mainMetric.toLocaleString() : mainMetric,
        subMetric: subMetric,
        savings: typeof mainMetric === 'number' ? `$${mainMetric.toLocaleString()}` : mainMetric, // Backwards compat or alias
        categorized: subMetric, // Alias
        anomalies_count: anomalies.length,
        anomalies_list: anomalies,
        logs: [1, 2, 3, 4, 5],
        // @ts-ignore
        chartData: initialData.chartData || []
    };

    if (!agent.dashboardConfig) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center text-foreground-secondary">
                <ExclamationTriangleIcon className="h-12 w-12 mb-4 text-amber-500" />
                <h3 className="text-lg font-medium text-foreground">No Dashboard Configuration</h3>
                <p>This agent does not have a dashboard layout defined.</p>
            </div>
        );
    }

    const renderWidget = (widget: DashboardWidget) => {
        const config = widget.config || {};
        const Icon = config.icon ? ICON_MAP[config.icon] : null;
        // @ts-ignore
        const variant = config.variant || "default";

        // Resolve dynamic data if a key is provided, otherwise use static value
        const displayValue = config.dataKey && dataMap[config.dataKey] !== undefined
            ? dataMap[config.dataKey]
            : config.value;

        switch (widget.type) {
            case 'stat_card':
                return (
                    <Card key={widget.id} variant="default" padding="lg" className="h-full">
                        <div className="flex items-start justify-between mb-4">
                            {Icon && (
                                <div className={`p-2 rounded-lg ${variant === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                                    variant === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                                        variant === 'error' ? 'bg-red-500/10 text-red-500' :
                                            'bg-indigo-500/10 text-indigo-500'
                                    }`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                            )}
                            {config.trend && (
                                <Badge variant={variant as any} size="sm">{config.trend}</Badge>
                            )}
                            {config.subtext === 'Requires your review.' && (
                                <Badge variant="outline" size="sm" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Action Needed</Badge>
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-foreground-secondary font-medium">{widget.title}</p>
                            <h3 className="text-3xl font-bold text-foreground mt-1">{displayValue}</h3>
                            {config.subtext && config.subtext !== 'Requires your review.' && (
                                <p className="text-xs text-foreground-muted mt-2">{config.subtext}</p>
                            )}
                        </div>
                    </Card>
                );

            case 'list_feed':
                const items = displayValue as any[]; // Cast for now
                return (
                    <div key={widget.id} className="space-y-4 h-full">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-foreground">{widget.title}</h3>
                            <Button variant="ghost" size="sm">
                                <ArrowPathIcon className="h-4 w-4 mr-2" />
                                Refresh
                            </Button>
                        </div>
                        <div className="space-y-3">
                            <AnimatePresence>
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        layout
                                    >
                                        <Card variant="default" padding="md" className="border-l-4 border-l-amber-500">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Badge variant="outline" size="sm" className="text-amber-500 border-amber-500/20">
                                                            {item.confidence} Confidence
                                                        </Badge>
                                                        <span className="text-xs text-foreground-muted">Just now</span>
                                                    </div>
                                                    <p className="text-foreground font-medium">{item.text}</p>
                                                    <p className="text-lg font-bold text-foreground mt-1">{item.amount}</p>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleAction(item.id, 'approve')}>
                                                        Confirm AI
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10" onClick={() => handleAction(item.id, 'reject')}>
                                                        Reject
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {items.length === 0 && (
                                <div className="flex flex-col items-center justify-center p-12 bg-background-secondary rounded-xl border border-dashed border-border">
                                    <CheckCircleIcon className="h-12 w-12 text-emerald-500 mb-3" />
                                    <h3 className="text-foreground font-medium">All caught up!</h3>
                                    <p className="text-foreground-secondary text-sm">No new {widget.title.toLowerCase()} detected.</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'activity_log':
                return (
                    <div key={widget.id} className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">{widget.title}</h3>
                        <Card variant="default" padding="none" className="divide-y divide-border">
                            {(displayValue as number[]).map((i) => (
                                <div key={i} className="p-4 flex gap-3 text-sm">
                                    <div className="mt-0.5">
                                        <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-foreground">Autonomously processed data point <strong>#{8192 + i}</strong></p>
                                        <p className="text-xs text-foreground-muted mt-0.5">{i * 12} mins ago</p>
                                    </div>
                                </div>
                            ))}
                            <div className="p-3 bg-background-tertiary text-center text-xs text-foreground-secondary cursor-pointer hover:text-foreground">
                                View all logs
                            </div>
                        </Card>
                    </div>
                );



            case 'chart':
                return (
                    <Card key={widget.id} variant="default" padding="lg" className="h-[350px] flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-foreground">{widget.title}</h3>
                            {config.subtext && <p className="text-sm text-foreground-secondary">{config.subtext}</p>}
                        </div>
                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={displayValue as any[]}>
                                    <defs>
                                        <linearGradient id={`${widget.id}-gradient`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={variant === 'success' ? '#10b981' : '#6366f1'} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={variant === 'success' ? '#10b981' : '#6366f1'} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="hsl(var(--foreground-muted))"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="hsl(var(--foreground-muted))"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--background))',
                                            borderColor: 'hsl(var(--border))',
                                            borderRadius: 'var(--radius)',
                                            color: 'hsl(var(--foreground))'
                                        }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke={variant === 'success' ? '#10b981' : '#6366f1'}
                                        fillOpacity={1}
                                        fill={`url(#${widget.id}-gradient)`}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header / Live Status */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-foreground">Intelligence Center</h2>
                    <p className="text-sm text-foreground-secondary">Real-time oversight for <span className="text-foreground font-medium">{agent.name}</span>.</p>
                </div>
                <div className="flex items-center gap-3 bg-background-secondary px-4 py-2 rounded-full border border-border">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                        {isScanning ? "Scanning..." : "Active"}
                    </span>
                    <span className="text-xs text-foreground-muted border-l border-border pl-3">
                        {agent.category}
                    </span>
                </div>
            </div>

            {/* Dynamic Sections */}
            {agent.dashboardConfig.sections.map((section) => (
                <div
                    key={section.id}
                    className={
                        section.layout === 'grid'
                            ? `grid grid-cols-1 md:grid-cols-${section.columns || 3} gap-6`
                            : 'flex flex-col gap-6'
                    }
                >
                    {section.widgets.map((widget) => {
                        // Handle column spanning if specified in width for grid items
                        const colSpanClass = widget.width === '2/3' ? 'md:col-span-2' :
                            widget.width === 'full' ? 'md:col-span-full' : '';

                        return (
                            <div key={widget.id} className={colSpanClass}>
                                {renderWidget(widget)}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
