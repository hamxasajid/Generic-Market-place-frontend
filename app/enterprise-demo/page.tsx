"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { PermissionGate } from "@/components/auth/PermissionGate";
import { EmptyState } from "@/components/ui/EmptyState";
import { useBrandTheme } from "@/components/theme/BrandThemeWrapper";
import { ExclamationCircleIcon, PaintBrushIcon } from "@heroicons/react/24/outline";

// --- Mock Data ---
type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <span className={
                row.getValue("status") === 'success' ? 'text-green-600 font-medium' :
                    row.getValue("status") === 'failed' ? 'text-red-500' : 'text-yellow-600'
            }>
                {String(row.getValue("status")).toUpperCase()}
            </span>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return <div className="font-medium text-right">{formatted}</div>;
        },
    },
];

const data: Payment[] = [
    { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
    { id: "489e1d42", amount: 125, status: "processing", email: "example@gmail.com" },
    { id: "e12f342a", amount: 550, status: "success", email: "success@test.com" },
    { id: "f234f23b", amount: 20, status: "failed", email: "failed@test.com" },
    { id: "d234d6y7", amount: 777, status: "success", email: "lucky@test.com" },
];

export default function EnterpriseDemoPage() {
    const { setBrandColor } = useBrandTheme();
    const [density, setDensity] = useState<"normal" | "compact">("normal");

    return (
        <div className="p-8 space-y-12 max-w-5xl mx-auto">

            <section className="space-y-4">
                <h1 className="text-3xl font-bold">Enterprise Capability Verification</h1>
                <p className="text-foreground-secondary">
                    Demonstrating Data Grids, RBAC, and Dynamic Theming.
                </p>
            </section>

            {/* 1. DATA TABLE DEMO */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">1. High-Density Data Grid</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setDensity("normal")}
                            className={`px-3 py-1 rounded border ${density === 'normal' ? 'bg-primary-100 border-primary-500' : ''}`}
                        >
                            Normal
                        </button>
                        <button
                            onClick={() => setDensity("compact")}
                            className={`px-3 py-1 rounded border ${density === 'compact' ? 'bg-primary-100 border-primary-500' : ''}`}
                        >
                            Compact
                        </button>
                    </div>
                </div>
                <DataTable columns={columns} data={data} density={density} />
            </section>

            {/* 2. RBAC DEMO */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">2. Role-Based Visibility</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-4 border border-border rounded-xl">
                        <h3 className="font-medium mb-2">Hidden Strategy (Fallback: Null)</h3>
                        <p className="text-sm text-foreground-secondary mb-4">
                            The button below requires 'admin' permission. You have 'member'.
                        </p>
                        <PermissionGate requiredPermission="admin" fallback="hidden">
                            <button className="px-4 py-2 bg-red-600 text-white rounded">
                                Delete Database
                            </button>
                        </PermissionGate>
                    </div>

                    <div className="p-4 border border-border rounded-xl">
                        <h3 className="font-medium mb-2">Locked Strategy (Fallback: Locked)</h3>
                        <p className="text-sm text-foreground-secondary mb-4">
                            The settings panel below is locked for non-admins.
                        </p>
                        <PermissionGate requiredPermission="admin" fallback="locked">
                            <div className="p-4 bg-muted rounded-lg">
                                <span className="font-semibold">Advanced Config</span>
                                <div className="h-2 w-full bg-slate-200 mt-2 rounded"></div>
                                <div className="h-2 w-2/3 bg-slate-200 mt-2 rounded"></div>
                            </div>
                        </PermissionGate>
                    </div>
                </div>
            </section>

            {/* 3. WHITE LABEL DEMO */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">3. Dynamic Branding</h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => setBrandColor("#ef4444")} // Red
                        className="h-10 w-10 rounded-full bg-red-500 border-2 border-white shadow-lg"
                    />
                    <button
                        onClick={() => setBrandColor("#10b981")} // Emerald
                        className="h-10 w-10 rounded-full bg-emerald-500 border-2 border-white shadow-lg"
                    />
                    <button
                        onClick={() => setBrandColor(null)} // Reset
                        className="px-4 py-2 rounded-lg border border-border"
                    >
                        Reset Default
                    </button>
                </div>
                <div className="mt-4 p-4 border border-border rounded-xl">
                    <p className="text-primary-600 font-bold text-lg">
                        This text uses 'text-primary-600' and changes dynamically.
                    </p>
                </div>
            </section>

            {/* 4. EMPTY STATE */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">4. Empty States</h2>
                <EmptyState
                    title="No Agents Found"
                    description="You haven't deployed any agents in this organization yet."
                    icon={ExclamationCircleIcon}
                    action={
                        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                            Deploy Agent
                        </button>
                    }
                />
            </section>
        </div>
    );
}
