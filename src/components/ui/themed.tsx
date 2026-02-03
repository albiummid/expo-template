import {
  Text,
  type TextProps,
  View,
  type ViewProps,
  Pressable,
  type PressableProps,
  ActivityIndicator,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { forwardRef } from "react";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib";

// ============================================================================
// TText Component
// ============================================================================

interface TTextProps extends TextProps {
  variant?: "primary" | "secondary" | "muted" | "accent" | "error" | "success";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
}

export const TText = forwardRef<Text, TTextProps>(
  (
    {
      variant = "primary",
      size = "base",
      weight = "normal",
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const { themeMode, isUltraDark, accentColor } = useTheme();

    // Determine text color based on variant and theme
    const getVariantClass = () => {
      const isDark = themeMode === "dark" || isUltraDark;

      switch (variant) {
        case "primary":
          return isDark ? "text-white" : "text-gray-900";
        case "secondary":
          return isDark ? "text-gray-300" : "text-gray-700";
        case "muted":
          return isDark ? "text-gray-500" : "text-gray-500";
        case "accent":
          return ""; // Will use custom color
        case "error":
          return "text-red-500";
        case "success":
          return "text-green-500";
        default:
          return isDark ? "text-white" : "text-gray-900";
      }
    };

    // Size classes
    const sizeClasses = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    };

    // Weight classes
    const weightClasses = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    // Apply accent color styling for accent variant
    const accentStyle =
      variant === "accent" ? { color: accentColor.color } : undefined;

    return (
      <Text
        ref={ref}
        className={cn(
          getVariantClass(),
          sizeClasses[size],
          weightClasses[weight],
          className,
        )}
        style={[accentStyle, style]}
        {...props}
      >
        {children}
      </Text>
    );
  },
);

TText.displayName = "TText";

// ============================================================================
// TView Component
// ============================================================================

interface TViewProps extends ViewProps {
  variant?: "default" | "card" | "elevated" | "outline" | "accent";
}

export const TView = forwardRef<View, TViewProps>(
  ({ variant = "default", className, style, children, ...props }, ref) => {
    const { themeMode, isUltraDark, accentColor } = useTheme();

    // Determine background and border based on variant and theme
    const getVariantClass = () => {
      if (isUltraDark) {
        switch (variant) {
          case "default":
            return "bg-black";
          case "card":
            return "bg-zinc-950 border border-zinc-800";
          case "elevated":
            return "bg-zinc-900 shadow-xl";
          case "outline":
            return "bg-transparent border border-zinc-800";
          case "accent":
            return "bg-zinc-950 border-l-4";
          default:
            return "bg-black";
        }
      } else if (themeMode === "dark") {
        switch (variant) {
          case "default":
            return "bg-gray-900";
          case "card":
            return "bg-gray-800 border border-gray-700";
          case "elevated":
            return "bg-gray-800 shadow-xl";
          case "outline":
            return "bg-transparent border border-gray-700";
          case "accent":
            return "bg-gray-800 border-l-4";
          default:
            return "bg-gray-900";
        }
      } else {
        // Light mode
        switch (variant) {
          case "default":
            return "bg-white";
          case "card":
            return "bg-white border border-gray-200 shadow-sm";
          case "elevated":
            return "bg-white shadow-lg";
          case "outline":
            return "bg-transparent border border-gray-300";
          case "accent":
            return "bg-white border-l-4";
          default:
            return "bg-white";
        }
      }
    };

    // Apply accent color for accent variant
    const accentStyle =
      variant === "accent" ? { borderLeftColor: accentColor.color } : undefined;

    return (
      <View
        ref={ref}
        className={cn(getVariantClass(), className)}
        style={[accentStyle, style]}
        {...props}
      >
        {children}
      </View>
    );
  },
);

TView.displayName = "TView";

// ============================================================================
// TButton Component
// ============================================================================

interface TButtonProps extends Omit<PressableProps, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const TButton = forwardRef<View, TButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const { themeMode, isUltraDark, accentColor } = useTheme();

    // Determine button styling based on variant and theme
    const getVariantClass = () => {
      const isDark = themeMode === "dark" || isUltraDark;

      switch (variant) {
        case "primary":
          return isDark
            ? "bg-white active:bg-gray-200"
            : "bg-gray-900 active:bg-gray-800";
        case "secondary":
          return isDark
            ? "bg-gray-800 border border-gray-700 active:bg-gray-700"
            : "bg-gray-100 border border-gray-300 active:bg-gray-200";
        case "outline":
          return isDark
            ? "bg-transparent border border-gray-700 active:bg-gray-800"
            : "bg-transparent border border-gray-300 active:bg-gray-100";
        case "ghost":
          return isDark
            ? "bg-transparent active:bg-gray-800"
            : "bg-transparent active:bg-gray-100";
        case "danger":
          return "bg-red-600 active:bg-red-700";
        case "accent":
          return "active:opacity-80";
        default:
          return "";
      }
    };

    // Get text color based on variant
    const getTextColorClass = () => {
      const isDark = themeMode === "dark" || isUltraDark;

      switch (variant) {
        case "primary":
          return isDark ? "text-black" : "text-white";
        case "secondary":
          return isDark ? "text-gray-100" : "text-gray-900";
        case "outline":
          return isDark ? "text-gray-100" : "text-gray-900";
        case "ghost":
          return isDark ? "text-gray-100" : "text-gray-900";
        case "danger":
          return "text-white";
        case "accent":
          return "text-white";
        default:
          return isDark ? "text-black" : "text-white";
      }
    };

    // Size classes
    const sizeClasses = {
      sm: "px-3 py-1.5",
      md: "px-4 py-2",
      lg: "px-6 py-3",
    };

    const textSizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    // Base button classes
    const baseClasses = "rounded-lg items-center justify-center flex-row";

    // Disabled/loading opacity
    const opacityClass = disabled || isLoading ? "opacity-50" : "";

    // Apply accent color for accent variant
    const accentStyle =
      variant === "accent"
        ? {
            backgroundColor: accentColor.color,
          }
        : undefined;

    return (
      <Pressable
        ref={ref}
        className={cn(
          baseClasses,
          getVariantClass(),
          sizeClasses[size],
          opacityClass,
          className,
        )}
        style={[accentStyle, style as StyleProp<ViewStyle>]}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <View className="flex-row items-center justify-center gap-2">
            <ActivityIndicator
              size="small"
              color={
                variant === "primary"
                  ? themeMode === "dark"
                    ? "#000000"
                    : "#FFFFFF"
                  : variant === "accent" || variant === "danger"
                    ? "#FFFFFF"
                    : themeMode === "dark"
                      ? "#F3F4F6"
                      : "#111827"
              }
            />
            <Text
              className={cn(
                getTextColorClass(),
                textSizeClasses[size],
                "font-medium",
              )}
            >
              {children}
            </Text>
          </View>
        ) : (
          <Text
            className={cn(
              getTextColorClass(),
              textSizeClasses[size],
              "font-medium",
            )}
          >
            {children}
          </Text>
        )}
      </Pressable>
    );
  },
);

TButton.displayName = "TButton";
