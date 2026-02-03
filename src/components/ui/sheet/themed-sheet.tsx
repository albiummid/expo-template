import { AlertCircle, Check, Info, X } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import ActionSheet, {
  SheetManager,
  type SheetProps,
} from "react-native-actions-sheet";
import { useTheme } from "@/context/theme-context";
import { TText, TView } from "../themed";

// ============================================================================
// Default Action Sheet
// ============================================================================

export function DefaultActionSheet(props: SheetProps<"default-sheet">) {
  const { themeMode, isUltraDark } = useTheme();
  const isDark = themeMode === "dark" || isUltraDark;

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{
        backgroundColor: isDark ? "#111827" : "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      gestureEnabled={true}
      defaultOverlayOpacity={0.3}
    >
      <TView variant="default" className="p-6">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <TText variant="primary" size="xl" weight="bold">
            {props.payload?.title || "Action Sheet"}
          </TText>
          <Pressable
            onPress={() => SheetManager.hide(props.sheetId)}
            className="p-2"
          >
            <X
              size={24}
              color={isDark ? "#FFFFFF" : "#111827"}
              strokeWidth={2}
            />
          </Pressable>
        </View>

        {/* Content */}
        <TText variant="secondary" className="mb-4">
          {props.payload?.description ||
            "This is a default action sheet with basic content."}
        </TText>

        {/* Actions */}
        <View className="gap-3">
          <Pressable
            onPress={() => {
              props.payload?.onConfirm?.();
              SheetManager.hide(props.sheetId);
            }}
            className="bg-blue-600 active:bg-blue-700 rounded-lg p-4"
          >
            <TText className="text-white text-center font-semibold">
              Confirm
            </TText>
          </Pressable>
          <Pressable
            onPress={() => SheetManager.hide(props.sheetId)}
            className={`${isDark ? "bg-gray-800" : "bg-gray-200"} active:opacity-80 rounded-lg p-4`}
          >
            <TText variant="primary" className="text-center font-semibold">
              Cancel
            </TText>
          </Pressable>
        </View>
      </TView>
    </ActionSheet>
  );
}

// ============================================================================
// Snapable Action Sheet (with snap points)
// ============================================================================

export function SnapableActionSheet(props: SheetProps<"snapable-sheet">) {
  const { themeMode, isUltraDark, accentColor } = useTheme();
  const isDark = themeMode === "dark" || isUltraDark;

  return (
    <ActionSheet
      id={props.sheetId}
      snapPoints={[30, 50, 100]}
      initialSnapIndex={1}
      containerStyle={{
        backgroundColor: isDark ? "#111827" : "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      gestureEnabled={true}
      defaultOverlayOpacity={0.3}
      indicatorStyle={{
        backgroundColor: isDark ? "#4B5563" : "#D1D5DB",
        width: 40,
      }}
    >
      <ScrollView className="flex-1">
        <TView variant="default" className="p-6">
          {/* Drag Indicator Helper Text */}
          <TText variant="muted" size="sm" className="text-center mb-4">
            Drag to snap between heights
          </TText>

          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <TText variant="primary" size="xl" weight="bold">
              Snapable Sheet
            </TText>
            <Pressable
              onPress={() => SheetManager.hide(props.sheetId)}
              className="p-2"
            >
              <X
                size={24}
                color={isDark ? "#FFFFFF" : "#111827"}
                strokeWidth={2}
              />
            </Pressable>
          </View>

          {/* Content Cards */}
          <View className="gap-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <TView key={item} variant="card" className="p-4 rounded-lg">
                <TText variant="primary" weight="semibold" className="mb-1">
                  Item {item}
                </TText>
                <TText variant="secondary" size="sm">
                  This sheet can be snapped to 30%, 50%, or 100% of screen
                  height.
                </TText>
              </TView>
            ))}
          </View>

          {/* Action Button */}
          <Pressable
            onPress={() => SheetManager.hide(props.sheetId)}
            style={{ backgroundColor: accentColor.color }}
            className="rounded-lg p-4 mt-4 active:opacity-80"
          >
            <TText className="text-white text-center font-semibold">Done</TText>
          </Pressable>
        </TView>
      </ScrollView>
    </ActionSheet>
  );
}

// ============================================================================
// Fullscreen Action Sheet
// ============================================================================

export function FullscreenActionSheet(props: SheetProps<"fullscreen-sheet">) {
  const { themeMode, isUltraDark } = useTheme();
  const isDark = themeMode === "dark" || isUltraDark;

  return (
    <ActionSheet
      id={props.sheetId}
      snapPoints={[100]}
      containerStyle={{
        backgroundColor: isDark ? "#000000" : "#FFFFFF",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
      gestureEnabled={true}
      defaultOverlayOpacity={0}
    >
      <TView variant="default" className="flex-1">
        {/* Header */}
        <TView
          variant="card"
          className="flex-row items-center justify-between p-4 border-b"
        >
          <TText variant="primary" size="xl" weight="bold">
            Fullscreen Sheet
          </TText>
          <Pressable
            onPress={() => SheetManager.hide(props.sheetId)}
            className="p-2"
          >
            <X
              size={24}
              color={isDark ? "#FFFFFF" : "#111827"}
              strokeWidth={2}
            />
          </Pressable>
        </TView>

        {/* Content */}
        <ScrollView className="flex-1 p-6">
          <TText variant="primary" size="2xl" weight="bold" className="mb-4">
            Full Screen Content
          </TText>
          <TText variant="secondary" className="mb-6">
            This sheet takes up the entire screen and can be used for complex
            forms, detailed views, or immersive experiences.
          </TText>

          {/* Example Form */}
          <View className="gap-4">
            <TView variant="card" className="p-4 rounded-lg">
              <TText variant="primary" weight="semibold" className="mb-2">
                Section 1
              </TText>
              <TText variant="secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </TText>
            </TView>

            <TView variant="card" className="p-4 rounded-lg">
              <TText variant="primary" weight="semibold" className="mb-2">
                Section 2
              </TText>
              <TText variant="secondary">
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </TText>
            </TView>

            <TView variant="card" className="p-4 rounded-lg">
              <TText variant="primary" weight="semibold" className="mb-2">
                Section 3
              </TText>
              <TText variant="secondary">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </TText>
            </TView>
          </View>
        </ScrollView>

        {/* Footer Actions */}
        <TView variant="card" className="p-4 border-t gap-3">
          <Pressable className="bg-blue-600 active:bg-blue-700 rounded-lg p-4">
            <TText className="text-white text-center font-semibold">
              Save Changes
            </TText>
          </Pressable>
          <Pressable
            onPress={() => SheetManager.hide(props.sheetId)}
            className={`${isDark ? "bg-gray-800" : "bg-gray-200"} active:opacity-80 rounded-lg p-4`}
          >
            <TText variant="primary" className="text-center font-semibold">
              Cancel
            </TText>
          </Pressable>
        </TView>
      </TView>
    </ActionSheet>
  );
}

// ============================================================================
// List Selection Action Sheet
// ============================================================================

interface ListItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function ListSelectionSheet(props: SheetProps<"list-selection-sheet">) {
  const { themeMode, isUltraDark } = useTheme();
  const isDark = themeMode === "dark" || isUltraDark;

  const items: ListItem[] = props.payload?.items || [
    { id: "1", title: "Option 1", description: "First option" },
    { id: "2", title: "Option 2", description: "Second option" },
    { id: "3", title: "Option 3", description: "Third option" },
  ];

  const handleSelect = (item: ListItem) => {
    props.payload?.onSelect?.(item);
    SheetManager.hide(props.sheetId);
  };

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{
        backgroundColor: isDark ? "#111827" : "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      gestureEnabled={true}
      defaultOverlayOpacity={0.3}
      indicatorStyle={{
        backgroundColor: isDark ? "#4B5563" : "#D1D5DB",
      }}
    >
      <TView variant="default" className="p-6">
        {/* Header */}
        <TText variant="primary" size="xl" weight="bold" className="mb-4">
          {props.payload?.title || "Select an Option"}
        </TText>

        {/* List */}
        <ScrollView className="max-h-96">
          <View className="gap-2">
            {items.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() => handleSelect(item)}
                className="active:opacity-70"
              >
                <TView
                  variant="outline"
                  className={`p-4 rounded-lg ${index !== items.length - 1 ? "mb-2" : ""}`}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <TText variant="primary" weight="semibold">
                        {item.title}
                      </TText>
                      {item.description && (
                        <TText variant="secondary" size="sm" className="mt-1">
                          {item.description}
                        </TText>
                      )}
                    </View>
                    {item.icon && <View className="ml-3">{item.icon}</View>}
                  </View>
                </TView>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </TView>
    </ActionSheet>
  );
}

// ============================================================================
// Confirmation Action Sheet
// ============================================================================

export function ConfirmationSheet(props: SheetProps<"confirmation-sheet">) {
  const { themeMode, isUltraDark } = useTheme();
  const isDark = themeMode === "dark" || isUltraDark;

  const variant = props.payload?.variant || "default";
  const iconColor =
    variant === "danger"
      ? "#EF4444"
      : variant === "success"
        ? "#10B981"
        : variant === "warning"
          ? "#F59E0B"
          : "#3B82F6";

  const Icon =
    variant === "danger" || variant === "warning" ? AlertCircle : Info;

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{
        backgroundColor: isDark ? "#111827" : "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      gestureEnabled={true}
      defaultOverlayOpacity={0.3}
    >
      <TView variant="default" className="p-6">
        {/* Icon */}
        <View className="items-center mb-4">
          <View
            className="w-16 h-16 rounded-full items-center justify-center"
            style={{ backgroundColor: `${iconColor}20` }}
          >
            <Icon size={32} color={iconColor} strokeWidth={2} />
          </View>
        </View>

        {/* Title */}
        <TText
          variant="primary"
          size="xl"
          weight="bold"
          className="text-center mb-2"
        >
          {props.payload?.title || "Are you sure?"}
        </TText>

        {/* Description */}
        <TText variant="secondary" className="text-center mb-6">
          {props.payload?.description ||
            "This action cannot be undone. Please confirm to proceed."}
        </TText>

        {/* Actions */}
        <View className="gap-3">
          <Pressable
            onPress={() => {
              props.payload?.onConfirm?.();
              SheetManager.hide(props.sheetId);
            }}
            style={{
              backgroundColor: variant === "danger" ? "#EF4444" : iconColor,
            }}
            className="rounded-lg p-4 active:opacity-80"
          >
            <TText className="text-white text-center font-semibold">
              {props.payload?.confirmText || "Confirm"}
            </TText>
          </Pressable>
          <Pressable
            onPress={() => {
              props.payload?.onCancel?.();
              SheetManager.hide(props.sheetId);
            }}
            className={`${isDark ? "bg-gray-800" : "bg-gray-200"} active:opacity-80 rounded-lg p-4`}
          >
            <TText variant="primary" className="text-center font-semibold">
              {props.payload?.cancelText || "Cancel"}
            </TText>
          </Pressable>
        </View>
      </TView>
    </ActionSheet>
  );
}

// ============================================================================
// Bottom Menu Action Sheet
// ============================================================================

interface MenuItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  destructive?: boolean;
}

export function BottomMenuSheet(props: SheetProps<"bottom-menu-sheet">) {
  const { themeMode, isUltraDark } = useTheme();
  const isDark = themeMode === "dark" || isUltraDark;

  const menuItems: MenuItem[] = props.payload?.items || [];

  const handleItemPress = (item: MenuItem) => {
    item.onPress?.();
    SheetManager.hide(props.sheetId);
  };

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{
        backgroundColor: isDark ? "#111827" : "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      gestureEnabled={true}
      defaultOverlayOpacity={0.3}
      indicatorStyle={{
        backgroundColor: isDark ? "#4B5563" : "#D1D5DB",
      }}
    >
      <TView variant="default" className="p-4">
        {/* Title (optional) */}
        {props.payload?.title && (
          <TText
            variant="primary"
            size="lg"
            weight="semibold"
            className="px-2 mb-2"
          >
            {props.payload.title}
          </TText>
        )}

        {/* Menu Items */}
        <View className="gap-1">
          {menuItems.map((item, index) => (
            <Pressable
              key={item.id}
              onPress={() => handleItemPress(item)}
              className={`${isDark ? "active:bg-gray-800" : "active:bg-gray-100"} rounded-lg`}
            >
              <View className="flex-row items-center p-4">
                {item.icon && <View className="mr-3">{item.icon}</View>}
                <TText
                  variant={item.destructive ? "error" : "primary"}
                  size="base"
                  weight="medium"
                  className="flex-1"
                >
                  {item.title}
                </TText>
              </View>
              {index < menuItems.length - 1 && (
                <View
                  className={`ml-14 h-px ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
                />
              )}
            </Pressable>
          ))}
        </View>

        {/* Cancel Button */}
        <Pressable
          onPress={() => SheetManager.hide(props.sheetId)}
          className="mt-2"
        >
          <TView variant="outline" className="rounded-lg p-4">
            <TText variant="primary" className="text-center font-semibold">
              Cancel
            </TText>
          </TView>
        </Pressable>
      </TView>
    </ActionSheet>
  );
}

// ============================================================================
// Custom Styled Action Sheet (with accent colors)
// ============================================================================

export function CustomStyledSheet(props: SheetProps<"custom-styled-sheet">) {
  const { themeMode, isUltraDark, accentColor } = useTheme();
  const isDark = themeMode === "dark" || isUltraDark;

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{
        backgroundColor: isDark ? "#111827" : "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      gestureEnabled={true}
      defaultOverlayOpacity={0.3}
      indicatorStyle={{
        backgroundColor: accentColor.color,
        width: 50,
      }}
    >
      <TView variant="default" className="p-6">
        {/* Accent Header */}
        <TView
          variant="accent"
          className="p-4 rounded-lg mb-4"
          style={{ borderLeftColor: accentColor.color }}
        >
          <TText variant="accent" size="xl" weight="bold" className="mb-1">
            {props.payload?.title || "Custom Styled Sheet"}
          </TText>
          <TText variant="secondary" size="sm">
            Using your theme's accent color
          </TText>
        </TView>

        {/* Content */}
        <TText variant="primary" className="mb-4">
          {props.payload?.description ||
            "This sheet uses your custom accent color for branding consistency."}
        </TText>

        {/* Feature List */}
        <View className="gap-3 mb-6">
          {["Feature 1", "Feature 2", "Feature 3"].map((feature, index) => (
            <View key={index} className="flex-row items-center">
              <View
                className="w-6 h-6 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: accentColor.color }}
              >
                <Check size={16} color="#FFFFFF" strokeWidth={3} />
              </View>
              <TText variant="primary">{feature}</TText>
            </View>
          ))}
        </View>

        {/* Action Button with Accent Color */}
        <Pressable
          onPress={() => {
            props.payload?.onAction?.();
            SheetManager.hide(props.sheetId);
          }}
          style={{ backgroundColor: accentColor.color }}
          className="rounded-lg p-4 active:opacity-80"
        >
          <TText className="text-white text-center font-semibold">
            {props.payload?.buttonText || "Continue"}
          </TText>
        </Pressable>
      </TView>
    </ActionSheet>
  );
}
