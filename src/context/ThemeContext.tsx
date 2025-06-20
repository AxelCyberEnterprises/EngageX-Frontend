import Logo from "@/assets/images/svgs/logo.svg";
import { useFullUserProfile, useUserProfile } from "@/hooks/settings";
import { createContext, useContext, useEffect, useState } from "react";

export interface Theme {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    faviconUrl: string;
}

const defaultTheme: Theme = {
    primaryColor: "#262b3a",
    secondaryColor: "#10161e",
    logoUrl: "Logo",
    faviconUrl: "/vite.svg",
};

const ThemeContext = createContext<{
    theme: Theme;
    setTheme: (updates: Partial<Theme>) => void;
}>({
    theme: defaultTheme,
    setTheme: () => {},
});

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
                primaryColor: profile.primary_color || "#262b3a",
                secondaryColor: profile.secondary_color || "#10161e",
                logoUrl: profile.logo || Logo,
                faviconUrl: profile.favicon || "/vite.svg",
            });
        }
    }, [profile]);

    // Update favicon when it changes
    useEffect(() => {
        const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (link && theme.faviconUrl) {
            link.href = theme.faviconUrl;
        }
    }, [theme.faviconUrl]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <style>
                {`
                    :root {
                        --primary: ${theme.primaryColor};
                        --secondary: ${theme.secondaryColor};
                        --secondary-foreground: ${theme.primaryColor};
                    }
                `}
            </style>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
