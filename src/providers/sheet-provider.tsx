import { SheetProvider as ActionsSheetProvider } from "react-native-actions-sheet";
import type { ReactNode } from "react";

interface SheetProviderProps {
	children: ReactNode;
}

/**
 * Provider wrapper for react-native-actions-sheet
 * Wrap your app with this provider to enable action sheets
 */
export function SheetProvider({ children }: SheetProviderProps) {
	return <ActionsSheetProvider>{children}</ActionsSheetProvider>;
}
