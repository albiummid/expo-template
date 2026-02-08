import { InteractionManager } from "react-native";
import { addBreadcrumb } from "./sentry";

/**
 * Performance monitoring utilities to ensure smooth 60fps experience
 */

/**
 * Measure component render time
 * Warns if render takes longer than 16ms (frame budget for 60fps)
 */
export const measureRender = (componentName: string) => {
  const start = performance.now();

  return () => {
    const duration = performance.now() - start;
    if (duration > 16) {
      console.warn(
        `⚠️ Slow render detected: ${componentName} took ${duration.toFixed(2)}ms`,
      );
      addBreadcrumb({
        category: "performance",
        message: `Slow render: ${componentName}`,
        data: { duration, componentName },
      });
    }
  };
};

/**
 * Defer non-critical work until after interactions/animations complete
 * Use this for operations that don't need to happen immediately
 */
export const deferWork = (callback: () => void): void => {
  InteractionManager.runAfterInteractions(callback);
};

/**
 * Measure async operation performance
 * Automatically logs to Sentry breadcrumbs
 */
export const measureAsync = async <T>(
  name: string,
  operation: () => Promise<T>,
): Promise<T> => {
  const start = performance.now();

  try {
    const result = await operation();
    return result;
  } finally {
    const duration = performance.now() - start;
    addBreadcrumb({
      category: "performance",
      message: `${name} completed`,
      data: { duration, operation: name },
    });
  }
};

/**
 * Throttle function execution
 * Useful for scroll events, resize handlers, etc.
 */
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Debounce function execution
 * Useful for search inputs, form validation, etc.
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

/**
 * Memoize expensive computations
 */
export const memoize = <T extends (...args: any[]) => any>(
  func: T,
): ((...args: Parameters<T>) => ReturnType<T>) => {
  const cache = new Map<string, ReturnType<T>>();

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  };
};
