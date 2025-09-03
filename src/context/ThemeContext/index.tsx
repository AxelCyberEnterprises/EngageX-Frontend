const Logo = "/assets/logoaltwhitev2.png";
import { useEnterpriseUsers, useFullUserProfile, useUserProfile } from "@/hooks/settings";
import { useEffect, useState } from "react";
import { defaultTheme, ThemeContext } from "./hook";
import { Theme } from "./types";
import { useFetchSingleOrganization } from "@/hooks";
import { useLocation, useSearchParams } from "react-router-dom";

const LOCAL_KEY = "branding";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchParams] = useSearchParams();
    const enterpriseId = Number(searchParams.get("id"));
    const location = useLocation(); // Retrieve the current location
    const path = location.pathname; // Access the pathname
    console.log("Current path: ", path, path.includes("admin"));
    const { data: fullProfile } = useFullUserProfile();
    const { data: profile } = useUserProfile(fullProfile?.results?.[0]?.id);
    const { data: organization } = useFetchSingleOrganization(enterpriseId);
    const { data: enterpriseUser } = useEnterpriseUsers();

    console.log("ent user: ", organization, profile, enterpriseUser);

    const apiPrimaryColor = path.includes("admin")
        ? profile?.primary_color
        : enterpriseUser?.results[0].enterprise.primary_color;
    const apiSecondaryColor = path.includes("admin")
        ? profile?.secondary_color
        : enterpriseUser?.results[0].enterprise.secondary_color;
    const apiEnterpriseFavicon = path.includes("admin")
        ? profile?.favicon
        : enterpriseUser?.results[0].enterprise.favicon;
    const apiEnterpriseLogo = path.includes("admin") ? profile?.logo : enterpriseUser?.results[0].enterprise.logo;
    // Initialize theme: prefer API data (if ready), otherwise fallback to localStorage, then default
    const [theme, setThemeState] = useState<Theme>(() => {
        if (apiPrimaryColor || apiSecondaryColor || profile) {
            return {
                primaryColor: apiPrimaryColor || defaultTheme.primaryColor,
                secondaryColor: apiSecondaryColor || defaultTheme.secondaryColor,
                logoUrl: apiEnterpriseLogo,
                faviconUrl: apiEnterpriseFavicon,
            };
        }
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

    // Keep theme updated whenever API data changes
    useEffect(() => {
        if (profile && enterpriseUser) {
            setTheme({
                primaryColor: apiPrimaryColor || defaultTheme.primaryColor,
                secondaryColor: apiSecondaryColor || defaultTheme.secondaryColor,
                logoUrl: apiEnterpriseLogo || Logo,
                faviconUrl: apiEnterpriseFavicon || "/favicon.svg",
            });
        }
    }, [enterpriseUser, profile, apiPrimaryColor, apiSecondaryColor]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <style>
                {`
          :root {
            --branding-primary: ${theme.primaryColor};
            --branding-secondary: ${theme.secondaryColor};
            --branding-secondary-foreground: ${theme.secondaryColor};
          }
        `}
            </style>
            {children}
        </ThemeContext.Provider>
    );
};
