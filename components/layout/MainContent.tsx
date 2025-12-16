"use client";

export interface MainContentProps {
    children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
    return (
        <main className="min-h-[calc(100vh-var(--topbar-height))]">
            <div className="p-6">
                {children}
            </div>
        </main>
    );
}
