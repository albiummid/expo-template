// Storage utilities

// API and networking
export { api, apiDelete, apiGet, apiPatch, apiPost, apiPut } from "./api";
// Application info
export { appInfo } from "./app-info";
// UI utilities
export { cn } from "./cn";
export type { Env } from "./env";
// Environment
export { env, isDevelopment, isProduction, isStaging } from "./env";
export type { LoginFormData, RegisterFormData } from "./form-utils";
// Form utilities
export {
  getFieldError,
  hasFieldError,
  loginSchema,
  registerSchema,
  schemas,
  useZodForm,
  z,
} from "./form-utils";
export {
  getIpAddress,
  getNetworkState,
  isCellular,
  isOnline,
  isWifi,
  useNetworkState,
} from "./network";

// Notifications
export {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  cancelAllNotifications,
  cancelNotification,
  getBadgeCount,
  getDevicePushToken,
  getLastNotificationResponse,
  registerForPushNotificationsAsync,
  scheduleLocalNotification,
  setBadgeCount,
  setupNotificationChannel,
} from "./notifications";

// Performance monitoring
export {
  debounce,
  deferWork,
  measureAsync,
  measureRender,
  memoize,
  throttle,
} from "./performance";
// Query client
export {
  clearQueryCache,
  invalidateAllQueries,
  prefetchQuery,
  queryClient,
} from "./query-client";
// Sentry
export {
  addBreadcrumb,
  captureException,
  captureMessage,
  initSentry,
  setContext,
  setTag,
  setUser,
  startSpan,
} from "./sentry";
export { mmkvStorage, storage, zustandStorage } from "./storage";
