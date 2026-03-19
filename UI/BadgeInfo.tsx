import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

const TYPE_STYLES = {
  region: {
    backgroundColor: GlobalStyles.colors.indigoMuted,
    color: GlobalStyles.colors.indigo,
  },
  quantity: {
    backgroundColor: GlobalStyles.colors.sageMuted,
    color: GlobalStyles.colors.sage,
  },
  price: {
    backgroundColor: GlobalStyles.colors.goldMuted,
    color: GlobalStyles.colors.gold,
  },
  outOfStock: {
    backgroundColor: GlobalStyles.colors.errorMuted,
    color: GlobalStyles.colors.error,
  },
};

export function BadgeInfo({ type, children }) {
  const style = TYPE_STYLES[type];

  if (!style) return null;

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
