import Link from "next/link";
import { Topbar, MainContent, PageTransition } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button, Input } from "@/components/ui";
import {
    BookOpenIcon,
    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
    QuestionMarkCircleIcon,
    VideoCameraIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

const helpResources = [
    {
        icon: BookOpenIcon,
        title: "Documentation",
        description: "Comprehensive guides and API references",
        href: "#",
    },
    {
        icon: VideoCameraIcon,
        title: "Video Tutorials",
        description: "Step-by-step video walkthroughs",
        href: "#",
    },
    {
        icon: ChatBubbleLeftRightIcon,
        title: "Community Forum",
        description: "Connect with other developers",
        href: "#",
    },
    {
        icon: DocumentTextIcon,
        title: "Changelog",
        description: "Latest updates and releases",
        href: "#",
    },
];

const faqs = [
    {
        question: "How do I create a new agent?",
        answer: "Navigate to the Marketplace, find an agent template, and click 'Deploy'. Follow the configuration wizard to customize your agent.",
    },
    {
        question: "What are the different agent UI types?",
        answer: "We support Chat, Form, Dashboard, Workflow, Embedded App, and API-only agents. Each type is optimized for different use cases.",
    },
    {
        question: "How is billing calculated?",
        answer: "Billing is based on the number of API calls and active agents. Check the Billing section in Settings for detailed usage.",
    },
    {
        question: "Can I export my agent data?",
        answer: "Yes, you can export agent configurations and analytics data from the Settings page or via our API.",
    },
];

export default function HelpPage() {
    return (
        <>
            <Topbar
                title="Help & Support"
                subtitle="Find answers and get help"
            />
            <MainContent>
                <PageTransition>
                    <div className="space-y-8 max-w-5xl">
                        {/* Search */}
                        <Card variant="bordered" padding="lg" className="bg-primary-50 border-primary-200">
                            <div className="text-center max-w-xl mx-auto">
                                <QuestionMarkCircleIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-foreground mb-2">
                                    How can we help you?
                                </h2>
                                <p className="text-foreground-secondary mb-6">
                                    Search our knowledge base or browse resources below
                                </p>
                                <Input
                                    type="search"
                                    placeholder="Search for help..."
                                    className="max-w-md mx-auto"
                                />
                            </div>
                        </Card>

                        {/* Resources Grid */}
                        <section>
                            <h3 className="text-lg font-semibold text-foreground mb-4">
                                Resources
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {helpResources.map((resource) => (
                                    <Link key={resource.title} href={resource.href}>
                                        <Card
                                            variant="default"
                                            padding="md"
                                            className="h-full hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                                        >
                                            <resource.icon className="h-8 w-8 text-primary-600 mb-3" />
                                            <h4 className="font-semibold text-foreground mb-1">
                                                {resource.title}
                                            </h4>
                                            <p className="text-sm text-foreground-secondary">
                                                {resource.description}
                                            </p>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* FAQs */}
                        <section>
                            <h3 className="text-lg font-semibold text-foreground mb-4">
                                Frequently Asked Questions
                            </h3>
                            <Card variant="default" padding="none">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className={`p-6 ${index !== faqs.length - 1 ? "border-b border-border" : ""
                                            }`}
                                    >
                                        <h4 className="font-semibold text-foreground mb-2">
                                            {faq.question}
                                        </h4>
                                        <p className="text-sm text-foreground-secondary">
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </Card>
                        </section>

                        {/* Contact */}
                        <Card variant="default" padding="lg">
                            <CardHeader>
                                <CardTitle>Still need help?</CardTitle>
                                <CardDescription>
                                    Our support team is available 24/7
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button>
                                        <ChatBubbleLeftRightIcon className="h-4 w-4" />
                                        Start Live Chat
                                    </Button>
                                    <Button variant="outline">
                                        <EnvelopeIcon className="h-4 w-4" />
                                        Email Support
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </PageTransition>
            </MainContent>
        </>
    );
}
