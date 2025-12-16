"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface BrandThemeContextType {
    brandColor: string | null;
    setBrandColor: (color: string | null) => void;
}

const BrandThemeContext = createContext<BrandThemeContextType>({
    brandColor: null,
    setBrandColor: () => { }
});

export const useBrandTheme = () => useContext(BrandThemeContext);

interface BrandThemeWrapperProps {
    children: React.ReactNode;
}

export function BrandThemeWrapper({ children }: BrandThemeWrapperProps) {
    const [brandColor, setBrandColor] = useState<string | null>(null);

    // This effect injects a style tag to overwrite the primary color variables
    // when a brand color is set (e.g., from an org config).
    useEffect(() => {
        const styleId = "dynamic-brand-theme";
        let styleTag = document.getElementById(styleId) as HTMLStyleElement;

        if (!brandColor) {
            if (styleTag) styleTag.remove();
            return;
        }

        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = styleId;
            document.head.appendChild(styleTag);
        }

        // Simple logic to generate a palette (In real app, use colord or chroma-js)
        // For now, we assume consumer passes a hex and we just override primary-500
        // A real robust system would generate the full 50-950 scale.
        styleTag.innerHTML = `
            :root {
                --primary-500: ${brandColor} !important;
                --primary-600: ${brandColor} !important; /* Simplified for demo */
            }
        `;

    }, [brandColor]);

    return (
        <BrandThemeContext.Provider value={{ brandColor, setBrandColor }}>
            {children}
        </BrandThemeContext.Provider>
    );
}
