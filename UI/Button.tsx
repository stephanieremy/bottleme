import { Pressable, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

const TYPE_STYLES = {
  primary: { backgroundColor: GlobalStyles.colors.terracotta },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.border,
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.terracotta,
  },
  sage: { backgroundColor: GlobalStyles.colors.sage },
  danger: { backgroundColor: GlobalStyles.colors.error },
};

const SIZE_STYLES = {
  sm: { paddingVertical: 8, paddingHorizontal: 18 },
  md: { paddingVertical: 12, paddingHorizontal: 28 },
  lg: { paddingVertical: 16, paddingHorizontal: 40 },
};

function Button({ type = "primary", size = "md", children, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        TYPE_STYLES[type],
        SIZE_STYLES[size],
        pressed && { opacity: 0.8 },
      ]}
    >
      <Text>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 9999,
  },
});

export default Button;
