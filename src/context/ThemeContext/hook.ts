import { createContext, useContext } from "react";
import { Theme } from "./types";

export const defaultTheme: Theme = {
    primaryColor: "",
    secondaryColor: "",
            logoUrl: "/assets/logoaltwhitev2.png",
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
