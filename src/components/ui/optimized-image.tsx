import { Image as ExpoImage } from "expo-image";
import { memo } from "react";

interface OptimizedImageProps {
  source: string;
  width: number;
  height: number;
  contentFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  priority?: boolean;
  transition?: number;
}

/**
 * Optimized image component with built-in caching and performance optimizations
 * Uses expo-image for native performance
 */
export const OptimizedImage = memo(function OptimizedImage({
  source,
  width,
  height,
  contentFit = "cover",
  priority = false,
  transition = 200,
}: OptimizedImageProps) {
  return (
    <ExpoImage
      source={{ uri: source }}
      style={{ width, height }}
      contentFit={contentFit}
      priority={priority ? "high" : "low"}
      cachePolicy="memory-disk"
      transition={transition}
    />
  );
});

interface OptimizedAvatarProps {
  source: string;
  size: number;
  borderRadius?: number;
}

/**
 * Optimized avatar component with rounded corners
 */
export const OptimizedAvatar = memo(function OptimizedAvatar({
  source,
  size,
  borderRadius = size / 2,
}: OptimizedAvatarProps) {
  return (
    <ExpoImage
      source={{ uri: source }}
      style={{
        width: size,
        height: size,
        borderRadius,
      }}
      contentFit="cover"
      cachePolicy="memory-disk"
    />
  );
});
