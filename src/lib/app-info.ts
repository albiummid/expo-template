import * as Application from "expo-application";
import { Platform } from "react-native";

interface InstallReferrerResponse {
  installReferrer?: string;
  installTime?: Date;
}

/**
 * Application information utilities
 */
export const appInfo = {
  /**
   * Get the application name
   */
  getName: (): string => {
    return Application.applicationName ?? "Unknown";
  },

  /**
   * Get the application version (e.g., "1.0.0")
   */
  getVersion: (): string => {
    return Application.nativeApplicationVersion ?? "0.0.0";
  },

  /**
   * Get the build number (e.g., "1" on iOS, "1" on Android)
   */
  getBuildNumber: (): string => {
    return Application.nativeBuildVersion ?? "0";
  },

  /**
   * Get the bundle identifier (iOS) or package name (Android)
   */
  getBundleId: (): string => {
    return Application.applicationId ?? "unknown";
  },

  /**
   * Get formatted version string (e.g., "1.0.0 (1)")
   */
  getFullVersion: (): string => {
    const version = appInfo.getVersion();
    const build = appInfo.getBuildNumber();
    return `${version} (${build})`;
  },

  /**
   * Get the Android ID (Android only)
   * Returns null on iOS
   */
  getAndroidId: async (): Promise<string | null> => {
    if (Platform.OS === "android") {
      return Application.getAndroidId();
    }
    return null;
  },

  /**
   * Get installation referrer (Android only)
   * Returns the referrer URL that the user was directed from
   */
  getInstallReferrer: async (): Promise<string | null> => {
    if (Platform.OS === "android") {
      try {
        const Referrer =
          (await Application.getInstallReferrerAsync()) as InstallReferrerResponse;
        return Referrer.installReferrer ?? null;
      } catch {
        return null;
      }
    }
    return null;
  },

  /**
   * Get the install time of the app (Android only)
   */
  getInstallTime: async (): Promise<Date | null> => {
    if (Platform.OS === "android") {
      try {
        const Referrer =
          (await Application.getInstallReferrerAsync()) as InstallReferrerResponse;
        return Referrer.installTime ?? null;
      } catch {
        return null;
      }
    }
    return null;
  },

  /**
   * Get the iOS ID for vendor (iOS only)
   * Returns null on Android
   */
  getIosIdForVendor: async (): Promise<string | null> => {
    if (Platform.OS === "ios") {
      return Application.getIosIdForVendorAsync();
    }
    return null;
  },
};
