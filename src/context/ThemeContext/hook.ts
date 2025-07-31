import { createContext, useContext } from "react";
import { Theme } from "./types";

export const defaultTheme: Theme = {
    primaryColor: "#262B3A",
    secondaryColor: "#10161E",
    logoUrl: "/src/assets/images/svgs/logo.svg",
    faviconUrl: "/favicon.svg",
};

export const ThemeContext = createContext<{
    theme: Theme;
    setTheme: (updates: Partial<Theme>) => void;
}>({
    theme: defaultTheme,
    setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
