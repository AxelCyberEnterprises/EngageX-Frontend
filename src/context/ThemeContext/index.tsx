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

  const apiPrimaryColor = enterpriseUsers?.results?.[0]?.primary_color || profile?.primary_color;
  const apiSecondaryColor = enterpriseUsers?.results?.[0]?.secondary_color || profile?.secondary_color;

  // Initialize theme: prefer API data (if ready), otherwise fallback to localStorage, then default
  const [theme, setThemeState] = useState<Theme>(() => {
    if (apiPrimaryColor || apiSecondaryColor || profile) {
      return {
        primaryColor: apiPrimaryColor || defaultTheme.primaryColor,
        secondaryColor: apiSecondaryColor || defaultTheme.secondaryColor,
        logoUrl: profile?.logo || Logo,
        faviconUrl: profile?.favicon || "/favicon.svg",
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
    if (profile || enterpriseUsers) {
      setTheme({
        primaryColor: apiPrimaryColor || defaultTheme.primaryColor,
        secondaryColor: apiSecondaryColor || defaultTheme.secondaryColor,
        logoUrl: profile?.logo || Logo,
        faviconUrl: profile?.favicon || "/favicon.svg",
      });
    }
  }, [profile, enterpriseUsers, apiPrimaryColor, apiSecondaryColor]);

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
