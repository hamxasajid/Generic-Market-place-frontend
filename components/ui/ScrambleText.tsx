"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrambleTextProps {
    words: string[];
    className?: string;
    scrambleSpeed?: number;
    pauseDuration?: number;
}

const CYCLES_PER_LETTER = 2; // How many scrambles before a letter fixes
const SHUFFLE_TIME = 50; // ms per scramble frame

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+~`|{}[]:;?><,./-=";

export function ScrambleText({
    words,
    className,
    scrambleSpeed = 50,
    pauseDuration = 2000,
}: ScrambleTextProps) {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState(words[0]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let currentWord = words[index];
        let nextIndex = (index + 1) % words.length;
        let nextWord = words[nextIndex];

        const cycleText = async () => {
            // 1. Wait for pause
            await new Promise((r) => setTimeout(r, pauseDuration));

            // 2. Scramble transition
            let pos = 0;

            intervalRef.current = setInterval(() => {
                const scrambled = nextWord
                    .split("")
                    .map((char, i) => {
                        if (i < pos) {
                            return nextWord[i];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("");

                setText(scrambled);
                pos += 1 / CYCLES_PER_LETTER;

                if (pos >= nextWord.length) {
                    clearInterval(intervalRef.current!);
                    setText(nextWord);
                    setIndex(nextIndex);
                }
            }, scrambleSpeed);
        };

        cycleText();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [index, words, pauseDuration, scrambleSpeed]);

    return (
        <span className={cn("inline-block font-mono", className)}>
            {text}
        </span>
    );
}
