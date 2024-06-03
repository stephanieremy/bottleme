import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import BottlesList from "./BottleList";

function BottlesOutput({ bottles, period, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (bottles?.length > 0) {
    content = <BottlesList bottles={bottles} />;
  }
  return <View style={styles.container}>{content}</View>;
}

export default BottlesOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
