import { Pressable, Text } from "react-native";

function Button({ type = "primary", size = "md", children }) {
  const typeStyles = {
    primary: { backgroundColor: "#C4522A" },
    secondary: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: "#DDD4C0",
    },
    ghost: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: "#C4522A",
    },
    sage: { backgroundColor: "#3D7A58" },
    danger: { backgroundColor: "#B83020" },
  };

  const sizeStyles = {
    sm: { paddingVertical: 8, paddingHorizontal: 18 },
    md: { paddingVertical: 12, paddingHorizontal: 28 },
    lg: { paddingVertical: 16, paddingHorizontal: 40 },
  };

  return (
    <Pressable
      style={({ pressed }) => [
        { borderRadius: 9999 },
        typeStyles[type],
        sizeStyles[size],
        pressed && { opacity: 0.8 },
      ]}
    >
      <Text>{children}</Text>
    </Pressable>
  );
}

export default Button;
