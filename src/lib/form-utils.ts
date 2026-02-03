import { zodResolver } from "@hookform/resolvers/zod";
import {
	type FieldValues,
	type UseFormProps,
	type UseFormReturn,
	useForm,
} from "react-hook-form";
import { type ZodSchema, z } from "zod";

/**
 * Custom useForm hook with Zod integration
 */
export function useZodForm<TSchema extends z.ZodType<any, any, any>>(
	schema: TSchema,
	options?: Omit<UseFormProps<z.infer<TSchema>>, "resolver">,
): UseFormReturn<z.infer<TSchema>> {
	return useForm<z.infer<TSchema>>({
		...options,
		resolver: zodResolver(schema) as any,
	});
}

// Common validation schemas
export const schemas = {
	email: z.string().email("Invalid email address"),

	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number"),

	phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),

	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters"),

	required: z.string().min(1, "This field is required"),

	url: z.string().url("Invalid URL"),

	positiveNumber: z.number().positive("Must be a positive number"),
};

// Login form schema
export const loginSchema = z.object({
	email: schemas.email,
	password: z.string().min(1, "Password is required"),
});

// Register form schema
export const registerSchema = z
	.object({
		name: schemas.name,
		email: schemas.email,
		password: schemas.password,
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Get error message from form errors
 */
export function getFieldError<T extends FieldValues>(
	form: UseFormReturn<T>,
	fieldName: keyof T,
): string | undefined {
	const error = form.formState.errors[fieldName];
	return error?.message as string | undefined;
}

/**
 * Check if a field has an error
 */
export function hasFieldError<T extends FieldValues>(
	form: UseFormReturn<T>,
	fieldName: keyof T,
): boolean {
	return !!form.formState.errors[fieldName];
}

export { z } from "zod";
