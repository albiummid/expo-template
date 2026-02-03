import { createContext, type ReactNode, useContext, useState } from "react";

// Define theme types
export type ThemeMode = "light" | "dark" | "ultra-dark";
export type IconStyle = "classic" | "simple";

// Define accent color type
export interface AccentColor {
  id: string;
  name: string;
  color: string;
  isPremium: boolean;
}

// Free accent colors
export const FREE_ACCENT_COLORS: AccentColor[] = [
  { id: "coral", name: "Coral", color: "#FF6B6B", isPremium: false },
  { id: "orange", name: "Orange", color: "#FF9F43", isPremium: false },
  { id: "cyan", name: "Cyan", color: "#00D2D3", isPremium: false },
  { id: "violet", name: "Violet", color: "#C56CF0", isPremium: false },
];

// Premium accent colors organized by rows
export const PREMIUM_ACCENT_COLORS: AccentColor[] = [
  // Row 1
  { id: "red", name: "Red", color: "#EF4444", isPremium: true },
  { id: "salmon", name: "Salmon", color: "#F97171", isPremium: true },
  { id: "amber", name: "Amber", color: "#F59E0B", isPremium: true },
  { id: "emerald", name: "Emerald", color: "#10B981", isPremium: true },
  { id: "sky", name: "Sky", color: "#0EA5E9", isPremium: true },
  { id: "purple", name: "Purple", color: "#8B5CF6", isPremium: true },
  // Row 2
  { id: "rose", name: "Rose", color: "#F43F5E", isPremium: true },
  { id: "pink", name: "Pink", color: "#EC4899", isPremium: true },
  { id: "gold", name: "Gold", color: "#EAB308", isPremium: true },
  { id: "lime", name: "Lime", color: "#84CC16", isPremium: true },
  { id: "indigo", name: "Indigo", color: "#6366F1", isPremium: true },
  { id: "mauve", name: "Mauve", color: "#9D8CCC", isPremium: true },
  // Row 3
  { id: "crimson", name: "Crimson", color: "#DC2626", isPremium: true },
  { id: "magenta", name: "Magenta", color: "#D946EF", isPremium: true },
  { id: "green", name: "Green", color: "#22C55E", isPremium: true },
  { id: "teal", name: "Teal", color: "#14B8A6", isPremium: true },
  {
    id: "slate-purple",
    name: "Slate Purple",
    color: "#7C6BA1",
    isPremium: true,
  },
  { id: "tan", name: "Tan", color: "#A18072", isPremium: true },
  // Row 4
  { id: "mint", name: "Mint", color: "#34D399", isPremium: true },
  { id: "peach", name: "Peach", color: "#FFA07A", isPremium: true },
  { id: "grape", name: "Grape", color: "#A855F7", isPremium: true },
  { id: "lavender", name: "Lavender", color: "#F0ABFC", isPremium: true },
  { id: "watermelon", name: "Watermelon", color: "#FB7185", isPremium: true },
  { id: "caramel", name: "Caramel", color: "#D2691E", isPremium: true },
  // Row 5
  { id: "aqua", name: "Aqua", color: "#06B6D4", isPremium: true },
  { id: "blush", name: "Blush", color: "#FDA4AF", isPremium: true },
  { id: "tomato", name: "Tomato", color: "#EF4444", isPremium: true },
  { id: "seafoam", name: "Seafoam", color: "#5EEAD4", isPremium: true },
  { id: "fuchsia", name: "Fuchsia", color: "#E879F9", isPremium: true },
  { id: "forest", name: "Forest", color: "#16A34A", isPremium: true },
];

export const ALL_ACCENT_COLORS = [
  ...FREE_ACCENT_COLORS,
  ...PREMIUM_ACCENT_COLORS,
];

// Theme context interface
interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isUltraDark: boolean;
  setIsUltraDark: (value: boolean) => void;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  iconStyle: IconStyle;
  setIconStyle: (style: IconStyle) => void;
  getThemeClass: () => string;
  getAccentClass: () => string;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  
  children: ReactNode;
}

// Theme provider component
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [isUltraDark, setIsUltraDark] = useState(false);
  const [accentColor, setAccentColor] = useState<AccentColor>(
    FREE_ACCENT_COLORS[2],
  ); // Default to cyan
  const [iconStyle, setIconStyle] = useState<IconStyle>("classic");

  // Get the appropriate theme class
  const getThemeClass = (): string => {
    if (themeMode === "dark" && isUltraDark) {
      return "ultra-dark";
    }
    return themeMode;
  };

  // Get the accent color class
  const getAccentClass = (): string => {
    return `accent-${accentColor.id}`;
  };

  // Handle theme mode change
  const handleSetThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    if (mode === "light") {
      setIsUltraDark(false);
    }
  };

  const value: ThemeContextType = {
    themeMode,
    setThemeMode: handleSetThemeMode,
    isUltraDark,
    setIsUltraDark,
    accentColor,
    setAccentColor,
    iconStyle,
    setIconStyle,
    getThemeClass,
    getAccentClass,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
