import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "@/lib/storage";

// App State Slice
interface AppState {
	theme: "light" | "dark" | "system";
	accentColor: string;
	isOnboarded: boolean;
}

// Auth State Slice
interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	user: {
		id: string;
		email: string;
		name: string;
	} | null;
	isAuthenticated: boolean;
}

// Actions
interface AppActions {
	setTheme: (theme: AppState["theme"]) => void;
	setAccentColor: (color: string) => void;
	setOnboarded: (value: boolean) => void;
}

interface AuthActions {
	setTokens: (accessToken: string, refreshToken: string) => void;
	setUser: (user: AuthState["user"]) => void;
	logout: () => void;
}

// Combined Store Type
type StoreState = AppState & AuthState & AppActions & AuthActions;

// Initial States
const initialAppState: AppState = {
	theme: "system",
	accentColor: "cyan",
	isOnboarded: false,
};

const initialAuthState: AuthState = {
	accessToken: null,
	refreshToken: null,
	user: null,
	isAuthenticated: false,
};

// Create Store with Persistence
export const useStore = create<StoreState>()(
	persist(
		(set) => ({
			// App State
			...initialAppState,
			setTheme: (theme) => set({ theme }),
			setAccentColor: (accentColor) => set({ accentColor }),
			setOnboarded: (isOnboarded) => set({ isOnboarded }),

			// Auth State
			...initialAuthState,
			setTokens: (accessToken, refreshToken) =>
				set({
					accessToken,
					refreshToken,
					isAuthenticated: true,
				}),
			setUser: (user) => set({ user }),
			logout: () =>
				set({
					accessToken: null,
					refreshToken: null,
					user: null,
					isAuthenticated: false,
				}),
		}),
		{
			name: "app-store",
			storage: createJSONStorage(() => zustandStorage),
			partialize: (state) => ({
				// Only persist these fields
				theme: state.theme,
				accentColor: state.accentColor,
				isOnboarded: state.isOnboarded,
				accessToken: state.accessToken,
				refreshToken: state.refreshToken,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
);

// Selector hooks for better performance
export const useTheme = () => useStore((state) => state.theme);
export const useAccentColor = () => useStore((state) => state.accentColor);
export const useIsOnboarded = () => useStore((state) => state.isOnboarded);
export const useAuth = () =>
	useStore((state) => ({
		accessToken: state.accessToken,
		user: state.user,
		isAuthenticated: state.isAuthenticated,
	}));
