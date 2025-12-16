"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { WordRotate } from "@/components/ui/WordRotate";

export default function HomePage() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // (Optional) make particles stable between re-renders
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        drift: `-${Math.random() * 100}px`,
        duration: Math.random() * 10 + 10,
      })),
    []
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden bg-background">
      {/* Enhanced Background with Gradient Mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary-100/30 dark:bg-primary-900/10 blur-[120px] opacity-50"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary-100/20 dark:bg-primary-900/10 blur-[100px] opacity-40"
        />
      </div>

      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto mb-12 md:mb-16"
      >
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-primary-300/20 rounded-2xl blur-lg opacity-70" />
            <div className="relative flex items-center gap-3 px-5 py-2.5 rounded-xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600">
                <span className="text-lg">🤖</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-[0.2em] text-foreground uppercase">
                  AI Agents
                </span>
                <span className="text-xs font-medium tracking-widest text-primary-600 dark:text-primary-400 uppercase">
                  Hive Platform
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/30">
              <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">⚡</span>
              <span className="text-xs font-medium text-foreground-secondary">
                Autonomous AI Workforces • Enterprise Ready • Scalable Solutions
              </span>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="w-full max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-xl md:text-2xl lg:text-5xl font-bold tracking-tight mb-6 flex flex-wrap items-center justify-center gap-3">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              What can I
            </span>

            {/* VERTICAL ROTATING WORDS */}
            <WordRotate
              words={["Scale", "Automate", "Orchestrate", "Transform", "Optimize"]}
              className="font-serif italic font-black"
              duration={2500}
            />

            <span className="bg-gradient-to-r from-foreground/80 to-foreground/60 bg-clip-text text-transparent">
              for you?
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Describe your challenge and discover AI agents engineered to transform your operations
          </motion.p>
        </motion.div>

        {/* Search Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative z-20 mb-16 px-4"
        >
          <div className="relative max-w-3xl mx-auto">
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-xl"
              />
            )}

            <div
              className={cn(
                "relative flex items-center w-full bg-background/80 backdrop-blur-xl rounded-full border transition-all duration-500",
                isFocused
                  ? "shadow-[0_0_40px_rgba(59,130,246,0.1)] border-primary-400/50"
                  : "shadow-sm border-border/50 hover:border-primary-300/50"
              )}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 h-20 bg-transparent border-none px-6 text-lg md:text-xl text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:ring-0 placeholder:font-light"
                placeholder="Describe your business challenge or search for specialized AI agents..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />

              <motion.div className="pr-2" whileHover={inputValue.trim() ? { scale: 1.05 } : {}} whileTap={inputValue.trim() ? { scale: 0.95 } : {}}>
                <button
                  disabled={!inputValue.trim()}
                  className={cn(
                    "h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full transition-all duration-300 group",
                    inputValue.trim()
                      ? "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20"
                      : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                  )}
                >
                  <motion.div
                    animate={isFocused ? { rotate: 45 } : { rotate: 0 }}
                    transition={{ type: "spring" }}
                  >
                    <ArrowUpIcon className="h-6 w-6" />
                  </motion.div>
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-2 mt-6"
            >
              {["Customer Support", "Data Analysis", "Process Automation", "Content Creation"].map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-sm rounded-full bg-background/50 backdrop-blur-sm border border-border/30 text-foreground-secondary hover:text-foreground hover:border-primary-300/50 hover:bg-background-secondary/50 transition-all"
                >
                  {tag}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Subtle Background Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-[1px] h-[1px] bg-primary-500/20 rounded-full"
            initial={{ x: p.x, y: p.y }}
            animate={{ y: [null, p.drift] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>
    </div>
  );
}