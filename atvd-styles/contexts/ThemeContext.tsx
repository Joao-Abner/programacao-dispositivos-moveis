import { createContext, PropsWithChildren, useState, useContext } from "react";
import { darkTheme, lightTheme, ThemeColors } from "@/constants/colors";

export interface ThemeContextProps {
    colors: ThemeColors,
    isDark: boolean,
    toggleTheme: () => void
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {

    // estado dark
    const [isDark, setIsDark] = useState<boolean>(true);

    // função toggleTheme para inverter o estado dark
    const toggleTheme = () => {
        setIsDark((prevIsDark) => !prevIsDark)
    }

    // return do provider
    return (
        <ThemeContext.Provider value={{ colors: isDark ? darkTheme : lightTheme, isDark, toggleTheme }}>
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