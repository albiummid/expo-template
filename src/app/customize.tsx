import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import {
  type AccentColor,
  FREE_ACCENT_COLORS,
  PREMIUM_ACCENT_COLORS,
  useTheme,
} from "../context/theme-context";

// Icon components (simplified for demo)
export const BackIcon = () => (
  <Text className="text-accent text-xl">{"<"}</Text>
);

export const GraduationCapIcon = ({ filled }: { filled?: boolean }) => (
  <Text className="text-2xl">{filled ? "🎓" : "🎓"}</Text>
);

export const PlusIcon = ({ filled }: { filled?: boolean }) => (
  <Text className="text-2xl">{filled ? "➕" : "+"}</Text>
);

export const GridIcon = ({ filled }: { filled?: boolean }) => (
  <Text className="text-2xl">{filled ? "⊞" : "⊡"}</Text>
);

// Color circle component
interface ColorCircleProps {
  color: AccentColor;
  isSelected: boolean;
  onPress: () => void;
  size?: "normal" | "large";
}

const ColorCircle = ({
  color,
  isSelected,
  onPress,
  size = "normal",
}: ColorCircleProps) => {
  const circleSize = size === "large" ? 48 : 40;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center justify-center"
      style={{
        width: circleSize + 8,
        height: circleSize + 8,
        borderRadius: (circleSize + 8) / 2,
        borderWidth: isSelected ? 2 : 0,
        borderColor: color.color,
      }}
    >
      <View
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          backgroundColor: color.color,
        }}
      />
    </TouchableOpacity>
  );
};

// Icon style option component
interface IconStyleOptionProps {
  style: "classic" | "simple";
  isSelected: boolean;
  onPress: () => void;
}

const IconStyleOption = ({
  style,
  isSelected,
  onPress,
}: IconStyleOptionProps) => {
  const { accentColor, themeMode } = useTheme();
  const isClassic = style === "classic";

  return (
    <TouchableOpacity onPress={onPress} className="items-center">
      <View className="mb-2 flex-row gap-2">
        <View
          className="h-12 w-12 items-center justify-center rounded-xl"
          style={{
            backgroundColor: isClassic ? accentColor.color : "transparent",
            borderWidth: isClassic ? 0 : 1,
            borderColor: themeMode === "light" ? "#333" : "#555",
          }}
        >
          <GraduationCapIcon filled={isClassic} />
        </View>
        <View
          className="h-12 w-12 items-center justify-center rounded-xl"
          style={{
            backgroundColor: isClassic ? accentColor.color : "transparent",
            borderWidth: isClassic ? 0 : 1,
            borderColor: themeMode === "light" ? "#333" : "#555",
          }}
        >
          <PlusIcon filled={isClassic} />
        </View>
        <View
          className="h-12 w-12 items-center justify-center rounded-xl"
          style={{
            backgroundColor: isClassic ? accentColor.color : "transparent",
            borderWidth: isClassic ? 0 : 1,
            borderColor: themeMode === "light" ? "#333" : "#555",
          }}
        >
          <GridIcon filled={isClassic} />
        </View>
      </View>
      <View
        className="rounded-full px-4 py-1.5"
        style={{
          backgroundColor: isSelected ? accentColor.color : "transparent",
        }}
      >
        <Text
          className="text-sm font-semibold uppercase"
          style={{
            color: isSelected
              ? "#fff"
              : themeMode === "light"
                ? "#666"
                : "#888",
          }}
        >
          {style}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Section header component
const SectionHeader = ({ title }: { title: string }) => {
  const { themeMode } = useTheme();
  return (
    <Text
      className="mb-4 text-base font-semibold"
      style={{ color: themeMode === "light" ? "#333" : "#fff" }}
    >
      {title}
    </Text>
  );
};

// Divider component
const Divider = () => {
  const { themeMode } = useTheme();
  return (
    <View
      className="my-6 h-px"
      style={{
        backgroundColor: themeMode === "light" ? "#e5e5e5" : "#222",
      }}
    />
  );
};

export default function CustomizeScreen() {
  const router = useRouter();
  const {
    themeMode,
    setThemeMode,
    isUltraDark,
    setIsUltraDark,
    accentColor,
    setAccentColor,
    iconStyle,
    setIconStyle,
    getThemeClass,
    getAccentClass,
  } = useTheme();

  // Get background and text colors based on theme
  const getBgColor = () => {
    if (themeMode === "light") return "#ffffff";
    if (isUltraDark) return "#000000";
    return "#0a0a0a";
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _getSecondaryBgColor = () => {
    if (themeMode === "light") return "#f5f5f5";
    if (isUltraDark) return "#050505";
    return "#111111";
  };

  const getTextColor = () => (themeMode === "light" ? "#000" : "#fff");
  const getSecondaryTextColor = () => (themeMode === "light" ? "#666" : "#888");

  return (
    <View
      className={`flex-1 ${getThemeClass()} ${getAccentClass()}`}
      style={{ backgroundColor: getBgColor() }}
    >
      <StatusBar style={themeMode === "light" ? "dark" : "light"} />

      {/* Header */}
      <View
        className="flex-row items-center px-4 pt-14 pb-4"
        style={{ backgroundColor: getBgColor() }}
      >
        <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2">
          <Text
            style={{
              color: accentColor.color,
              fontSize: 24,
              fontWeight: "600",
            }}
          >
            {"‹"}
          </Text>
        </TouchableOpacity>
        <Text
          className="ml-2 text-xl font-bold"
          style={{ color: getTextColor() }}
        >
          Customize
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme Section */}
        <View className="px-4">
          <View className="flex-row items-center justify-between py-4">
            <Text
              className="text-base font-medium"
              style={{ color: getTextColor() }}
            >
              Theme
            </Text>
            <TouchableOpacity
              onPress={() =>
                setThemeMode(themeMode === "light" ? "dark" : "light")
              }
            >
              <Text style={{ color: getSecondaryTextColor() }}>
                {themeMode === "light" ? "Light" : "Dark"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Divider />

        {/* Ultra Dark Theme Toggle */}
        <View className="px-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text
                className="text-base font-medium"
                style={{ color: getTextColor() }}
              >
                Use Ultra Dark Theme
              </Text>
              <Text
                className="mt-1 text-sm"
                style={{ color: getSecondaryTextColor() }}
              >
                This will change Dark theme appearance
              </Text>
            </View>
            <Switch
              value={isUltraDark}
              onValueChange={setIsUltraDark}
              trackColor={{ false: "#333", true: accentColor.color }}
              thumbColor="#fff"
              disabled={themeMode === "light"}
            />
          </View>
        </View>

        <Divider />

        {/* Category Icon Style */}
        <View className="px-4">
          <SectionHeader title="Category icon style" />
          <View className="flex-row justify-around">
            <IconStyleOption
              style="classic"
              isSelected={iconStyle === "classic"}
              onPress={() => setIconStyle("classic")}
            />
            <IconStyleOption
              style="simple"
              isSelected={iconStyle === "simple"}
              onPress={() => setIconStyle("simple")}
            />
          </View>
        </View>

        <Divider />

        {/* Free Accent Colors */}
        <View className="px-4">
          <SectionHeader title="Free accent colors" />
          <View className="flex-row justify-center gap-4">
            {FREE_ACCENT_COLORS.map((color) => (
              <ColorCircle
                key={color.id}
                color={color}
                isSelected={accentColor.id === color.id}
                onPress={() => setAccentColor(color)}
                size="large"
              />
            ))}
          </View>
        </View>

        <Divider />

        {/* Premium Accent Colors */}
        <View className="px-4">
          <SectionHeader title="Premium accent colors" />
          <View className="flex-row flex-wrap justify-center gap-2">
            {PREMIUM_ACCENT_COLORS.map((color) => (
              <ColorCircle
                key={color.id}
                color={color}
                isSelected={accentColor.id === color.id}
                onPress={() => setAccentColor(color)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
