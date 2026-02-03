import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time data is considered fresh (no refetch)
      staleTime: 1000 * 60 * 5, // 5 minutes

      // Time data stays in cache after becoming unused
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)

      // Retry configuration
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch settings
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// Invalidate all queries (useful for logout)
export const invalidateAllQueries = () => {
  queryClient.invalidateQueries();
};

// Clear all cached data (useful for logout)
export const clearQueryCache = () => {
  queryClient.clear();
};

// Prefetch query helper
export const prefetchQuery = async <T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
) => {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
  });
};
