import { createContext, useContext } from "react";
import { Theme } from "./types";

export const defaultTheme: Theme = {
    primaryColor: "#262b3a",
    secondaryColor: "#10161e",
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
