import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider, Sidebar, LayoutShell } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { BrandThemeWrapper } from "@/components/theme/BrandThemeWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Agents Hive - Homeland of One Million AI Agents",
  description:
    "The ultimate platform for AI agents. Discover, deploy, and manage millions of AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SidebarProvider>
            <BrandThemeWrapper>
              <div className="flex min-h-screen">
                <Sidebar />
                <LayoutShell>{children}</LayoutShell>
              </div>
            </BrandThemeWrapper>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
