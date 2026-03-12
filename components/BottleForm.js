import { StyleSheet, Text, View } from "react-native";
import Input from "../UI/Input";
import React, { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../util/date";
import DropDownPicker from "react-native-dropdown-picker";
import { GlobalStyles } from "../constants/styles";
import { SelectList } from "react-native-dropdown-select-list";

const wineTypes = [
  { value: "Champagne", key: "champagne" },
  { value: "Vin rouge", key: "red" },
  { value: "Vin blanc", key: "white" },
  { value: "Vin rosé", key: "rose" },
  { value: "Vin mousseux", key: "sparkling" },
  { value: "Autre", key: "other" },
];

const MIN_YEAR = 1900;
const MAX_YEAR = new Date().getFullYear();
const options = [];
for (let i = MAX_YEAR; i >= MIN_YEAR; i--) {
  options.push({ key: i.toString(), value: i.toString() });
}

const selectStyles = {
  backgroundColor: "#1E1A14",
  color: GlobalStyles.colors.primary700,
  marginBottom: 24,
};

function BottleForm({ selectedBottle, onCancel, onSubmit, label }) {
  const [inputValues, setInputValues] = React.useState({
    designation: {
      value: selectedBottle ? selectedBottle.designation : "",
      isValid: true,
    },
    date: {
      value: selectedBottle?.creationDate
        ? getFormattedDate(new Date(selectedBottle.creationDate))
        : "",
      isValid: true,
    },
    vintage: {
      value: selectedBottle ? selectedBottle.vintage.toString() : "",
      isValid: true,
    },
    type: {
      value: selectedBottle ? selectedBottle.type : "",
    },
  });

  const [value, setValue] = useState(null);

  const [vintage, setVintage] = useState(null);

  function inputChangeHandler(inputIdentifier, value) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: value, isValid: true },
      };
    });
  }

  function submitBottle() {
    const bottle = {
      designation: inputValues.designation?.value,
      date: new Date(),
      vintage: vintage,
      type: value,
    };

    const vintageIsValid = !isNaN(bottle.vintage) && bottle.vintage > 0;
    const designationIsValid = bottle.designation?.trim().length > 0;

    if (!designationIsValid || !vintageIsValid) {
      setInputValues((currentInput) => {
        return {
          designation: {
            value: currentInput.designation.value,
            isValid: designationIsValid,
          },
          vintage: {
            value: currentInput.vintage.value,
            isValid: vintageIsValid,
          },
        };
      });
      return;
    }
    onSubmit(bottle);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre bouteille</Text>
      <SelectList
        placeholder="Type de vin"
        setSelected={(val) => setValue(val)}
        data={wineTypes}
        save={"key"}
        dropdownStyles={selectStyles}
        boxStyles={selectStyles}
      />
      <SelectList
        placeholder="Millésime"
        setSelected={(val) => setVintage(val)}
        data={options}
        save={"key"}
        dropdownStyles={selectStyles}
        boxStyles={selectStyles}
      />
      <Input
        isValid={inputValues.designation.isValid}
        errorText={"Please enter a valid designation"}
        label="Domaine"
        inputProps={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "designation"),
          value: inputValues.designation.value,
        }}
        styles={selectStyles}
      ></Input>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Annuler
        </Button>
        <Button style={styles.button} onPress={submitBottle}>
          {label}
        </Button>
      </View>
    </View>
  );
}

export default BottleForm;

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
  },
  container: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
