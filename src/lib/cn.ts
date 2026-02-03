import { twMerge } from "tailwind-merge";

/**
 * Utility function for merging Tailwind CSS classes
 * Handles conflicts intelligently (e.g., "p-4 p-2" becomes "p-2")
 *
 * @example
 * cn("p-4 text-red-500", condition && "bg-blue-500", "p-2")
 * // Returns: "text-red-500 bg-blue-500 p-2"
 */
export function cn(
	...inputs: (string | undefined | null | false)[]
): string {
	return twMerge(inputs.filter(Boolean).join(" "));
}
