// ========================================
// NAVIGATION ITEMS
// ========================================

import {
  HomeIcon,
  CubeIcon,
  Squares2X2Icon,
  ChartBarIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export const NAVIGATION_ITEMS = [
  {
    name: "Dashboard",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "My Agents",
    href: "/agents",
    icon: CubeIcon,
  },
  {
    name: "Marketplace",
    href: "/marketplace",
    icon: Squares2X2Icon,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: ChartBarIcon,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Cog6ToothIcon,
  },
  {
    name: "Help",
    href: "/help",
    icon: QuestionMarkCircleIcon,
  },
] as const;

// ========================================
// AGENT UI TYPES
// ========================================

export type AgentUIType = "chat" | "form" | "dashboard" | "workflow" | "embedded" | "api-only";

export const AGENT_UI_TYPES: Record<AgentUIType, { label: string; description: string }> = {
  chat: {
    label: "Chat Interface",
    description: "Conversational AI agent with chat UI",
  },
  form: {
    label: "Form Interface",
    description: "Structured input/output form-based agent",
  },
  dashboard: {
    label: "Dashboard",
    description: "Data visualization and monitoring agent",
  },
  workflow: {
    label: "Workflow",
    description: "Multi-step process automation agent",
  },
  embedded: {
    label: "Embedded App",
    description: "Full embedded application agent",
  },
  "api-only": {
    label: "API Only",
    description: "Headless agent with no UI",
  },
};

// ========================================
// AGENT STATUSES
// ========================================

export type AgentStatus = "online" | "offline" | "busy" | "error";

export const AGENT_STATUSES: Record<AgentStatus, { label: string; color: string }> = {
  online: {
    label: "Online",
    color: "bg-emerald-500",
  },
  offline: {
    label: "Offline",
    color: "bg-gray-400",
  },
  busy: {
    label: "Busy",
    color: "bg-amber-500",
  },
  error: {
    label: "Error",
    color: "bg-red-500",
  },
};

// ========================================
// MOCK AGENTS DATA
// ========================================

export interface Agent {
  id: string;
  name: string;
  description: string;
  uiType: AgentUIType;
  status: AgentStatus;
  category: string;
  rating: number;
  usageCount: number;
  createdAt: string;
  icon: string;
  author: string;
  dashboardConfig?: DashboardConfig;
}

export const AGENT_CATEGORIES = [
  "All",
  "Accounting",
  "HR & Payroll",
  "Sales Funnel",
  "Social Media",
  "Business Coach",
  "Customer Support",
] as const;

export const MOCK_AGENTS: Agent[] = [
  // ------------------------------------------------------------------
  // ACCOUNTING
  // ------------------------------------------------------------------
  {
    id: "acc-001",
    name: "LedgerKeeper AI",
    description: "Automated bookkeeping agent that categorizes transactions and reconciles ledgers in real-time.",
    uiType: "dashboard",
    status: "online",
    category: "Accounting",
    rating: 4.9,
    usageCount: 15420,
    createdAt: "2024-01-10",
    icon: "📒",
    author: "FinBooks Pro",
    dashboardConfig: {
      sections: [
        {
          id: "hero_metrics",
          layout: "grid",
          columns: 3,
          widgets: [
            {
              id: "savings_found",
              type: "stat_card",
              title: "Potential Savings Found",
              width: "third",
              config: {
                icon: "ShieldCheckIcon",
                variant: "default",
                value: "$1,255",
                trend: "+12% this week",
                dataKey: "savings"
              }
            },
            {
              id: "trans_categorized",
              type: "stat_card",
              title: "Transactions Categorized",
              width: "third",
              config: {
                icon: "CheckCircleIcon",
                variant: "success",
                value: "12,847",
                subtext: "Saving approx. 64 hours of manual work.",
                dataKey: "categorized"
              }
            },
            {
              id: "pending_anomalies",
              type: "stat_card",
              title: "Pending Anomalies",
              width: "third",
              config: {
                icon: "ExclamationTriangleIcon",
                variant: "warning",
                value: "3",
                subtext: "Requires your review.",
                dataKey: "anomalies_count"
              }
            }
          ]
        },
        {
          id: "main_feed",
          layout: "grid", // technically grid with col-span used in UI
          columns: 3,
          widgets: [
            {
              id: "decision_stream",
              type: "list_feed",
              title: "Decision Stream",
              width: "2/3",
              config: {
                dataKey: "anomalies_list"
              }
            },
            {
              id: "auto_log",
              type: "activity_log",
              title: "Auto-Log",
              width: "third",
              config: {
                dataKey: "logs"
              }
            }
          ]
        },
        {
          id: "analytics_overview",
          layout: "column",
          widgets: [
            {
              id: "cash_flow_chart",
              type: "chart",
              title: "Cash Flow Analysis",
              width: "full",
              config: {
                dataKey: "chartData",
                variant: "success", // used for color theme
                subtext: "Last 6 months performance"
              }
            }
          ]
        }
      ]
    }
  },
  {
    id: "acc-002",
    name: "PayableFlow",
    description: "Streamlines accounts payable by extracting data from invoices and scheduling payments.",
    uiType: "workflow",
    status: "online",
    category: "Accounting",
    rating: 4.8,
    usageCount: 8900,
    createdAt: "2024-02-14",
    icon: "💸",
    author: "InvoiceSmart",
  },
  {
    id: "acc-003",
    name: "TaxComply Bot",
    description: "Helps with tax preparation, identifying deductions, and ensuring compliance with local regulations.",
    uiType: "form",
    status: "busy",
    category: "Accounting",
    rating: 4.7,
    usageCount: 22100,
    createdAt: "2024-03-01",
    icon: "🏛️",
    author: "TaxTech Solutions",
  },
  {
    id: "acc-004",
    name: "AuditGuardian",
    description: "Continuously monitors financial records for anomalies and potential risks.",
    uiType: "dashboard",
    status: "online",
    category: "Accounting",
    rating: 4.9,
    usageCount: 5600,
    createdAt: "2024-01-20",
    icon: "🛡️",
    author: "SecureFinance",
  },
  {
    id: "acc-005",
    name: "ExpenseMate",
    description: "Mobile-friendly agent for employees to scan receipts and automate expense reporting.",
    uiType: "embedded",
    status: "online",
    category: "Accounting",
    rating: 4.6,
    usageCount: 34000,
    createdAt: "2024-02-28",
    icon: "💳",
    author: "ExpenseAI",
  },

  // ------------------------------------------------------------------
  // HR & PAYROLL
  // ------------------------------------------------------------------
  {
    id: "hr-001",
    name: "TalentScout AI",
    description: "Srrces candidates, scores resumes, and schedules interviews automatically.",
    uiType: "dashboard",
    status: "online",
    category: "HR & Payroll",
    rating: 4.8,
    usageCount: 12500,
    createdAt: "2024-01-15",
    icon: "👥",
    author: "RecruitRight",
  },
  {
    id: "hr-002",
    name: "PayrollPrecision",
    description: "Automates payroll processing, tax withholdings, and benefits distribution.",
    uiType: "workflow",
    status: "online",
    category: "HR & Payroll",
    rating: 4.9,
    usageCount: 18900,
    createdAt: "2024-02-10",
    icon: "💰",
    author: "PayMaster",
  },
  {
    id: "hr-003",
    name: "OnboardBuddy",
    description: "Guides new hires through paperwork, policy training, and IT setup.",
    uiType: "chat",
    status: "online",
    category: "HR & Payroll",
    rating: 4.7,
    usageCount: 9800,
    createdAt: "2024-03-05",
    icon: "👋",
    author: "TeamCulture",
  },
  {
    id: "hr-004",
    name: "HR Helpdesk Bot",
    description: "24/7 support for employee queries regarding leave, benefits, and company policies.",
    uiType: "chat",
    status: "online",
    category: "HR & Payroll",
    rating: 4.6,
    usageCount: 45000,
    createdAt: "2024-01-25",
    icon: "🆘",
    author: "PeopleOps",
  },
  {
    id: "hr-005",
    name: "ComplianceCheck",
    description: "Monitors HR policies and employee records to ensure legal compliance.",
    uiType: "api-only",
    status: "offline",
    category: "HR & Payroll",
    rating: 4.5,
    usageCount: 3200,
    createdAt: "2024-04-10",
    icon: "📋",
    author: "LegalHR",
  },

  // ------------------------------------------------------------------
  // SALES FUNNEL
  // ------------------------------------------------------------------
  {
    id: "sales-001",
    name: "LeadGenius",
    description: "Identifies and qualifies high-potential leads from multiple channels.",
    uiType: "dashboard",
    status: "online",
    category: "Sales Funnel",
    rating: 4.7,
    usageCount: 28900,
    createdAt: "2024-01-05",
    icon: "🎯",
    author: "GrowthHacker",
    dashboardConfig: {
      sections: [
        {
          id: "sales_hero",
          layout: "grid",
          columns: 3,
          widgets: [
            {
              id: "active_leads",
              type: "stat_card",
              title: "Active Leads",
              width: "third",
              config: {
                icon: "ChartBarIcon",
                variant: "default",
                value: "45",
                trend: "+5 today",
                dataKey: "mainMetric"
              }
            },
            {
              id: "pipeline_val",
              type: "stat_card",
              title: "Pipeline Value",
              width: "third",
              config: {
                icon: "CurrencyDollarIcon",
                variant: "success",
                value: "$142k",
                subtext: "Weight adjusted: $89k",
                dataKey: "subMetric"
              }
            },
            {
              id: "conversion_rate",
              type: "stat_card",
              title: "Conversion Rate",
              width: "third",
              config: {
                icon: "CheckCircleIcon",
                variant: "default",
                value: "4.2%",
                subtext: "Top 10% of industry",
              }
            }
          ]
        },
        {
          id: "sales_feed",
          layout: "grid",
          columns: 3,
          widgets: [
            {
              id: "recent_activities",
              type: "activity_log",
              title: "Recent Engagement",
              width: "third",
              config: {
                dataKey: "logs"
              }
            },
            {
              id: "lead_feed",
              type: "list_feed",
              title: "Live Lead Feed",
              width: "2/3",
              config: {
                dataKey: "anomalies_list"
              }
            }
          ]
        }
      ]
    }
  },
  {
    id: "sales-002",
    name: "PipelinePilot",
    description: "Automates CRM data entry, deal stage progression, and follow-up reminders.",
    uiType: "workflow",
    status: "busy",
    category: "Sales Funnel",
    rating: 4.8,
    usageCount: 15600,
    createdAt: "2024-02-18",
    icon: "🚀",
    author: "SalesForceAI",
  },
  {
    id: "sales-003",
    name: "ProposalCrafter",
    description: "Generates personalized sales proposals and quotes based on client needs.",
    uiType: "form",
    status: "online",
    category: "Sales Funnel",
    rating: 4.6,
    usageCount: 8700,
    createdAt: "2024-03-12",
    icon: "📄",
    author: "DocuSmart",
  },
  {
    id: "sales-004",
    name: "OutreachAutomator",
    description: "Manages multi-channel outbound campaigns via email and LinkedIn.",
    uiType: "workflow",
    status: "online",
    category: "Sales Funnel",
    rating: 4.7,
    usageCount: 21000,
    createdAt: "2024-01-22",
    icon: "📧",
    author: "ConnectPro",
  },
  {
    id: "sales-005",
    name: "ForecastAI",
    description: "Predicts future revenue and sales trends using historical data analysis.",
    uiType: "dashboard",
    status: "online",
    category: "Sales Funnel",
    rating: 4.5,
    usageCount: 5400,
    createdAt: "2024-04-01",
    icon: "📈",
    author: "TrendVision",
  },

  // ------------------------------------------------------------------
  // SOCIAL MEDIA
  // ------------------------------------------------------------------
  {
    id: "social-001",
    name: "ViralContent Creator",
    description: "Generates engaging posts, captions, and hashtags optimized for each platform.",
    uiType: "chat",
    status: "online",
    category: "Social Media",
    rating: 4.8,
    usageCount: 56000,
    createdAt: "2024-01-08",
    icon: "✨",
    author: "BuzzMaker",
  },
  {
    id: "social-002",
    name: "SocialScheduler",
    description: "Auto-publishes content at optimal times for maximum engagement.",
    uiType: "workflow",
    status: "online",
    category: "Social Media",
    rating: 4.7,
    usageCount: 34500,
    createdAt: "2024-02-05",
    icon: "📅",
    author: "TimePost",
  },
  {
    id: "social-003",
    name: "TrendSpotter",
    description: "Identifies rising trends and relevant hashtags in real-time.",
    uiType: "dashboard",
    status: "online",
    category: "Social Media",
    rating: 4.9,
    usageCount: 12300,
    createdAt: "2024-03-20",
    icon: "🔥",
    author: "TrendWatch",
  },
  {
    id: "social-004",
    name: "EngageBot",
    description: "Suggests replies to comments and messages to boost community interaction.",
    uiType: "chat",
    status: "busy",
    category: "Social Media",
    rating: 4.5,
    usageCount: 18900,
    createdAt: "2024-01-28",
    icon: "💬",
    author: "CommunityHero",
  },
  {
    id: "social-005",
    name: "BrandSentry",
    description: "Monitors brand mentions and sentiment across social platforms.",
    uiType: "api-only",
    status: "online",
    category: "Social Media",
    rating: 4.6,
    usageCount: 7800,
    createdAt: "2024-04-15",
    icon: "👁️",
    author: "ReputationAI",
  },

  // ------------------------------------------------------------------
  // BUSINESS COACH
  // ------------------------------------------------------------------
  {
    id: "coach-001",
    name: "StratPlan Advisor",
    description: "Helps define business goals and creates actionable strategic roadmaps.",
    uiType: "chat",
    status: "online",
    category: "Business Coach",
    rating: 4.9,
    usageCount: 4500,
    createdAt: "2024-01-12",
    icon: "🧭",
    author: "BizStrategy",
  },
  {
    id: "coach-002",
    name: "ProductivityGuru",
    description: "Analyzes workflow habits and suggests optimizations for peak performance.",
    uiType: "dashboard",
    status: "online",
    category: "Business Coach",
    rating: 4.7,
    usageCount: 9200,
    createdAt: "2024-02-25",
    icon: "⏱️",
    author: "FocusFlow",
  },
  {
    id: "coach-003",
    name: "MarketInsight AI",
    description: "Delivers deep market research and competitor analysis updates.",
    uiType: "dashboard",
    status: "online",
    category: "Business Coach",
    rating: 4.8,
    usageCount: 6700,
    createdAt: "2024-03-18",
    icon: "🔬",
    author: "IntelBrief",
  },
  {
    id: "coach-004",
    name: "DecisionMate",
    description: "Provides data-driven pros and cons analysis for critical business decisions.",
    uiType: "form",
    status: "online",
    category: "Business Coach",
    rating: 4.6,
    usageCount: 3400,
    createdAt: "2024-01-30",
    icon: "⚖️",
    author: "LogicLabs",
  },

  // ------------------------------------------------------------------
  // CUSTOMER SUPPORT
  // ------------------------------------------------------------------
  {
    id: "cx-001",
    name: "SupportHero 24/7",
    description: "Instant AI live chat support solving common queries and booking appointments.",
    uiType: "chat",
    status: "online",
    category: "Customer Support",
    rating: 4.8,
    usageCount: 89000,
    createdAt: "2024-01-02",
    icon: "🎧",
    author: "ServiceNow AI",
  },
  {
    id: "cx-002",
    name: "TicketTriager",
    description: "Automatically classifies and routes support tickets to the right department.",
    uiType: "api-only",
    status: "online",
    category: "Customer Support",
    rating: 4.7,
    usageCount: 45600,
    createdAt: "2024-02-12",
    icon: "🏷️",
    author: "HelpDeskPro",
  },
  {
    id: "cx-003",
    name: "SentimentScanner",
    description: "Analyzes customer feedback and reviews to gauge satisfaction levels.",
    uiType: "dashboard",
    status: "online",
    category: "Customer Support",
    rating: 4.6,
    usageCount: 12000,
    createdAt: "2024-03-08",
    icon: "❤️",
    author: "FeelingsAI",
  },
  {
    id: "cx-004",
    name: "KnowledgeBase Bot",
    description: "Drafts and updates FAQ articles based on resolved support tickets.",
    uiType: "embedded",
    status: "online",
    category: "Customer Support",
    rating: 4.5,
    usageCount: 8900,
    createdAt: "2024-01-18",
    icon: "📚",
    author: "WikiTech",
  },
  {
    id: "cx-005",
    name: "RetentionRisks",
    description: "Identifies customers at risk of churn and suggests engagement strategies.",
    uiType: "dashboard",
    status: "online",
    category: "Customer Support",
    rating: 4.9,
    usageCount: 6700,
    createdAt: "2024-04-02",
    icon: "🛑",
    author: "ChurnZero",
  },
];

// ========================================
// DASHBOARD STATS
// ========================================

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: string;
}

export const DASHBOARD_STATS: DashboardStat[] = [
  {
    id: "stat-1",
    label: "Total Agents",
    value: "1,247,893",
    change: "+12.5%",
    changeType: "positive",
    icon: "🤖",
  },
  {
    id: "stat-2",
    label: "Active Sessions",
    value: "89,432",
    change: "+8.2%",
    changeType: "positive",
    icon: "⚡",
  },
  {
    id: "stat-3",
    label: "API Calls Today",
    value: "2.4M",
    change: "-2.1%",
    changeType: "negative",
    icon: "📡",
  },
  {
    id: "stat-4",
    label: "System Status",
    value: "Operational",
    change: "0%",
    changeType: "neutral",
    icon: "✅",
  },
];

// ========================================
// DYNAMIC DASHBOARD TYPES
// ========================================

export type WidgetType = 'stat_card' | 'list_feed' | 'activity_log' | 'info_card' | 'chart';

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  description?: string;
  width?: 'full' | 'half' | 'third' | '2/3';
  config?: {
    icon?: string;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'outline';
    dataKey?: string; // used to map to mock data
    actions?: string[];
    // For specific widgets
    trend?: string; // e.g., "+12%"
    value?: string; // e.g., "$1,240"
    subtext?: string;
  };
}

export interface DashboardSection {
  id: string;
  title?: string;
  layout: 'grid' | 'column';
  columns?: number;
  widgets: DashboardWidget[];
}

export interface DashboardConfig {
  sections: DashboardSection[];
}

