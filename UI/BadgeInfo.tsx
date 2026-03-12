import { View, Text, StyleSheet } from "react-native";

export function BadgeInfo({ type, children }) {
  const typeStyles = {
    region: { backgroundColor: "#D0D6F5", color: "#3D4F9E" },
    quantity: { backgroundColor: "#C4E0D0", color: "#3D7A58" },
    price: { backgroundColor: "#EDE0B0", color: "#7A5A10" },
    outOfStock: { backgroundColor: "#F5DDD8", color: "#B83020" },
  };

  const style = typeStyles[type];

  return (
    <View style={[styles.badge, { backgroundColor: style.backgroundColor }]}>
      <Text style={[styles.text, { color: style.color }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 9999,
  },
  text: {
    fontFamily: "DMSansMedium",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
