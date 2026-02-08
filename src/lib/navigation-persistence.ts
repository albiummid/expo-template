import { storage } from "./storage";

const NAVIGATION_STATE_KEY = "@navigation_state";

/**
 * Navigation state persistence utilities
 * Used to save and restore navigation state across app restarts
 */
export const navigationPersistence = {
  /**
   * Save the current navigation state
   * @param state - The navigation state object
   */
  saveState: (state: any): void => {
    try {
      storage.set(NAVIGATION_STATE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save navigation state", e);
    }
  },

  /**
   * Load the saved navigation state
   * @returns The navigation state or null if not found
   */
  loadState: (): any | null => {
    try {
      const state = storage.getString(NAVIGATION_STATE_KEY);
      return state ? JSON.parse(state) : null;
    } catch (e) {
      console.error("Failed to load navigation state", e);
      return null;
    }
  },

  /**
   * Clear the saved navigation state
   */
  clearState: (): void => {
    storage.remove(NAVIGATION_STATE_KEY);
  },

  /**
   * Check if there's a saved navigation state
   * @returns boolean
   */
  hasState: (): boolean => {
    return storage.contains(NAVIGATION_STATE_KEY);
  },
};
