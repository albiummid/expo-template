import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import {
  BottomMenuSheet,
  ConfirmationSheet,
  CustomStyledSheet,
  DefaultActionSheet,
  FullscreenActionSheet,
  ListSelectionSheet,
  SnapableActionSheet,
} from "./themed-sheet";

// Register all sheets
registerSheet("default-sheet", DefaultActionSheet);
registerSheet("snapable-sheet", SnapableActionSheet);
registerSheet("fullscreen-sheet", FullscreenActionSheet);
registerSheet("list-selection-sheet", ListSelectionSheet);
registerSheet("confirmation-sheet", ConfirmationSheet);
registerSheet("bottom-menu-sheet", BottomMenuSheet);
registerSheet("custom-styled-sheet", CustomStyledSheet);

// Extend sheet configuration for TypeScript
declare module "react-native-actions-sheet" {
  interface Sheets {
    "default-sheet": SheetDefinition<{
      payload: {
        title?: string;
        description?: string;
        onConfirm?: () => void;
      };
    }>;
    "snapable-sheet": SheetDefinition;
    "fullscreen-sheet": SheetDefinition;
    "list-selection-sheet": SheetDefinition<{
      payload: {
        title?: string;
        items?: Array<{
          id: string;
          title: string;
          description?: string;
          icon?: React.ReactNode;
        }>;
        onSelect?: (item: any) => void;
      };
    }>;
    "confirmation-sheet": SheetDefinition<{
      payload: {
        title?: string;
        description?: string;
        variant?: "default" | "danger" | "success" | "warning";
        confirmText?: string;
        cancelText?: string;
        onConfirm?: () => void;
        onCancel?: () => void;
      };
    }>;
    "bottom-menu-sheet": SheetDefinition<{
      payload: {
        title?: string;
        items?: Array<{
          id: string;
          title: string;
          icon?: React.ReactNode;
          onPress?: () => void;
          destructive?: boolean;
        }>;
      };
    }>;
    "custom-styled-sheet": SheetDefinition<{
      payload: {
        title?: string;
        description?: string;
        buttonText?: string;
        onAction?: () => void;
      };
    }>;
  }
}

export {};
