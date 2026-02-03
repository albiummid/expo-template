import { ScrollView, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import "./sheets-registration"; // Import to register sheets
import {
  Download,
  Edit,
  Settings,
  Share2,
  Star,
  Trash2,
} from "lucide-react-native";
import { TButton, TText, TView } from "../themed";

function SheetsDemo() {
  // Default Action Sheet
  const showDefaultSheet = () => {
    SheetManager.show("default-sheet", {
      payload: {
        title: "Welcome!",
        description:
          "This is a default action sheet with confirmation actions.",
        onConfirm: () => {
          console.log("Confirmed!");
        },
      },
    });
  };

  // Snapable Action Sheet
  const showSnapableSheet = () => {
    SheetManager.show("snapable-sheet");
  };

  // Fullscreen Action Sheet
  const showFullscreenSheet = () => {
    SheetManager.show("fullscreen-sheet");
  };

  // List Selection Sheet
  const showListSelectionSheet = () => {
    SheetManager.show("list-selection-sheet", {
      payload: {
        title: "Choose a Category",
        items: [
          {
            id: "1",
            title: "Technology",
            description: "Tech news and updates",
            icon: <Settings size={20} color="#3B82F6" />,
          },
          {
            id: "2",
            title: "Sports",
            description: "Latest sports scores",
            icon: <Star size={20} color="#10B981" />,
          },
          {
            id: "3",
            title: "Entertainment",
            description: "Movies and TV shows",
            icon: <Share2 size={20} color="#F59E0B" />,
          },
          {
            id: "4",
            title: "Business",
            description: "Financial news",
            icon: <Download size={20} color="#8B5CF6" />,
          },
        ],
        onSelect: (item: any) => {
          console.log("Selected:", item.title);
        },
      },
    });
  };

  // Confirmation Sheets (different variants)
  const showConfirmationDefault = () => {
    SheetManager.show("confirmation-sheet", {
      payload: {
        variant: "default",
        title: "Proceed with action?",
        description: "This will perform the selected action.",
        confirmText: "Yes, Continue",
        cancelText: "No, Go Back",
        onConfirm: () => {
          console.log("Action confirmed");
        },
        onCancel: () => {
          console.log("Action cancelled");
        },
      },
    });
  };

  const showConfirmationDanger = () => {
    SheetManager.show("confirmation-sheet", {
      payload: {
        variant: "danger",
        title: "Delete Item?",
        description:
          "This action cannot be undone. The item will be permanently deleted.",
        confirmText: "Yes, Delete",
        cancelText: "Cancel",
        onConfirm: () => {
          console.log("Item deleted");
        },
      },
    });
  };

  const showConfirmationSuccess = () => {
    SheetManager.show("confirmation-sheet", {
      payload: {
        variant: "success",
        title: "Success!",
        description: "Your changes have been saved successfully.",
        confirmText: "Got it",
        onConfirm: () => {
          console.log("Acknowledged");
        },
      },
    });
  };

  const showConfirmationWarning = () => {
    SheetManager.show("confirmation-sheet", {
      payload: {
        variant: "warning",
        title: "Warning",
        description: "Please review your changes before proceeding.",
        confirmText: "Review",
        cancelText: "Cancel",
        onConfirm: () => {
          console.log("Reviewing");
        },
      },
    });
  };

  // Bottom Menu Sheet
  const showBottomMenu = () => {
    SheetManager.show("bottom-menu-sheet", {
      payload: {
        title: "Actions",
        items: [
          {
            id: "1",
            title: "Edit",
            icon: <Edit size={20} color="#3B82F6" />,
            onPress: () => console.log("Edit pressed"),
          },
          {
            id: "2",
            title: "Share",
            icon: <Share2 size={20} color="#10B981" />,
            onPress: () => console.log("Share pressed"),
          },
          {
            id: "3",
            title: "Download",
            icon: <Download size={20} color="#8B5CF6" />,
            onPress: () => console.log("Download pressed"),
          },
          {
            id: "4",
            title: "Delete",
            icon: <Trash2 size={20} color="#EF4444" />,
            onPress: () => console.log("Delete pressed"),
            destructive: true,
          },
        ],
      },
    });
  };

  // Custom Styled Sheet
  const showCustomStyledSheet = () => {
    SheetManager.show("custom-styled-sheet", {
      payload: {
        title: "Premium Feature",
        description:
          "Unlock premium features with your custom accent color styling.",
        buttonText: "Get Premium",
        onAction: () => {
          console.log("Premium action");
        },
      },
    });
  };

  return (
    <ScrollView className="flex-1">
      <TView variant="default" className="flex-1 p-4">
        <TView variant="card" className="rounded-xl p-6 gap-6">
          {/* Header */}
          <View>
            <TText variant="primary" size="3xl" weight="bold" className="mb-2">
              Action Sheets Demo
            </TText>
            <TText variant="secondary">
              Tap buttons to see different sheet styles
            </TText>
          </View>

          {/* Basic Sheets */}
          <TView variant="elevated" className="p-4 rounded-lg gap-3">
            <TText variant="primary" size="lg" weight="semibold">
              Basic Sheets
            </TText>
            <TButton variant="primary" onPress={showDefaultSheet}>
              Default Sheet
            </TButton>
            <TButton variant="secondary" onPress={showSnapableSheet}>
              Snapable Sheet (30%, 50%, 100%)
            </TButton>
            <TButton variant="outline" onPress={showFullscreenSheet}>
              Fullscreen Sheet
            </TButton>
          </TView>

          {/* Selection Sheets */}
          <TView variant="elevated" className="p-4 rounded-lg gap-3">
            <TText variant="primary" size="lg" weight="semibold">
              Selection Sheets
            </TText>
            <TButton variant="primary" onPress={showListSelectionSheet}>
              List Selection
            </TButton>
            <TButton variant="secondary" onPress={showBottomMenu}>
              Bottom Menu
            </TButton>
          </TView>

          {/* Confirmation Sheets */}
          <TView variant="elevated" className="p-4 rounded-lg gap-3">
            <TText variant="primary" size="lg" weight="semibold">
              Confirmation Sheets
            </TText>
            <TButton variant="primary" onPress={showConfirmationDefault}>
              Default Confirmation
            </TButton>
            <TButton variant="danger" onPress={showConfirmationDanger}>
              Danger Confirmation
            </TButton>
            <TButton
              variant="accent"
              onPress={showConfirmationSuccess}
              className="bg-green-600"
            >
              Success Confirmation
            </TButton>
            <TButton
              variant="accent"
              onPress={showConfirmationWarning}
              className="bg-amber-600"
            >
              Warning Confirmation
            </TButton>
          </TView>

          {/* Custom Styled */}
          <TView variant="elevated" className="p-4 rounded-lg gap-3">
            <TText variant="primary" size="lg" weight="semibold">
              Custom Styled
            </TText>
            <TButton variant="accent" onPress={showCustomStyledSheet}>
              Custom Styled Sheet
            </TButton>
          </TView>

          {/* Usage Info */}
          <TView variant="card" className="p-4 rounded-lg">
            <TText variant="primary" weight="semibold" className="mb-2">
              💡 Features
            </TText>
            <TText variant="secondary" size="sm" className="mb-1">
              • All sheets adapt to your theme (light/dark/ultra-dark)
            </TText>
            <TText variant="secondary" size="sm" className="mb-1">
              • Accent colors are applied automatically
            </TText>
            <TText variant="secondary" size="sm" className="mb-1">
              • Gesture-enabled with smooth animations
            </TText>
            <TText variant="secondary" size="sm">
              • TypeScript support with payload types
            </TText>
          </TView>

          {/* Bottom Spacing */}
          <View className="h-8" />
        </TView>
      </TView>
    </ScrollView>
  );
}
