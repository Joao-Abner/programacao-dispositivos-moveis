import { createContext, PropsWithChildren, useState, useContext } from "react";
import { darkTheme, lightTheme, ThemeColors } from "@/constants/colors";

type ColorScheme = "light" | "dark";

export interface ThemeContextProps {
    colors: ThemeColors,
    colorScheme: ColorScheme,
    toggleTheme: () => void
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {

    // estado colorScheme com string "light" ou "dark"
    const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

    // função toggleTheme para alternar entre "dark" e "light"
    const toggleTheme = () => {
        setColorScheme((prev) => prev === "dark" ? "light" : "dark");
    }

    // return do provider
    return (
        <ThemeContext.Provider value={{ colors: colorScheme === "dark" ? darkTheme : lightTheme, colorScheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

// Hook de consumo
export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme deve ser usado dentro de um ThemeProvider")
    }
    return context
}