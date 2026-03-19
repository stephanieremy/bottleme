import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { GlobalStyles } from "../constants/styles";

function Select({ label, value, options, onSelect, placeholder }) {
  const [open, setOpen] = useState(false);

  // Gère les deux cas : objets { label, value } ou simples valeurs
  const getLabel = (item) => (item?.label ? item.label : item?.toString());
  const getValue = (item) => (item?.value ? item.value : item);

  // Affiche le label correspondant à la valeur sélectionnée
  const displayValue = options
    .map(getLabel)
    .find((_, i) => getValue(options[i]) === value);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Pressable style={styles.field} onPress={() => setOpen(true)}>
        <Text style={displayValue ? styles.value : styles.placeholder}>
          {displayValue ?? placeholder}
        </Text>
        <Text style={styles.chevron}>∨</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(item) => getValue(item).toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    onSelect(getValue(item));
                    setOpen(false);
                  }}
                >
                  <Text style={styles.optionText}>{getLabel(item)}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default Select;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: "DMSans",
    fontSize: 11,
    fontWeight: "500",
    color: GlobalStyles.colors.inkLight,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  field: {
    backgroundColor: GlobalStyles.colors.bg,
    borderWidth: 1.5,
    borderColor: GlobalStyles.colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  value: {
    fontFamily: "DMSans",
    fontSize: 15,
    color: GlobalStyles.colors.ink,
  },
  placeholder: {
    fontFamily: "DMSans",
    fontSize: 15,
    color: GlobalStyles.colors.inkLight,
  },
  chevron: {
    fontSize: 14,
    color: GlobalStyles.colors.inkLight,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(30,26,20,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  dropdown: {
    backgroundColor: GlobalStyles.colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.border,
    maxHeight: 300,
    overflow: "hidden",
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.bgAlt,
  },
  optionText: {
    fontFamily: "DMSans",
    fontSize: 15,
    color: GlobalStyles.colors.ink,
  },
});
