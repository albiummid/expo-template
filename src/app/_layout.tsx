import "../global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";

import { NetworkProvider } from "@/context/network-context";
import { ThemeProvider } from "@/context/theme-context";
import { queryClient } from "@/lib/query-client";
import { SheetProvider } from "@/providers/sheet-provider";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load any assets, fonts, or data here
        // Example: await Font.loadAsync({ ... });
        // Example: await Asset.loadAsync([require('./assets/image.png')]);

        // Simulate a loading delay (remove in production)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // throw new Error("Failed to load assets");
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide splash screen once the app is ready
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>
        <KeyboardProvider>
          <ThemeProvider>
            <NetworkProvider showToasts={true}>
              <SheetProvider>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: "transparent" },
                  }}
                />
              </SheetProvider>
            </NetworkProvider>
          </ThemeProvider>
        </KeyboardProvider>
      </QueryClientProvider>
      {/* Toast must be outside of all providers */}
      <Toast />
    </View>
  );
}
