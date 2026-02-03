// Storage utilities
export { mmkvStorage, storage, zustandStorage } from "./storage";

// API and networking
export { api, apiDelete, apiGet, apiPatch, apiPost, apiPut } from "./api";
export {
  getIpAddress,
  getNetworkState,
  isCellular,
  isOnline,
  isWifi,
  useNetworkState,
} from "./network";

// Query client
export {
  clearQueryCache,
  invalidateAllQueries,
  prefetchQuery,
  queryClient,
} from "./query-client";

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
export type { LoginFormData, RegisterFormData } from "./form-utils";

// UI utilities
export { cn } from "./cn";

// Application info
export { appInfo } from "./app-info";

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
