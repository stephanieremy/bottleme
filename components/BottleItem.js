import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { BottlePages } from "../constants/bottlePages";

function BottleItem({ id, designation, vintage, type }) {
  const navigation = useNavigation();

  function handlePress() {
    navigation.navigate(BottlePages.ManageBottle, {
      id: id,
    });
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <View>
          <Text style={[styles.text, styles.descriptionContainer]}>
            a{designation}
          </Text>
          <Text style={styles.text}>{type}</Text>
        </View>
        <View style={styles.vintageContainer}>
          <Text style={styles.vintageText}>{vintage}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default BottleItem;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowRadius: 4,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 4,
  },
  text: {
    color: GlobalStyles.colors.primary100,
  },
  descriptionContainer: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  vintageContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    borderRadius: 4,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 60,
  },
  vintageText: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.7,
  },
});
