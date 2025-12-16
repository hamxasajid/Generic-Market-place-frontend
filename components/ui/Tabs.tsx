"use client";

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { cn } from "@/lib/utils";

export interface TabItem {
    label: string;
    content: React.ReactNode;
}

export interface TabsProps {
    items: TabItem[];
    defaultIndex?: number;
    onChange?: (index: number) => void;
}

export function Tabs({ items, defaultIndex = 0, onChange }: TabsProps) {
    return (
        <TabGroup defaultIndex={defaultIndex} onChange={onChange}>
            <TabList className="flex gap-1 rounded-[var(--radius-lg)] bg-background-tertiary p-1">
                {items.map((item, index) => (
                    <Tab
                        key={index}
                        className={({ selected }) =>
                            cn(
                                "flex-1 rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium transition-all duration-[var(--transition-fast)]",
                                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                                selected
                                    ? "bg-background text-foreground shadow-[var(--shadow-sm)]"
                                    : "text-foreground-secondary hover:text-foreground"
                            )
                        }
                    >
                        {item.label}
                    </Tab>
                ))}
            </TabList>
            <TabPanels className="mt-4">
                {items.map((item, index) => (
                    <TabPanel key={index}>{item.content}</TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
    );
}
