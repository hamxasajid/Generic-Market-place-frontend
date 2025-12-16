"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Agent } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const columns: ColumnDef<Agent>[] = [
    {
        accessorKey: "name",
        header: "Agent Name",
        cell: ({ row }) => {
            return (
                <Link
                    href={`/agents/${row.original.id}`}
                    className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors -ml-2"
                >
                    <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary-100 text-lg">
                        {row.original.icon}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                            {row.getValue("name")}
                        </span>
                        <span className="text-xs text-foreground-secondary truncate max-w-[180px]">
                            {row.original.description}
                        </span>
                    </div>
                </Link>
            );
        },
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
            <Badge variant="default" className="font-normal">
                {row.getValue("category")}
            </Badge>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${status === 'online' ? 'bg-emerald-500' :
                        status === 'busy' ? 'bg-amber-500' : 'bg-red-500'
                        }`} />
                    <span className="capitalize text-foreground-secondary">{status}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "author",
        header: "Vendor",
        cell: () => (
            <span className="text-sm text-foreground-secondary">
                AI AGENTSHIVE
            </span>
        ),
    },

];
