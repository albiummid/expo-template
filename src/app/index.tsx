import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

// Example card component
const ExampleCard = ({
  title,
  description,
  accentColor,
  themeMode,
}: {
  title: string;
  description: string;
  accentColor: string;
  themeMode: string;
}) => {
  const cardBg = themeMode === 'light' ? '#f5f5f5' : '#1a1a1a';
  const textColor = themeMode === 'light' ? '#000' : '#fff';
  const secondaryText = themeMode === 'light' ? '#666' : '#888';

  return (
    <View className="rounded-2xl p-4 mb-4" style={{ backgroundColor: cardBg }}>
      <View
        className="w-12 h-12 rounded-xl items-center justify-center mb-3"
        style={{ backgroundColor: accentColor }}
      >
        <Text className="text-white text-xl font-bold">{title.charAt(0)}</Text>
      </View>
      <Text className="text-lg font-semibold mb-1" style={{ color: textColor }}>
        {title}
      </Text>
      <Text style={{ color: secondaryText }}>{description}</Text>
    </View>
  );
};

// Stats component
const StatBox = ({
  value,
  label,
  accentColor,
  themeMode,
}: {
  value: string;
  label: string;
  accentColor: string;
  themeMode: string;
}) => {
  const cardBg = themeMode === 'light' ? '#f5f5f5' : '#1a1a1a';
  const textColor = themeMode === 'light' ? '#000' : '#fff';
  const secondaryText = themeMode === 'light' ? '#666' : '#888';

  return (
    <View className="flex-1 rounded-2xl p-4 items-center" style={{ backgroundColor: cardBg }}>
      <Text className="text-3xl font-bold mb-1" style={{ color: accentColor }}>
        {value}
      </Text>
      <Text style={{ color: secondaryText }}>{label}</Text>
    </View>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const { themeMode, isUltraDark, accentColor, iconStyle, getThemeClass, getAccentClass } =
    useTheme();

  // Get background color based on theme
  const getBgColor = () => {
    if (themeMode === 'light') return '#ffffff';
    if (isUltraDark) return '#000000';
    return '#0a0a0a';
  };

  const getTextColor = () => (themeMode === 'light' ? '#000' : '#fff');
  const getSecondaryTextColor = () => (themeMode === 'light' ? '#666' : '#888');

  const cards = [
    { title: 'Projects', description: 'Manage your ongoing projects' },
    { title: 'Tasks', description: 'Track your daily tasks efficiently' },
    { title: 'Notes', description: 'Keep important notes organized' },
  ];

  return (
    <View
      className={`flex-1 ${getThemeClass()} ${getAccentClass()}`}
      style={{ backgroundColor: getBgColor() }}
    >
      <StatusBar style={themeMode === 'light' ? 'dark' : 'light'} />

      {/* Header */}
      <View className="px-6 pt-14 pb-4">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-sm" style={{ color: getSecondaryTextColor() }}>
              Welcome back
            </Text>
            <Text className="text-2xl font-bold" style={{ color: getTextColor() }}>
              Dashboard
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/customize')}
            className="w-12 h-12 rounded-full items-center justify-center"
            style={{ backgroundColor: accentColor.color }}
          >
            <Text className="text-white text-lg">⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme Info Banner */}
        <View className="rounded-2xl p-5 mb-6" style={{ backgroundColor: accentColor.color }}>
          <Text className="text-white text-lg font-bold mb-2">Current Theme Settings</Text>
          <View className="flex-row flex-wrap gap-2">
            <View className="bg-white/20 px-3 py-1.5 rounded-full">
              <Text className="text-white text-sm font-medium">
                {themeMode === 'light' ? '☀️ Light' : isUltraDark ? '🌑 Ultra Dark' : '🌙 Dark'}
              </Text>
            </View>
            <View className="bg-white/20 px-3 py-1.5 rounded-full">
              <Text className="text-white text-sm font-medium">🎨 {accentColor.name}</Text>
            </View>
            <View className="bg-white/20 px-3 py-1.5 rounded-full">
              <Text className="text-white text-sm font-medium">
                {iconStyle === 'classic' ? '🖼️ Classic' : '✨ Simple'}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row gap-4 mb-6">
          <StatBox
            value="12"
            label="Projects"
            accentColor={accentColor.color}
            themeMode={themeMode}
          />
          <StatBox value="48" label="Tasks" accentColor={accentColor.color} themeMode={themeMode} />
          <StatBox value="5" label="Done" accentColor={accentColor.color} themeMode={themeMode} />
        </View>

        {/* Cards */}
        <Text className="text-lg font-semibold mb-4" style={{ color: getTextColor() }}>
          Quick Access
        </Text>
        {cards.map((card, index) => (
          <ExampleCard
            key={index}
            title={card.title}
            description={card.description}
            accentColor={accentColor.color}
            themeMode={themeMode}
          />
        ))}

        {/* Accent Color Preview */}
        <Text className="text-lg font-semibold mb-4 mt-2" style={{ color: getTextColor() }}>
          Accent Color in Action
        </Text>
        <View
          className="rounded-2xl p-5"
          style={{ backgroundColor: themeMode === 'light' ? '#f5f5f5' : '#1a1a1a' }}
        >
          {/* Buttons Preview */}
          <View className="flex-row gap-3 mb-4">
            <TouchableOpacity
              className="flex-1 py-3 rounded-xl items-center"
              style={{ backgroundColor: accentColor.color }}
            >
              <Text className="text-white font-semibold">Primary</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 py-3 rounded-xl items-center border-2"
              style={{ borderColor: accentColor.color }}
            >
              <Text style={{ color: accentColor.color }} className="font-semibold">
                Outline
              </Text>
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <View className="mb-4">
            <Text className="text-sm mb-2" style={{ color: getSecondaryTextColor() }}>
              Progress Bar
            </Text>
            <View
              className="h-2 rounded-full"
              style={{ backgroundColor: themeMode === 'light' ? '#e5e5e5' : '#333' }}
            >
              <View
                className="h-2 rounded-full"
                style={{ backgroundColor: accentColor.color, width: '70%' }}
              />
            </View>
          </View>

          {/* Badge */}
          <View className="flex-row items-center gap-2">
            <Text style={{ color: getSecondaryTextColor() }}>Badges:</Text>
            <View className="px-3 py-1 rounded-full" style={{ backgroundColor: accentColor.color }}>
              <Text className="text-white text-sm font-medium">New</Text>
            </View>
            <View
              className="px-3 py-1 rounded-full"
              style={{
                backgroundColor: accentColor.color + '30',
              }}
            >
              <Text style={{ color: accentColor.color }} className="text-sm font-medium">
                Featured
              </Text>
            </View>
          </View>
        </View>

        {/* Customize Button */}
        <TouchableOpacity
          onPress={() => router.push('/customize')}
          className="mt-6 py-4 rounded-2xl items-center"
          style={{ backgroundColor: accentColor.color }}
        >
          <Text className="text-white text-lg font-semibold">⚙️ Customize Theme</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
