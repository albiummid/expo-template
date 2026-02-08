import { render } from "@testing-library/react-native";
import { Text, View } from "react-native";
import { ThemeProvider } from "@/context/theme-context";

describe("ThemeContext Integration", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  it("renders children with theme provider", () => {
    const { getByText } = render(
      <View>
        <Text>Test Component</Text>
      </View>,
      { wrapper },
    );

    expect(getByText("Test Component")).toBeTruthy();
  });

  it("provides theme context to nested components", () => {
    const TestComponent = () => (
      <View testID="test-view">
        <Text>Nested Content</Text>
      </View>
    );

    const { getByTestId } = render(<TestComponent />, { wrapper });
    expect(getByTestId("test-view")).toBeTruthy();
  });
});
