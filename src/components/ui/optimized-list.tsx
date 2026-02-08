import { LegendList, type LegendListRenderItemProps } from "@legendapp/list";
import { memo, useCallback } from "react";

interface OptimizedListProps<T> {
  data: T[];
  renderItem: (props: LegendListRenderItemProps<T>) => React.ReactElement;
  keyExtractor: (item: T) => string;
  estimatedItemSize?: number;
  ListEmptyComponent?: React.ReactElement | null;
  ListHeaderComponent?: React.ReactElement | null;
  ListFooterComponent?: React.ReactElement | null;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  refreshing?: boolean;
  onRefresh?: () => void;
}

/**
 * Optimized list component using @legendapp/list for virtualization
 * Provides smooth scrolling performance even with large datasets
 */
function OptimizedListComponent<T>({
  data,
  renderItem,
  keyExtractor,
  estimatedItemSize = 80,
  ListEmptyComponent,
  ListHeaderComponent,
  ListFooterComponent,
  onEndReached,
  onEndReachedThreshold = 0.5,
  refreshing,
  onRefresh,
}: OptimizedListProps<T>) {
  const renderCallback = useCallback(
    (props: LegendListRenderItemProps<T>) => renderItem(props),
    [renderItem],
  );

  return (
    <LegendList
      data={data}
      renderItem={renderCallback}
      keyExtractor={keyExtractor}
      estimatedItemSize={estimatedItemSize}
      recycleItems
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

// Export with generic type
export const OptimizedList = memo(
  OptimizedListComponent,
) as typeof OptimizedListComponent;
