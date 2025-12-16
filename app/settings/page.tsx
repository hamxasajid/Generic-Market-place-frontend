"use client";

import { useState } from "react";
import { Topbar, MainContent, PageTransition } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button, Input, Badge } from "@/components/ui";
import { Tabs } from "@/components/ui/Tabs";
import {
    UserCircleIcon,
    BellIcon,
    ShieldCheckIcon,
    CreditCardIcon,
    KeyIcon,
} from "@heroicons/react/24/outline";

function ProfileSettings() {
    return (
        <Card variant="default" padding="lg">
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
                        <UserCircleIcon className="h-12 w-12 text-primary-600" />
                    </div>
                    <Button variant="outline">Change Avatar</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                            Full Name
                        </label>
                        <Input placeholder="John Doe" defaultValue="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                            Email
                        </label>
                        <Input type="email" placeholder="john@example.com" defaultValue="john@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                            Company
                        </label>
                        <Input placeholder="Your company" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                            Role
                        </label>
                        <Input placeholder="Your role" defaultValue="Developer" />
                    </div>
                </div>
                <div className="pt-4">
                    <Button>Save Changes</Button>
                </div>
            </CardContent>
        </Card>
    );
}

function NotificationSettings() {
    const notifications = [
        { id: "email", label: "Email Notifications", description: "Receive updates via email" },
        { id: "agent-alerts", label: "Agent Alerts", description: "Get notified when agents need attention" },
        { id: "usage-reports", label: "Usage Reports", description: "Weekly usage summary" },
        { id: "marketing", label: "Marketing", description: "News and product updates" },
    ];

    return (
        <Card variant="default" padding="lg">
            <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
                {notifications.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                            <p className="font-medium text-foreground">{item.label}</p>
                            <p className="text-sm text-foreground-secondary">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={item.id !== "marketing"} />
                            <div className="w-11 h-6 bg-background-tertiary peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function SecuritySettings() {
    return (
        <Card variant="default" padding="lg">
            <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Change Password</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                Current Password
                            </label>
                            <Input type="password" placeholder="••••••••" />
                        </div>
                        <div />
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                New Password
                            </label>
                            <Input type="password" placeholder="••••••••" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                Confirm Password
                            </label>
                            <Input type="password" placeholder="••••••••" />
                        </div>
                    </div>
                    <Button>Update Password</Button>
                </div>
                <div className="border-t border-border pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                            <p className="text-sm text-foreground-secondary">Add an extra layer of security</p>
                        </div>
                        <Badge variant="success">Enabled</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function BillingSettings() {
    return (
        <Card variant="default" padding="lg">
            <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>Manage your subscription and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg border border-primary-200">
                    <div>
                        <Badge variant="primary" className="mb-2">Pro Plan</Badge>
                        <p className="font-medium text-foreground">$49/month</p>
                        <p className="text-sm text-foreground-secondary">Next billing: Jan 15, 2025</p>
                    </div>
                    <Button variant="outline">Upgrade</Button>
                </div>
                <div>
                    <h4 className="font-medium text-foreground mb-4">Payment Method</h4>
                    <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                        <CreditCardIcon className="h-8 w-8 text-foreground-muted" />
                        <div>
                            <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                            <p className="text-sm text-foreground-secondary">Expires 12/26</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                            Edit
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function APIKeysSettings() {
    const apiKeys = [
        { name: "Production Key", key: "sk-prod-xxxx-xxxx", created: "Dec 1, 2024" },
        { name: "Development Key", key: "sk-dev-xxxx-xxxx", created: "Nov 15, 2024" },
    ];

    return (
        <Card variant="default" padding="lg">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>API Keys</CardTitle>
                        <CardDescription>Manage your API access tokens</CardDescription>
                    </div>
                    <Button size="sm">Generate New Key</Button>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-3">
                    {apiKeys.map((apiKey, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div>
                                <p className="font-medium text-foreground">{apiKey.name}</p>
                                <p className="text-sm font-mono text-foreground-muted">{apiKey.key}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-foreground-muted">{apiKey.created}</span>
                                <Button variant="ghost" size="sm">Revoke</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default function SettingsPage() {
    const tabItems = [
        { label: "Profile", content: <ProfileSettings /> },
        { label: "Notifications", content: <NotificationSettings /> },
        { label: "Security", content: <SecuritySettings /> },
        { label: "Billing", content: <BillingSettings /> },
        { label: "API Keys", content: <APIKeysSettings /> },
    ];

    return (
        <>
            <Topbar
                title="Settings"
                subtitle="Manage your account preferences"
            />
            <MainContent>
                <PageTransition>
                    <div className="max-w-4xl">
                        <Tabs items={tabItems} />
                    </div>
                </PageTransition>
            </MainContent>
        </>
    );
}
