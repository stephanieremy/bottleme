import { View, Text, StyleSheet } from "react-native";

const TYPE_STYLES = {
  RED: { backgroundColor: "#E8C4AD", color: "#8A2A10" },
  WHITE: { backgroundColor: "#EDE0B0", color: "#7A5A10" },
  PINK: { backgroundColor: "#F0D0D8", color: "#8A2848" },
  MUTED: { backgroundColor: "#F0D8A8", color: "#7A4A08" },
  CHAMPAGNE: { backgroundColor: "#D0D6F5", color: "#3D4F9E" },
  SPARKLING: { backgroundColor: "#C4E0D0", color: "#3D7A58" },
};

export function WineTypeBadge({ type }) {
  const style = TYPE_STYLES[type];

  if (!style) return null;

  return (
    <View style={[styles.badge, { backgroundColor: style.backgroundColor }]}>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[styles.text, { color: style.color }]}
      >
        {type}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 9999,
    maxWidth: 70,
  },
  text: {
    fontFamily: "DMSansMedium",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
