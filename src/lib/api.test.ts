import MockAdapter from "axios-mock-adapter";
import { api, apiDelete, apiGet, apiPost, apiPut } from "./api";
import { storage } from "./storage";

describe("API Client", () => {
  const mock = new MockAdapter(api);

  beforeEach(() => {
    mock.reset();
    storage.clearAll();
  });

  afterEach(() => {
    mock.restore();
  });

  describe("apiGet", () => {
    it("should make GET request successfully", async () => {
      const mockData = { id: 1, name: "Test" };
      mock.onGet("/users/1").reply(200, mockData);

      const result = await apiGet("/users/1");
      expect(result).toEqual(mockData);
    });

    it("should handle 404 errors", async () => {
      mock.onGet("/users/999").reply(404, { message: "Not found" });

      await expect(apiGet("/users/999")).rejects.toThrow();
    });
  });

  describe("apiPost", () => {
    it("should make POST request with data", async () => {
      const requestData = { name: "New User" };
      const responseData = { id: 1, ...requestData };
      mock.onPost("/users", requestData).reply(201, responseData);

      const result = await apiPost("/users", requestData);
      expect(result).toEqual(responseData);
    });
  });

  describe("Token handling", () => {
    it("should include auth token in requests", async () => {
      const token = "test-token";
      storage.set("accessToken", token);

      mock.onGet("/protected").reply((config) => {
        expect(config.headers?.Authorization).toBe(`Bearer ${token}`);
        return [200, { success: true }] as const;
      });

      await apiGet("/protected");
    });

    it("should handle 401 and attempt token refresh", async () => {
      const refreshToken = "refresh-token";
      storage.set("refreshToken", refreshToken);

      mock.onGet("/protected").replyOnce(401);
      mock.onPost("/auth/refresh").reply(200, { accessToken: "new-token" });
      mock.onGet("/protected").replyOnce(200, { data: "success" });

      const result = await apiGet("/protected");
      expect(result).toEqual({ data: "success" });
    });
  });

  describe("apiPut", () => {
    it("should make PUT request with data", async () => {
      const requestData = { name: "Updated User" };
      const responseData = { id: 1, ...requestData };
      mock.onPut("/users/1", requestData).reply(200, responseData);

      const result = await apiPut("/users/1", requestData);
      expect(result).toEqual(responseData);
    });
  });

  describe("apiDelete", () => {
    it("should make DELETE request successfully", async () => {
      mock.onDelete("/users/1").reply(204);

      const result = await apiDelete("/users/1");
      expect(result).toBeUndefined();
    });
  });
});
