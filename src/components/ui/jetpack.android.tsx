// import type { ButtonProps as ComposeButtonProps } from "@expo/ui/jetpack-compose";
// import {
//   Button as ComposeButton,
//   Chip as ComposeChip,
//   CircularProgress as ComposeCircularProgress,
//   ContextMenu as ComposeContextMenu,
//   DateTimePicker as ComposeDatePicker,
//   LinearProgress as ComposeLinearProgress,
//   Picker as ComposePicker,
// } from "@expo/ui/jetpack-compose";
// import { Platform } from "react-native";
// import { useTheme } from "@/context/theme-context";
// import { TText, TView } from "./themed";

// // Note: These components only work on Android
// // Use Platform.OS === 'android' checks when using them

// // ============================================================================
// // TComposeButton - Themed Jetpack Compose Button
// // ============================================================================

// interface TComposeButtonProps extends Omit<ComposeButtonProps, "variant"> {
//   variant?: "default" | "filled" | "outlined" | "text" | "elevated" | "accent";
//   children: string;
// }

// export function TComposeButton({
//   variant = "default",
//   children,
//   style,
//   ...props
// }: TComposeButtonProps) {
//   const { themeMode, isUltraDark, accentColor } = useTheme();

//   if (Platform.OS !== "android") {
//     return null;
//   }

//   const isDark = themeMode === "dark" || isUltraDark;

//   // Map variant to Compose button variant
//   const composeVariant = variant === "accent" ? "filled" : (variant as any);

//   const elementColors =
//     variant === "accent"
//       ? {
//           containerColor: accentColor.color,
//           contentColor: "#FFFFFF",
//         }
//       : variant === "filled"
//         ? {
//             containerColor: isDark ? "#FFFFFF" : "#000000",
//             contentColor: isDark ? "#000000" : "#FFFFFF",
//           }
//         : undefined;

//   return (
//     <ComposeButton
//       variant={composeVariant}
//       elementColors={elementColors}
//       style={style}
//       {...props}
//     >
//       {children}
//     </ComposeButton>
//   );
// }

// // ============================================================================
// // TComposeChip - Themed Jetpack Compose Chip
// // ============================================================================

// interface TComposeChipProps {
//   variant: "assist" | "filter" | "input" | "suggestion";
//   label: string;
//   selected?: boolean;
//   leadingIcon?: string;
//   trailingIcon?: string;
//   onPress?: () => void;
//   onClose?: () => void;
// }

// export function TComposeChip({
//   variant,
//   label,
//   selected = false,
//   leadingIcon,
//   trailingIcon,
//   onPress,
//   onClose,
// }: TComposeChipProps) {
//   const { accentColor } = useTheme();

//   if (Platform.OS !== "android") {
//     return null;
//   }

//   return (
//     <ComposeChip
//       variant={variant}
//       label={label}
//       selected={selected}
//       leadingIcon={leadingIcon}
//       trailingIcon={trailingIcon}
//       onPress={onPress}
//       onClose={onClose}
//       color={selected ? accentColor.color : undefined}
//     />
//   );
// }

// // ============================================================================
// // TComposeProgress - Themed Progress Indicators
// // ============================================================================

// interface TComposeCircularProgressProps {
//   progress?: number;
//   size?: number;
//   indeterminate?: boolean;
// }

// export function TComposeCircularProgress({
//   progress,
//   size = 48,
//   indeterminate = false,
// }: TComposeCircularProgressProps) {
//   const { accentColor } = useTheme();

//   if (Platform.OS !== "android") {
//     return null;
//   }

//   return (
//     <ComposeCircularProgress
//       progress={indeterminate ? undefined : progress}
//       style={{ width: size, height: size }}
//       color={accentColor.color}
//     />
//   );
// }

// interface TComposeLinearProgressProps {
//   progress?: number;
//   width?: number;
//   indeterminate?: boolean;
// }

// export function TComposeLinearProgress({
//   progress,
//   width = 300,
//   indeterminate = false,
// }: TComposeLinearProgressProps) {
//   const { accentColor } = useTheme();

//   if (Platform.OS !== "android") {
//     return null;
//   }

//   return (
//     <ComposeLinearProgress
//       progress={indeterminate ? undefined : progress}
//       style={{ width }}
//       color={accentColor.color}
//     />
//   );
// }

// // ============================================================================
// // TComposeDatePicker - Themed Jetpack Compose DateTimePicker
// // ============================================================================

// interface TComposeDatePickerProps {
//   onDateSelected: (date: string) => void;
//   initialDate?: string;
//   displayedComponents?: "date" | "hourAndMinute";
//   variant?: "picker" | "input";
// }

// export function TComposeDatePicker({
//   onDateSelected,
//   initialDate = new Date().toISOString(),
//   displayedComponents = "date",
//   variant = "picker",
// }: TComposeDatePickerProps) {
//   const { accentColor } = useTheme();

//   if (Platform.OS !== "android") {
//     return null;
//   }

//   return (
//     <ComposeDatePicker
//       onDateSelected={onDateSelected}
//       initialDate={initialDate}
//       displayedComponents={displayedComponents}
//       variant={variant}
//       color={accentColor.color}
//     />
//   );
// }

// // ============================================================================
// // TComposePicker - Themed Jetpack Compose Picker
// // ============================================================================

// interface TComposePickerProps {
//   options: string[];
//   selectedIndex: number;
//   onOptionSelected: (event: { nativeEvent: { index: number } }) => void;
//   label?: string;
//   variant?: "segmented" | "radio";
// }

// export function TComposePicker({
//   options,
//   selectedIndex,
//   onOptionSelected,
//   label,
//   variant = "segmented",
// }: TComposePickerProps) {
//   const { accentColor } = useTheme();

//   if (Platform.OS !== "android") {
//     return null;
//   }

//   return (
//     <ComposePicker
//       options={options}
//       selectedIndex={selectedIndex}
//       onOptionSelected={onOptionSelected}
//       variant={variant}
//       color={accentColor.color}
//     />
//   );
// }

// // ============================================================================
// // TComposeContextMenu - Themed Jetpack Compose Context Menu
// // ============================================================================

// interface TComposeContextMenuProps {
//   trigger: React.ReactNode;
//   items: SubmenuElement | SubmenuElement[];
//   style?: any;
// }

// export function TComposeContextMenu({
//   trigger,
//   items,
//   style,
// }: TComposeContextMenuProps) {
//   if (Platform.OS !== "android") {
//     return null;
//   }

//   return (
//     <ComposeContextMenu style={style}>
//       <ComposeContextMenu.Items>{items}</ComposeContextMenu.Items>
//       <ComposeContextMenu.Trigger>{trigger}</ComposeContextMenu.Trigger>
//     </ComposeContextMenu>
//   );
// }

// // ============================================================================
// // Android Card Component Example
// // ============================================================================

// interface TComposeCardProps {
//   title: string;
//   description?: string;
//   action?: {
//     label: string;
//     onPress: () => void;
//   };
// }

// export function TComposeCard({
//   title,
//   description,
//   action,
// }: TComposeCardProps) {
//   const { themeMode, isUltraDark, accentColor } = useTheme();

//   if (Platform.OS !== "android") {
//     return (
//       <TView variant="card" className="p-4 rounded-lg">
//         <TText variant="primary" weight="semibold" className="mb-1">
//           {title}
//         </TText>
//         {description && (
//           <TText variant="secondary" size="sm" className="mb-3">
//             {description}
//           </TText>
//         )}
//         {action && (
//           <TView className="flex-row justify-end">
//             <TText
//               variant="accent"
//               weight="semibold"
//               className="uppercase"
//               onPress={action.onPress}
//             >
//               {action.label}
//             </TText>
//           </TView>
//         )}
//       </TView>
//     );
//   }

//   const isDark = themeMode === "dark" || isUltraDark;

//   return (
//     <TView
//       variant="elevated"
//       className="p-4 rounded-lg"
//       style={{
//         backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
//       }}
//     >
//       <TText variant="primary" weight="semibold" size="lg" className="mb-1">
//         {title}
//       </TText>
//       {description && (
//         <TText variant="secondary" size="sm" className="mb-3">
//           {description}
//         </TText>
//       )}
//       {action && (
//         <TView className="flex-row justify-end mt-2">
//           <ComposeButton
//             variant="default"
//             onPress={action.onPress}
//             elementColors={{
//               contentColor: accentColor.color,
//             }}
//           >
//             {action.label}
//           </ComposeButton>
//         </TView>
//       )}
//     </TView>
//   );
// }

// // ============================================================================
// // Android Filter Chips Example
// // ============================================================================

// interface TComposeFilterChipsProps {
//   options: Array<{ id: string; label: string; icon?: string }>;
//   selectedIds: string[];
//   onSelectionChange: (selectedIds: string[]) => void;
// }

// export function TComposeFilterChips({
//   options,
//   selectedIds,
//   onSelectionChange,
// }: TComposeFilterChipsProps) {
//   if (Platform.OS !== "android") {
//     return null;
//   }

//   const handleChipPress = (id: string) => {
//     const newSelection = selectedIds.includes(id)
//       ? selectedIds.filter((selectedId) => selectedId !== id)
//       : [...selectedIds, id];
//     onSelectionChange(newSelection);
//   };

//   return (
//     <TView className="flex-row flex-wrap gap-2">
//       {options.map((option) => (
//         <TComposeChip
//           key={option.id}
//           variant="filter"
//           label={option.label}
//           selected={selectedIds.includes(option.id)}
//           leadingIcon={option.icon}
//           onPress={() => handleChipPress(option.id)}
//         />
//       ))}
//     </TView>
//   );
// }

// // ============================================================================
// // Android Bottom Actions Example
// // ============================================================================

// interface TComposeBottomActionsProps {
//   primaryAction?: {
//     label: string;
//     onPress: () => void;
//   };
//   secondaryAction?: {
//     label: string;
//     onPress: () => void;
//   };
// }

// export function TComposeBottomActions({
//   primaryAction,
//   secondaryAction,
// }: TComposeBottomActionsProps) {
//   if (Platform.OS !== "android") {
//     return (
//       <TView className="flex-row gap-2 p-4 border-t border-gray-700">
//         {secondaryAction && (
//           <TView className="flex-1">
//             <TText
//               variant="primary"
//               weight="semibold"
//               className="text-center p-3"
//               onPress={secondaryAction.onPress}
//             >
//               {secondaryAction.label}
//             </TText>
//           </TView>
//         )}
//         {primaryAction && (
//           <TView className="flex-1">
//             <TText
//               variant="accent"
//               weight="semibold"
//               className="text-center p-3"
//               onPress={primaryAction.onPress}
//             >
//               {primaryAction.label}
//             </TText>
//           </TView>
//         )}
//       </TView>
//     );
//   }

//   return (
//     <TView className="flex-row gap-2 p-4">
//       {secondaryAction && (
//         <TView className="flex-1">
//           <TComposeButton variant="outlined" onPress={secondaryAction.onPress}>
//             {secondaryAction.label}
//           </TComposeButton>
//         </TView>
//       )}
//       {primaryAction && (
//         <TView className="flex-1">
//           <TComposeButton variant="accent" onPress={primaryAction.onPress}>
//             {primaryAction.label}
//           </TComposeButton>
//         </TView>
//       )}
//     </TView>
//   );
// }

// // ============================================================================
// // Android Loading States
// // ============================================================================

// interface TComposeLoadingProps {
//   type?: "circular" | "linear";
//   size?: number;
//   width?: number;
//   message?: string;
// }

// export function TComposeLoading({
//   type = "circular",
//   size = 48,
//   width = 300,
//   message,
// }: TComposeLoadingProps) {
//   if (Platform.OS !== "android") {
//     return null;
//   }

//   return (
//     <TView className="items-center justify-center gap-3 p-6">
//       {type === "circular" ? (
//         <TComposeCircularProgress size={size} indeterminate />
//       ) : (
//         <TComposeLinearProgress width={width} indeterminate />
//       )}
//       {message && (
//         <TText variant="secondary" size="sm">
//           {message}
//         </TText>
//       )}
//     </TView>
//   );
// }
