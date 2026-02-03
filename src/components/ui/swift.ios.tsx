import type { ButtonProps as SwiftButtonProps } from "@expo/ui/swift-ui";
import {
  Host,
  Button as SwiftButton,
  DateTimePicker as SwiftDatePicker,
  Gauge as SwiftGauge,
  LinearProgress as SwiftLinearProgress,
  Picker as SwiftPicker,
  Text as SwiftText,
  VStack,
  HStack,
  Spacer,
  BottomSheet as SwiftBottomSheet,
} from "@expo/ui/swift-ui";
import { Platform } from "react-native";
import { useTheme } from "@/context/theme-context";

// Note: These components only work on iOS
// Use Platform.OS === 'ios' checks when using them

// ============================================================================
// TSwiftButton - Themed SwiftUI Button
// ============================================================================

interface TSwiftButtonProps extends Omit<SwiftButtonProps, "variant"> {
  variant?: "default" | "bordered" | "borderless" | "plain" | "accent";
  children: string;
}

export function TSwiftButton({
  variant = "default",
  children,
  ...props
}: TSwiftButtonProps) {
  const { accentColor } = useTheme();

  if (Platform.OS !== "ios") {
    return null;
  }

  // Map variant to SwiftUI button variant
  const swiftVariant = variant === "accent" ? "bordered" : (variant as any);

  return (
    <Host matchContents>
      <SwiftButton
        variant={swiftVariant}
        color={
          variant === "accent"
            ? {
                contentColor: accentColor.color,
                containerColor: `${accentColor.color}20`,
              }
            : undefined
        }
        {...props}
      >
        {children}
      </SwiftButton>
    </Host>
  );
}

// ============================================================================
// TSwiftDatePicker - Themed SwiftUI DateTimePicker
// ============================================================================

interface TSwiftDatePickerProps {
  onDateSelected: (date: string) => void;
  initialDate?: string;
  displayedComponents?: "date" | "hourAndMinute" | "hourMinuteAndSecond";
  variant?: "wheel" | "graphical" | "compact";
}

export function TSwiftDatePicker({
  onDateSelected,
  initialDate = new Date().toISOString(),
  displayedComponents = "date",
  variant = "wheel",
}: TSwiftDatePickerProps) {
  const { accentColor } = useTheme();

  if (Platform.OS !== "ios") {
    return null;
  }

  return (
    <Host matchContents>
      <SwiftDatePicker
        onDateSelected={onDateSelected}
        initialDate={initialDate}
        displayedComponents={displayedComponents}
        variant={variant}
        color={accentColor.color}
      />
    </Host>
  );
}

// ============================================================================
// TSwiftGauge - Themed SwiftUI Gauge
// ============================================================================

interface TSwiftGaugeProps {
  current: { value: number; label?: string };
  min?: { value: number; label?: string };
  max?: { value: number; label?: string };
  type?:
    | "accessoryCircular"
    | "accessoryCircularCapacity"
    | "linearCapacity"
    | "circularCapacity";
  width?: number;
}

export function TSwiftGauge({
  current,
  min = { value: 0, label: "0" },
  max = { value: 1, label: "1" },
  type = "circularCapacity",
  width = 200,
}: TSwiftGaugeProps) {
  const { accentColor } = useTheme();

  if (Platform.OS !== "ios") {
    return null;
  }

  return (
    <Host style={{ width }} matchContents>
      <SwiftGauge
        current={current}
        min={min}
        max={max}
        type={type}
        color={accentColor.color}
      />
    </Host>
  );
}

// ============================================================================
// TSwiftProgress - Themed SwiftUI LinearProgress
// ============================================================================

interface TSwiftProgressProps {
  progress: number;
  width?: number;
  height?: number;
}

export function TSwiftProgress({
  progress,
  width = 300,
  height = 8,
}: TSwiftProgressProps) {
  const { accentColor } = useTheme();

  if (Platform.OS !== "ios") {
    return null;
  }

  return (
    <Host style={{ width, height }}>
      <SwiftLinearProgress progress={progress} color={accentColor.color} />
    </Host>
  );
}

// ============================================================================
// TSwiftPicker - Themed SwiftUI Picker
// ============================================================================

interface TSwiftPickerProps {
  options: string[];
  selectedIndex: number;
  onOptionSelected: (event: { nativeEvent: { index: number } }) => void;
  label?: string;
  variant?: "wheel" | "menu" | "segmented";
}

export function TSwiftPicker({
  options,
  selectedIndex,
  onOptionSelected,
  label,
  variant = "wheel",
}: TSwiftPickerProps) {
  const { accentColor } = useTheme();

  if (Platform.OS !== "ios") {
    return null;
  }

  return (
    <Host matchContents>
      <SwiftPicker
        options={options}
        selectedIndex={selectedIndex}
        onOptionSelected={onOptionSelected}
        label={label}
        variant={variant}
        color={accentColor.color}
      />
    </Host>
  );
}

// ============================================================================
// TSwiftBottomSheet - Themed SwiftUI Bottom Sheet
// ============================================================================

interface TSwiftBottomSheetProps {
  isOpened: boolean;
  onIsOpenedChange: (event: { nativeEvent: { isOpened: boolean } }) => void;
  children: React.ReactNode;
}

export function TSwiftBottomSheet({
  isOpened,
  onIsOpenedChange,
  children,
}: TSwiftBottomSheetProps) {
  const { themeMode, isUltraDark } = useTheme();

  if (Platform.OS !== "ios") {
    return null;
  }

  const isDark = themeMode === "dark" || isUltraDark;

  return (
    <Host style={{ position: "absolute", width: "100%" }}>
      <SwiftBottomSheet
        isOpened={isOpened}
        onIsOpenedChange={onIsOpenedChange}
        backgroundColor={isDark ? "#111827" : "#FFFFFF"}
      >
        {children}
      </SwiftBottomSheet>
    </Host>
  );
}

// ============================================================================
// TSwiftStack - Themed SwiftUI Layout Components
// ============================================================================

interface TSwiftStackProps {
  children: React.ReactNode;
  spacing?: number;
  alignment?: "leading" | "center" | "trailing";
}

export function TSwiftVStack({
  children,
  spacing = 8,
  alignment = "leading",
}: TSwiftStackProps) {
  if (Platform.OS !== "ios") {
    return null;
  }

  return (
    <Host matchContents>
      <VStack spacing={spacing} alignment={alignment}>
        {children}
      </VStack>
    </Host>
  );
}

export function TSwiftHStack({
  children,
  spacing = 8,
  alignment = "center",
}: TSwiftStackProps) {
  if (Platform.OS !== "ios") {
    return null;
  }

  return (
    <Host matchContents>
      <HStack spacing={spacing} alignment={alignment}>
        {children}
      </HStack>
    </Host>
  );
}

// ============================================================================
// TSwiftText - Themed SwiftUI Text
// ============================================================================

interface TSwiftTextProps {
  children: string;
  variant?: "primary" | "secondary" | "accent";
  weight?: "regular" | "medium" | "semibold" | "bold";
  size?: "small" | "body" | "large" | "title";
}

export function TSwiftText({
  children,
  variant = "primary",
  weight = "regular",
  size = "body",
}: TSwiftTextProps) {
  const { themeMode, isUltraDark, accentColor } = useTheme();

  if (Platform.OS !== "ios") {
    return null;
  }

  const isDark = themeMode === "dark" || isUltraDark;

  const getColor = () => {
    switch (variant) {
      case "primary":
        return isDark ? "#FFFFFF" : "#000000";
      case "secondary":
        return isDark ? "#D1D5DB" : "#6B7280";
      case "accent":
        return accentColor.color;
      default:
        return isDark ? "#FFFFFF" : "#000000";
    }
  };

  return (
    <Host matchContents>
      <SwiftText
        color={getColor()}
        fontWeight={weight}
        fontSize={
          size === "small"
            ? 14
            : size === "body"
              ? 16
              : size === "large"
                ? 18
                : 24
        }
      >
        {children}
      </SwiftText>
    </Host>
  );
}

// ============================================================================
// iOS Card Component Example
// ============================================================================

interface TSwiftCardProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export function TSwiftCard({ title, description, action }: TSwiftCardProps) {
  const { themeMode, isUltraDark, accentColor } = useTheme();

  if (Platform.OS !== "ios") {
    return (
      <TView variant="card" className="p-4 rounded-lg">
        <TText variant="primary" weight="semibold" className="mb-1">
          {title}
        </TText>
        {description && (
          <TText variant="secondary" size="sm">
            {description}
          </TText>
        )}
      </TView>
    );
  }

  const isDark = themeMode === "dark" || isUltraDark;

  return (
    <Host matchContents>
      <VStack
        spacing={12}
        alignment="leading"
        backgroundColor={isDark ? "#1F2937" : "#FFFFFF"}
        cornerRadius={12}
        padding={16}
      >
        <SwiftText
          color={isDark ? "#FFFFFF" : "#000000"}
          fontWeight="semibold"
          fontSize={18}
        >
          {title}
        </SwiftText>
        {description && (
          <SwiftText
            color={isDark ? "#D1D5DB" : "#6B7280"}
            fontWeight="regular"
            fontSize={14}
          >
            {description}
          </SwiftText>
        )}
        {action && (
          <SwiftButton
            variant="bordered"
            onPress={action.onPress}
            elementColors={{
              contentColor: accentColor.color,
              containerColor: `${accentColor.color}20`,
            }}
          >
            {action.label}
          </SwiftButton>
        )}
      </VStack>
    </Host>
  );
}
