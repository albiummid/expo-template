import { z } from "zod";

/**
 * Environment variable validation schema
 * This ensures all required environment variables are present and correctly typed
 */
const envSchema = z.object({
  // API Configuration
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_API_VERSION: z.string().default("v1"),

  // Environment
  EXPO_PUBLIC_ENVIRONMENT: z.enum(["development", "staging", "production"]),

  // Feature Flags
  EXPO_PUBLIC_ENABLE_ANALYTICS: z
    .enum(["true", "false"])
    .default("false")
    .transform((val) => val === "true"),
  EXPO_PUBLIC_ENABLE_CRASH_REPORTING: z
    .enum(["true", "false"])
    .default("false")
    .transform((val) => val === "true"),

  // Third-party Services
  EXPO_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  EXPO_PUBLIC_POSTHOG_API_KEY: z.string().optional(),

  // App Configuration
  EXPO_PUBLIC_APP_NAME: z.string().default("Expo Template"),
  EXPO_PUBLIC_SUPPORT_EMAIL: z.string().email().optional(),
});

/**
 * Parse and validate environment variables
 * This will throw an error if validation fails, preventing the app from running with invalid config
 */
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors,
  );
  throw new Error("Invalid environment variables");
}

/**
 * Type-safe environment variables
 * Use this throughout your app instead of process.env
 */
export const env = parsed.data;

/**
 * Check if running in development environment
 */
export const isDevelopment = env.EXPO_PUBLIC_ENVIRONMENT === "development";

/**
 * Check if running in staging environment
 */
export const isStaging = env.EXPO_PUBLIC_ENVIRONMENT === "staging";

/**
 * Check if running in production environment
 */
export const isProduction = env.EXPO_PUBLIC_ENVIRONMENT === "production";

/**
 * Type for environment values
 */
export type Env = z.infer<typeof envSchema>;
