const Logo = "/assets/logoaltwhitev2.png";
import { useEnterpriseUsers, useFullUserProfile, useUserProfile } from "@/hooks/settings";
import { useEffect, useState } from "react";
import { defaultTheme, ThemeContext } from "./hook";
import { Theme } from "./types";

const LOCAL_KEY = "branding";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: fullProfile } = useFullUserProfile();
    const { data: profile } = useUserProfile(fullProfile?.results?.[0]?.id);
    const { data: enterpriseUsers } = useEnterpriseUsers();
    console.log("enterpriseUsers", enterpriseUsers);
    // console.log("enterpriseUsers", enterpriseUsers?.results[0]);
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
    const secondaryColor = enterpriseUsers?.results[0]?.secondary_color;
    const primaryColor = enterpriseUsers?.results[0]?.primary_color;
    useEffect(() => {
        if (profile) {
            setTheme({
                primaryColor: primaryColor || defaultTheme.primaryColor,
                secondaryColor: secondaryColor || defaultTheme.secondaryColor,
                logoUrl: profile.logo || Logo,
                faviconUrl: profile.favicon || "/favicon.svg",
            });
        }
    }, [profile]);
    console.log(profile);
    console.log(enterpriseUsers);

    const preferredPrimaryColor = primaryColor || profile?.primary_color;
    const preferredSecondaryColor = secondaryColor || profile?.secondary_color;

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
                        --branding-primary: ${preferredPrimaryColor};
                        --branding-secondary: ${preferredSecondaryColor};
                        --branding-secondary-foreground: ${preferredSecondaryColor};
                    }
                `}
            </style>
            {children}
        </ThemeContext.Provider>
    );
};
