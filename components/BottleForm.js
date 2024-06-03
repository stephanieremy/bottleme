import { StyleSheet, Text, View } from "react-native";
import Input from "../UI/Input";
import React, { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../util/date";
import DropDownPicker from "react-native-dropdown-picker";
import { GlobalStyles } from "../constants/styles";

const wineTypes = [
  { label: "Champagne", value: "champagne" },
  { label: "Red wine", value: "red" },
  { label: "White wine", value: "white" },
  { label: "Rose wine", value: "rose" },
  { label: "Sparkling wine", value: "sparkling" },
  { label: "Other", value: "other" },
];

function BottleForm({ selectedBottle, onCancel, onSubmit, label }) {
  const [inputValues, setInputValues] = React.useState({
    designation: {
      value: selectedBottle ? selectedBottle.designation : "",
      isValid: !!selectedBottle,
    },
    date: {
      value: selectedBottle ? getFormattedDate(selectedBottle.date) : "",
      isValid: !!selectedBottle,
    },
    vintage: {
      value: selectedBottle ? selectedBottle.vintage.toString() : "",
      isValid: !!selectedBottle,
    },
    type: {
      value: selectedBottle ? selectedBottle.type : "",
    },
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

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
      designation: inputValues.designation.value,
      date: new Date(),
      vintage: inputValues.vintage.value,
      type: inputValues.type.value,
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
      <Text style={styles.title}>Your bottle</Text>
      <DropDownPicker
        placeholder={"Type of wine"}
        open={open}
        value={value}
        items={wineTypes}
        onChangeValue={inputChangeHandler.bind(this, "type")}
        setOpen={setOpen}
        style={{
          backgroundColor: GlobalStyles.colors.primary100,
          color: GlobalStyles.colors.primary700,
          marginBottom: 24,
        }}
        setValue={setValue}
      />
      <View style={styles.inputRow}>
        <Input
          isValid={inputValues.vintage.isValid}
          errorText={"Vintage cannot be null"}
          label="Vintage"
          style={styles.input}
          inputProps={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "vintage"),
            value: inputValues.vintage.value,
          }}
        ></Input>
      </View>
      <Input
        isValid={inputValues.designation.isValid}
        errorText={"Please enter a valid designation"}
        label="Designation"
        inputProps={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "designation"),
          value: inputValues.designation.value,
        }}
      ></Input>

      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
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
