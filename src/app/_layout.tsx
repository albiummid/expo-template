import "../global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";

import { ErrorBoundary } from "@/components/error-boundary";
import { NetworkProvider } from "@/context/network-context";
import { ThemeProvider } from "@/context/theme-context";
import { setupDeepLinks } from "@/lib/deep-links";
import { queryClient } from "@/lib/query-client";
import { initSentry } from "@/lib/sentry";
import { SheetProvider } from "@/providers/sheet-provider";

// Initialize Sentry before app renders
initSentry();

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

    // Setup deep linking
    const cleanupDeepLinks = setupDeepLinks();

    return () => {
      cleanupDeepLinks();
    };
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
      <ErrorBoundary>
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
      </ErrorBoundary>
      {/* Toast must be outside of all providers */}
      <Toast />
    </View>
  );
}
