import { useEffect, useRef } from "react";
import { measureRender } from "@/lib/performance";

/**
 * Hook to monitor component render performance
 * Logs warnings for slow renders (>16ms)
 */
export const usePerformanceMonitor = (componentName: string): void => {
  const endMeasure = useRef<(() => void) | null>(null);

  useEffect(() => {
    endMeasure.current = measureRender(componentName);
    return () => {
      endMeasure.current?.();
    };
  }, [componentName]);
};

/**
 * Hook to track how many times a component renders
 * Useful for debugging unnecessary re-renders
 */
export const useRenderCount = (componentName: string): number => {
  const renderCount = useRef(0);

  renderCount.current++;

  if (__DEV__ && renderCount.current > 1) {
    console.log(`${componentName} rendered ${renderCount.current} times`);
  }

  return renderCount.current;
};

/**
 * Hook to measure effect execution time
 */
export const usePerformanceEffect = (
  effectName: string,
  effect: React.EffectCallback,
  deps: React.DependencyList,
): void => {
  useEffect(() => {
    const start = performance.now();

    const cleanup = effect();

    const duration = performance.now() - start;
    if (duration > 16) {
      console.warn(
        `⚠️ Slow effect: ${effectName} took ${duration.toFixed(2)}ms`,
      );
    }

    return cleanup;
    // biome-ignore lint/correctness/useExhaustiveDependencies: deps is passed as parameter
  }, deps);
};
