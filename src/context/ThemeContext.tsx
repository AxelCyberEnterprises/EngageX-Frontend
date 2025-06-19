import Logo from "@/assets/images/svgs/logo.svg";
import { useUserProfile } from "@/hooks/settings";
import { createContext, useContext, useEffect, useState } from "react";

export interface Theme {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    faviconUrl: string;
}

const ThemeContext = createContext<{
    theme: Theme;
    setTheme: (updates: Partial<Theme>) => void;
}>({
    theme: {
        primaryColor: "#10161E",
        secondaryColor: "#0C76D5",
        logoUrl: Logo,
        faviconUrl: "/favicon.ico",
    },
    setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: profile } = useUserProfile(77);

    const [theme, setThemeState] = useState<Theme>({
        primaryColor: "#10161E",
        secondaryColor: "#0C76D5",
        logoUrl: Logo,
        faviconUrl: "/favicon.ico",
    });

    const setTheme = (updates: Partial<Theme>) => {
        setThemeState((prev) => ({ ...prev, ...updates }));
    };

    // Fetch saved branding on mount
    useEffect(() => {
        if (profile) {
            setTheme({
                primaryColor: profile.primary_color || "#10161E",
                secondaryColor: profile.secondary_color || "#0C76D5",
                logoUrl: profile.logo || Logo,
                faviconUrl: profile.favicon || "/favicon.ico",
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

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
