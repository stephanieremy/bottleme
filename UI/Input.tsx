import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

function Input({ label, isValid = true, errorText, inputProps }) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, !isValid && styles.errorLabel]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          inputProps?.multiline && styles.multiline,
          !isValid && styles.errorInput,
        ]}
        placeholderTextColor={GlobalStyles.colors.inkLight}
        {...inputProps}
      />
      {!isValid && errorText && (
        <Text style={styles.errorText}>{errorText}</Text>
      )}
    </View>
  );
}

export default Input;

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
  input: {
    backgroundColor: GlobalStyles.colors.bg,
    borderWidth: 1.5,
    borderColor: GlobalStyles.colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontFamily: "DMSans",
    fontSize: 15,
    color: GlobalStyles.colors.ink,
  },
  multiline: {
    textAlignVertical: "top",
    minHeight: 90,
    fontFamily: "CormorantGaramond",
    fontStyle: "italic",
    fontSize: 16,
    lineHeight: 24,
  },
  errorInput: {
    borderColor: GlobalStyles.colors.error,
    backgroundColor: GlobalStyles.colors.errorMuted,
  },
  errorLabel: {
    color: GlobalStyles.colors.error,
  },
  errorText: {
    fontFamily: "DMSans",
    fontSize: 12,
    color: GlobalStyles.colors.error,
    marginTop: 4,
  },
});
