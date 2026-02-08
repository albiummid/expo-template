import { useStore } from "../store";

describe("Zustand Store", () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useStore.setState({
      theme: "system",
      accentColor: "cyan",
      isOnboarded: false,
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
  });

  describe("App State", () => {
    it("should have initial state", () => {
      const state = useStore.getState();
      expect(state.theme).toBe("system");
      expect(state.accentColor).toBe("cyan");
      expect(state.isOnboarded).toBe(false);
    });

    it("should update theme", () => {
      useStore.getState().setTheme("dark");
      expect(useStore.getState().theme).toBe("dark");
    });

    it("should update accent color", () => {
      useStore.getState().setAccentColor("red");
      expect(useStore.getState().accentColor).toBe("red");
    });

    it("should update onboarded status", () => {
      useStore.getState().setOnboarded(true);
      expect(useStore.getState().isOnboarded).toBe(true);
    });
  });

  describe("Auth State", () => {
    it("should not be authenticated initially", () => {
      expect(useStore.getState().isAuthenticated).toBe(false);
    });

    it("should set tokens and authenticate", () => {
      useStore.getState().setTokens("access-token", "refresh-token");

      const state = useStore.getState();
      expect(state.accessToken).toBe("access-token");
      expect(state.refreshToken).toBe("refresh-token");
      expect(state.isAuthenticated).toBe(true);
    });

    it("should set user information", () => {
      const user = {
        id: "1",
        email: "test@example.com",
        name: "Test User",
      };

      useStore.getState().setUser(user);
      expect(useStore.getState().user).toEqual(user);
    });

    it("should logout and clear auth data", () => {
      // First set auth data
      useStore.getState().setTokens("access-token", "refresh-token");
      useStore
        .getState()
        .setUser({ id: "1", email: "test@example.com", name: "Test" });

      // Then logout
      useStore.getState().logout();

      const state = useStore.getState();
      expect(state.accessToken).toBeNull();
      expect(state.refreshToken).toBeNull();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });
});
