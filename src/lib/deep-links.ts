import * as Linking from "expo-linking";
import { router } from "expo-router";

export type DeepLinkRoute =
  | "/"
  | "/customize"
  | "/profile/:id"
  | "/settings"
  | "/auth/login"
  | "/auth/callback";

interface DeepLinkConfig {
  path: string;
  route: string;
  params?: Record<string, string>;
}

// Deep link mappings
const deepLinkMap: Record<string, DeepLinkConfig> = {
  profile: {
    path: "/profile/:id",
    route: "/profile/[id]",
    params: { id: "" },
  },
  settings: {
    path: "/settings",
    route: "/settings",
  },
  customize: {
    path: "/customize",
    route: "/customize",
  },
  "auth-callback": {
    path: "/auth/callback",
    route: "/auth/callback",
  },
};

/**
 * Handle a deep link URL and navigate to the appropriate screen
 * @param url - The deep link URL
 * @returns boolean indicating if the link was handled
 */
export const handleDeepLink = (url: string): boolean => {
  try {
    const { path, queryParams } = Linking.parse(url);

    if (!path) return false;

    // Handle specific paths
    for (const [, config] of Object.entries(deepLinkMap)) {
      const regex = new RegExp(
        "^" + config.path.replace(/:\w+/g, "([^/]+)") + "$",
      );
      const match = path.match(regex);

      if (match) {
        const params: Record<string, string> = {};
        // Add query params
        if (queryParams) {
          Object.entries(queryParams).forEach(([key, value]) => {
            if (typeof value === "string") {
              params[key] = value;
            } else if (Array.isArray(value) && value.length > 0) {
              params[key] = value[0];
            }
          });
        }
        // Add path params
        const paramNames = config.path.match(/:\w+/g) || [];
        paramNames.forEach((name, index) => {
          params[name.substring(1)] = match[index + 1];
        });

        router.push({
          pathname: config.route as any,
          params,
        });

        return true;
      }
    }

    // Handle home route
    if (path === "/" || path === "") {
      router.push("/");
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error handling deep link:", error);
    return false;
  }
};

/**
 * Generate a deep link URL for sharing
 * @param route - The route path
 * @param params - Route parameters
 * @returns The full deep link URL
 */
export const generateDeepLink = (
  route: string,
  params?: Record<string, string>,
): string => {
  const scheme = "expotemplate";
  const path = route.replace(/\[([^\]]+)\]/g, ":$1");

  let url = `${scheme}://${path}`;

  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
    url += `?${searchParams.toString()}`;
  }

  return url;
};

/**
 * Setup deep linking listeners
 * Call this in your root layout
 */
export const setupDeepLinks = (): (() => void) => {
  // Handle deep links when app is already running
  const subscription = Linking.addEventListener("url", ({ url }) => {
    handleDeepLink(url);
  });

  // Handle deep link that launched the app
  Linking.getInitialURL().then((url) => {
    if (url) {
      handleDeepLink(url);
    }
  });

  // Return cleanup function
  return () => {
    subscription.remove();
  };
};

/**
 * Check if a URL can be opened by the app
 * @param url - The URL to check
 * @returns Promise<boolean>
 */
export const canOpenURL = async (url: string): Promise<boolean> => {
  return Linking.canOpenURL(url);
};

/**
 * Open a URL externally (in browser or another app)
 * @param url - The URL to open
 */
export const openURL = async (url: string): Promise<void> => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    console.warn(`Cannot open URL: ${url}`);
  }
};
