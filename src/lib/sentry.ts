import * as Sentry from "@sentry/react-native";
import { env, isDevelopment } from "./env";

/**
 * Initialize Sentry for error tracking and performance monitoring
 */
export const initSentry = () => {
  const dsn = env.EXPO_PUBLIC_SENTRY_DSN;

  if (!dsn) {
    console.warn("Sentry DSN not configured. Error tracking disabled.");
    return;
  }

  Sentry.init({
    dsn,
    environment: env.EXPO_PUBLIC_ENVIRONMENT,
    debug: isDevelopment,
    tracesSampleRate: isDevelopment ? 1.0 : 0.1,
    profilesSampleRate: isDevelopment ? 1.0 : 0.1,
  });
};

/**
 * Capture an exception to Sentry
 */
export const captureException = (
  error: Error,
  context?: Record<string, any>,
) => {
  Sentry.captureException(error, {
    extra: context,
  });
};

/**
 * Capture a message to Sentry
 */
export const captureMessage = Sentry.captureMessage;

/**
 * Set user information for Sentry
 */
export const setUser = (
  user: { id: string; email?: string; username?: string } | null,
) => {
  Sentry.setUser(user);
};

/**
 * Add a breadcrumb for debugging
 */
export const addBreadcrumb = (breadcrumb: {
  message?: string;
  category?: string;
  level?: Sentry.SeverityLevel;
  data?: Record<string, any>;
}) => {
  Sentry.addBreadcrumb(breadcrumb);
};

/**
 * Start a performance span
 */
export const startSpan = <T>(name: string, callback: () => T): T => {
  return Sentry.startSpan({ name, op: "custom" }, callback);
};

/**
 * Configure Sentry scope with additional context
 */
export const setContext = (name: string, context: Record<string, any>) => {
  Sentry.setContext(name, context);
};

/**
 * Add tag to current scope
 */
export const setTag = (key: string, value: string) => {
  Sentry.setTag(key, value);
};
