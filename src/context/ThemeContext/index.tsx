import Logo from "@/assets/images/svgs/logo.svg";
import { useFullUserProfile, useUserProfile } from "@/hooks/settings";
import { useEffect, useState } from "react";
import { defaultTheme, ThemeContext } from "./hook";
import { Theme } from "./types";

const LOCAL_KEY = "branding";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: fullProfile } = useFullUserProfile();
    const { data: profile } = useUserProfile(fullProfile?.results?.[0]?.id);

    const [theme, setThemeState] = useState<Theme>(() => {
        try {
            const cached = localStorage.getItem(LOCAL_KEY);
            return cached ? JSON.parse(cached) : defaultTheme;
        } catch {
            return defaultTheme;
        }
    });

    const setTheme = (updates: Partial<Theme>) => {
        setThemeState((prev) => {
            const merged = { ...prev, ...updates };
            localStorage.setItem(LOCAL_KEY, JSON.stringify(merged));
            return merged;
        });
    };

    // Update branding theme on mount
    useEffect(() => {
        if (profile) {
            setTheme({
                primaryColor: profile.primary_color || defaultTheme.primaryColor,
                secondaryColor: profile.secondary_color || defaultTheme.secondaryColor,
                logoUrl: profile.logo || Logo,
                faviconUrl: profile.favicon || "/favicon.svg",
            });
        }
    }, [profile]);

    // Update favicon when it changes
    // useEffect(() => {
    //     const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    //     if (link && theme.faviconUrl) {
    //         link.href = theme.faviconUrl;
    //     }
    // }, [theme.faviconUrl]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <style>
                {`
                    :root {
                        --branding-primary: ${theme.primaryColor};
                        --branding-secondary: ${theme.secondaryColor};
                        --branding-secondary-foreground: ${theme.primaryColor};
                    }
                `}
            </style>
            {children}
        </ThemeContext.Provider>
    );
};
