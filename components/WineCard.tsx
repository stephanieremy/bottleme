import { Pressable, View, Text, StyleSheet } from "react-native";
import { WineTypeBadge } from "../UI/WineTypeBadge";
import { BadgeInfo } from "../UI/BadgeInfo";
import { GlobalStyles } from "../constants/styles";

export function WineCard({ bottle }) {
  return (
    <Pressable style={styles.card}>
      <View style={styles.leftColumn}>
        <Text style={styles.vintage}>{bottle?.vintage}</Text>
        <WineTypeBadge type={bottle?.type} />
      </View>
      <View style={styles.centerColumn}>
        <Text style={styles.name}>{bottle?.name}</Text>
        <Text style={styles.designation}>{bottle?.designation}</Text>
        <View style={styles.badges}>
          <BadgeInfo type="region">{bottle?.region}</BadgeInfo>
          <BadgeInfo type="quantity">×{bottle?.quantity} btl.</BadgeInfo>
          {bottle.price && <BadgeInfo type="price">{bottle?.price}€</BadgeInfo>}
        </View>
      </View>
      {bottle.score && (
        <View style={styles.scoreColumn}>
          <Text style={styles.score}>{bottle.score}</Text>
          <Text style={styles.scorePts}>PTS</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalStyles.colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  leftColumn: {
    alignItems: "flex-start",
    gap: 5,
    width: 70,
    justifyContent: "flex-start",
  },
  centerColumn: {
    flex: 1,
    gap: 12,
    justifyContent: "flex-start",
  },
  vintage: {
    fontFamily: "PlayfairDisplayBlack",
    fontSize: 22,
    color: GlobalStyles.colors.gold,
  },
  name: {
    fontFamily: "PlayfairDisplay",
    fontSize: 15,
    color: GlobalStyles.colors.ink,
    flexShrink: 1,
    flexWrap: "wrap",
    paddingTop: 6,
  },
  designation: {
    fontFamily: "CormorantGaramond",
    fontStyle: "italic",
    fontSize: 12,
    color: GlobalStyles.colors.inkMid,
  },
  badges: {
    flexDirection: "row",
    gap: 7,
    flexWrap: "wrap",
  },
  score: {
    fontFamily: "PlayfairDisplayBlack",
    fontSize: 26,
    color: GlobalStyles.colors.gold,
  },
  scorePts: {
    fontFamily: "DMSans",
    fontSize: 10,
    color: GlobalStyles.colors.inkLight,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  scoreColumn: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
