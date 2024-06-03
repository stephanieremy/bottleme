import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

function Input({ label, style, isValid, errorText, inputProps }) {
  let inputStyles = [styles.input];
  if (inputProps && inputProps.multiline) {
    inputStyles.push(styles.multiline);
  }
  if (!isValid) inputStyles.push(styles.errorInput);
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, !isValid && styles.errorLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...inputProps}></TextInput>
      {!isValid && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 16,
    color: GlobalStyles.colors.primary700,
  },
  multiline: {
    textAlignVertical: "top",
    minHeight: 100,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
  },
  errorLabel: {
    color: GlobalStyles.colors.error500,
  },
  errorInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
