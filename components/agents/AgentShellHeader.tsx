"use client";

import { useState } from "react";
import { type Agent, AGENT_STATUSES, AGENT_UI_TYPES } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import {
    ArrowLeftIcon,
    EllipsisHorizontalIcon,
    Cog6ToothIcon,
    ArrowPathIcon,
    DocumentTextIcon,
    KeyIcon,
    ClipboardDocumentIcon, // For Copy
    CheckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment } from "react";

export interface AgentShellHeaderProps {
    agent: Agent;
}

export function AgentShellHeader({ agent }: AgentShellHeaderProps) {
    const status = AGENT_STATUSES[agent.status];
    const uiType = AGENT_UI_TYPES[agent.uiType];

    // Modal States
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [isLogsOpen, setIsLogsOpen] = useState(false);
    const [isKeysOpen, setIsKeysOpen] = useState(false);

    // Restart State
    const [isRestarting, setIsRestarting] = useState(false);

    // Copy State for API Key
    const [copiedKey, setCopiedKey] = useState(false);

    const handleRestart = () => {
        setIsRestarting(true);
        // Simulate restart
        setTimeout(() => {
            setIsRestarting(false);
            alert("Agent '" + agent.name + "' restarted successfully.");
        }, 2000);
    };

    const handleCopyKey = () => {
        navigator.clipboard.writeText(`sk_live_${agent.id}_8923487234`);
        setCopiedKey(true);
        setTimeout(() => setCopiedKey(false), 2000);
    };

    // Integration Logic (DRY)
    const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
    const [integrationStatus, setIntegrationStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');

    const handleIntegrationSelect = (value: string) => {
        if (!value) return;
        setSelectedIntegration(value);
        setIntegrationStatus('idle');
        // We keep the Config modal open in background or close it? 
        // Typically standard is to keep it, but let's layer them.
        // Or for simplicity, we focus on the Integration Modal.
    };

    const handleConnect = () => {
        setIntegrationStatus('connecting');
        setTimeout(() => {
            setIntegrationStatus('connected');
        }, 2000); // Simulate network request
    };

    const handleIntegrationClose = () => {
        setSelectedIntegration(null);
        setIntegrationStatus('idle');
    };

    return (
        <>
            <div className="flex items-center justify-between pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                    <Link href="/agents">
                        <Button variant="ghost" size="sm">
                            <ArrowLeftIcon className="h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div className="h-6 w-px bg-border" />
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-primary-100 text-2xl">
                            {agent.icon}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-semibold text-foreground">
                                    {agent.name}
                                </h1>
                                <span className={`h-2.5 w-2.5 rounded-full ${status.color}`} />
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                                <Badge variant="primary" size="sm">
                                    {uiType.label}
                                </Badge>
                                <span className="text-sm text-foreground-muted">
                                    by AI AGENTSHIVE
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsConfigOpen(true)}>
                        <Cog6ToothIcon className="h-4 w-4 mr-1.5" />
                        Configure
                    </Button>

                    {/* Headless UI Menu for More Options */}
                    <Menu as="div" className="relative inline-block text-left">
                        <MenuButton as={Fragment}>
                            <Button variant="ghost" size="sm" isLoading={isRestarting}>
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                            </Button>
                        </MenuButton>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-border rounded-xl bg-background border border-border/50 shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                                <div className="p-1">
                                    <MenuItem>
                                        {({ active }) => (
                                            <button
                                                onClick={() => setIsLogsOpen(true)}
                                                className={`${active ? "bg-background-tertiary text-foreground" : "text-foreground-secondary"
                                                    } group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-colors`}
                                            >
                                                <DocumentTextIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                                                View Logs
                                            </button>
                                        )}
                                    </MenuItem>
                                    <MenuItem>
                                        {({ active }) => (
                                            <button
                                                onClick={() => setIsKeysOpen(true)}
                                                className={`${active ? "bg-background-tertiary text-foreground" : "text-foreground-secondary"
                                                    } group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-colors`}
                                            >
                                                <KeyIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                                                API Keys
                                            </button>
                                        )}
                                    </MenuItem>
                                </div>
                                <div className="p-1">
                                    <MenuItem>
                                        {({ active }) => (
                                            <button
                                                onClick={handleRestart}
                                                className={`${active ? "bg-background-tertiary text-foreground" : "text-foreground-secondary"
                                                    } group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-colors`}
                                            >
                                                <ArrowPathIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                                                Restart Agent
                                            </button>
                                        )}
                                    </MenuItem>
                                </div>
                                {/* Removed Delete Agent as requested */}
                            </MenuItems>
                        </Transition>
                    </Menu>
                </div>
            </div>

            {/* Configuration Modal */}
            <Modal
                isOpen={isConfigOpen}
                onClose={() => setIsConfigOpen(false)}
                title={`Configure ${agent.name}`}
                description="Manage global settings and connections for this agent."
                size="md"
            >
                <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Instance Name</label>
                        <Input defaultValue={agent.name} />
                    </div>



                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Connection Mode</label>
                        <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <option>Cloud Hosted (Managed)</option>
                            <option>On-Premise Bridge</option>
                            <option>Hybrid</option>
                        </select>
                    </div>

                    {/* Dynamic Category-Specific Settings with Integration Trigger */}
                    {agent.category === "Accounting" && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Accounting Integration</label>
                            <select
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                onChange={(e) => handleIntegrationSelect(e.target.value)}
                                value="" // Always reset to prompt selection
                            >
                                <option value="" disabled>Select Provider...</option>
                                <option value="QuickBooks Online">QuickBooks Online</option>
                                <option value="Xero">Xero</option>
                                <option value="Sage Intacct">Sage Intacct</option>
                                <option value="NetSuite">NetSuite</option>
                            </select>
                        </div>
                    )}

                    {agent.category === "HR" && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">HRIS Provider</label>
                            <select
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                onChange={(e) => handleIntegrationSelect(e.target.value)}
                                value=""
                            >
                                <option value="" disabled>Select Provider...</option>
                                <option value="Workday">Workday</option>
                                <option value="BambooHR">BambooHR</option>
                                <option value="Rippling">Rippling</option>
                                <option value="Gusto">Gusto</option>
                            </select>
                        </div>
                    )}

                    {agent.category === "Support" && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Ticketing System</label>
                            <select
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                onChange={(e) => handleIntegrationSelect(e.target.value)}
                                value=""
                            >
                                <option value="" disabled>Select Provider...</option>
                                <option value="Zendesk">Zendesk</option>
                                <option value="Jira Service Management">Jira Service Management</option>
                                <option value="Intercom">Intercom</option>
                                <option value="Freshdesk">Freshdesk</option>
                            </select>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Spending Limit (USD/mo)</label>
                        <Input type="number" defaultValue="50.00" />
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setIsConfigOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setIsConfigOpen(false)}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* View Logs Modal */}
            <Modal
                isOpen={isLogsOpen}
                onClose={() => setIsLogsOpen(false)}
                title="System Logs"
                description={`Recent activity logs for ${agent.name}.`}
                size="lg"
            >
                <div className="bg-zinc-950 text-zinc-300 p-4 rounded-lg font-mono text-xs h-64 overflow-y-auto space-y-1">
                    <div className="flex gap-2"><span className="text-zinc-500">[2023-10-27 10:42:01]</span> <span className="text-emerald-400">INFO</span> Agent initialization started...</div>
                    <div className="flex gap-2"><span className="text-zinc-500">[2023-10-27 10:42:02]</span> <span className="text-emerald-400">INFO</span> Connected to vector database 'finance-docs'.</div>
                    <div className="flex gap-2"><span className="text-zinc-500">[2023-10-27 10:42:05]</span> <span className="text-emerald-400">INFO</span> Model loaded: gpt-4-turbo-preview.</div>
                    <div className="flex gap-2"><span className="text-zinc-500">[2023-10-27 10:45:12]</span> <span className="text-blue-400">REQ</span> Processed invoice #INV-2024-001 (0.4s).</div>
                    <div className="flex gap-2"><span className="text-zinc-500">[2023-10-27 10:48:30]</span> <span className="text-blue-400">REQ</span> Summarized monthly report.</div>
                    <div className="flex gap-2"><span className="text-zinc-500">[2023-10-27 11:02:11]</span> <span className="text-amber-400">WARN</span> Response latency higher than usual (1.2s).</div>
                    <div className="flex gap-2"><span className="text-zinc-500">[2023-10-27 11:15:00]</span> <span className="text-emerald-400">INFO</span> Scheduled backup completed.</div>
                </div>
                <div className="pt-4 flex justify-end">
                    <Button variant="ghost" onClick={() => setIsLogsOpen(false)}>
                        Close
                    </Button>
                </div>
            </Modal>

            {/* API Keys Modal */}
            <Modal
                isOpen={isKeysOpen}
                onClose={() => setIsKeysOpen(false)}
                title="API Keys"
                description="Manage access tokens for this agent. Keep this key secret!"
                size="md"
            >
                <div className="pt-2 space-y-4">
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-800 dark:text-amber-200 text-sm">
                        This key will allow access to all agent capabilities. Do not share it publicly.
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Secret Key</label>
                        <div className="flex gap-2">
                            <Input readOnly value={`sk_live_${agent.id}_8923487234`} className="font-mono text-xs" />
                            <Button variant="outline" size="icon" onClick={handleCopyKey} title="Copy Key">
                                {copiedKey ? <CheckIcon className="h-4 w-4 text-emerald-500" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                        <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            Revoke Key
                        </Button>
                        <Button onClick={() => setIsKeysOpen(false)}>
                            Done
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Integration Setup Modal (DRY implementation for all providers) */}
            <Modal
                isOpen={selectedIntegration !== null}
                onClose={handleIntegrationClose}
                title={`Connect to ${selectedIntegration}`}
                description="Follow the steps to authorize the connection."
                size="md"
            >
                <div className="pt-4 space-y-6">
                    {/* Step Indicator */}
                    <div className="flex items-center justify-between px-8">
                        <div className="flex flex-col items-center gap-2">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${integrationStatus === 'idle' ? 'bg-primary-600 text-white' : 'bg-primary-100 text-primary-600'
                                }`}>
                                1
                            </div>
                            <span className="text-[10px] text-foreground-secondary uppercase tracking-wider">Auth</span>
                        </div>
                        <div className="h-px bg-border flex-1 mx-4" />
                        <div className="flex flex-col items-center gap-2">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${integrationStatus === 'connecting' ? 'bg-primary-600 text-white' :
                                integrationStatus === 'connected' ? 'bg-emerald-500 text-white' : 'bg-background-tertiary text-foreground-muted'
                                }`}>
                                {integrationStatus === 'connected' ? <CheckIcon className="h-4 w-4" /> : '2'}
                            </div>
                            <span className="text-[10px] text-foreground-secondary uppercase tracking-wider">Connect</span>
                        </div>
                    </div>

                    {/* Content Container */}
                    <div className="bg-background-secondary rounded-xl p-6 border border-border/50 text-center">
                        {integrationStatus === 'idle' && (
                            <div className="space-y-4">
                                <div className="mx-auto h-12 w-12 bg-white rounded-lg shadow-sm flex items-center justify-center">
                                    {/* Placeholder specific brand icons could go here */}
                                    <span className="text-xl font-bold text-zinc-900">{selectedIntegration?.charAt(0)}</span>
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground">Authorize Access</h4>
                                    <p className="text-sm text-foreground-secondary mt-1 max-w-xs mx-auto">
                                        You are redirected to {selectedIntegration} to approve access for <strong>{agent.name}</strong>.
                                    </p>
                                </div>
                                <div className="text-xs text-foreground-muted bg-background p-3 rounded-lg text-left space-y-1.5">
                                    <p className="font-medium">Permissions requested:</p>
                                    <ul className="list-disc pl-4 space-y-0.5">
                                        <li>Read organization data</li>
                                        <li>Sync records and documents</li>
                                        <li>Offline access</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {integrationStatus === 'connecting' && (
                            <div className="py-8 space-y-4">
                                <ArrowPathIcon className="h-10 w-10 text-primary-500 animate-spin mx-auto" />
                                <p className="text-sm font-medium text-foreground">Connecting to {selectedIntegration}...</p>
                            </div>
                        )}

                        {integrationStatus === 'connected' && (
                            <div className="py-6 space-y-4">
                                <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                    <CheckIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground">Successfully Connected!</h4>
                                    <p className="text-sm text-foreground-secondary mt-1">
                                        {agent.name} is now synced with {selectedIntegration}.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        {integrationStatus === 'idle' ? (
                            <>
                                <Button variant="ghost" onClick={handleIntegrationClose}>Cancel</Button>
                                <Button onClick={handleConnect}>Connect Account</Button>
                            </>
                        ) : integrationStatus === 'connecting' ? (
                            <Button disabled>Processing...</Button>
                        ) : (
                            <Button onClick={handleIntegrationClose}>Done</Button>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
}

