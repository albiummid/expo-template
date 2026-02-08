import { cn } from "./cn";

describe("cn utility", () => {
  it("should merge tailwind classes correctly", () => {
    expect(cn("px-4 py-2", "px-6")).toBe("py-2 px-6");
  });

  it("should handle conditional classes", () => {
    expect(cn("px-4", true && "py-2", false && "m-2")).toBe("px-4 py-2");
  });

  it("should handle undefined and null values", () => {
    expect(cn("px-4", undefined, null, "py-2")).toBe("px-4 py-2");
  });

  it("should handle empty strings", () => {
    expect(cn("px-4", "", "py-2")).toBe("px-4 py-2");
  });

  it("should merge complex class combinations", () => {
    expect(cn("flex items-center", "justify-between", "flex-col")).toBe(
      "items-center justify-between flex-col",
    );
  });
});
