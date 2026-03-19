import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Select from "../UI/Select";
import { GlobalStyles } from "../constants/styles";

const WINE_TYPES = [
  { label: "Rouge", value: "RED" },
  { label: "Blanc", value: "WHITE" },
  { label: "Rosé", value: "PINK" },
  { label: "Champagne", value: "CHAMPAGNE" },
  { label: "Pétillant", value: "SPARKLING" },
  { label: "Liquoreux", value: "MUTED" },
];

const VINTAGE_OPTIONS = Array.from(
  { length: new Date().getFullYear() - 1900 + 1 },
  (_, i) => new Date().getFullYear() - i,
);

function BottleForm({ selectedBottle, onCancel, onSubmit, label }) {
  const [inputs, setInputs] = useState({
    name: selectedBottle?.name ?? "",
    designation: selectedBottle?.designation ?? "",
    region: selectedBottle?.region ?? "",
    quantity: selectedBottle?.quantity?.toString() ?? "",
    price: selectedBottle?.price?.toString() ?? "",
    score: selectedBottle?.score?.toString() ?? "",
  });

  const [type, setType] = useState(selectedBottle?.type ?? null);
  const [vintage, setVintage] = useState(
    selectedBottle?.vintage?.toString() ?? null,
  );

  const [errors, setErrors] = useState({});

  function inputChangeHandler(field, value) {
    setInputs((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: false }));
  }

  function submitBottle() {
    console.log("submitBottle called", inputs, type, vintage);
    const newErrors = {
      name: inputs.name.trim().length === 0,
      designation: inputs.designation.trim().length === 0,
      type: !type,
      vintage: !vintage,
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      name: inputs.name,
      designation: inputs.designation,
      region: inputs.region,
      quantity: inputs.quantity ? parseInt(inputs.quantity) : null,
      price: inputs.price ? parseFloat(inputs.price) : null,
      score: inputs.score ? parseInt(inputs.score) : null,
      type,
      vintage: parseInt(vintage),
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre bouteille</Text>

      <Select
        label="Type de vin"
        placeholder="Choisir un type"
        value={type}
        options={WINE_TYPES}
        onSelect={setType}
      />
      {errors.type && <Text style={styles.errorText}>Choisissez un type</Text>}

      <Select
        label="Millésime"
        placeholder="Choisir un millésime"
        value={vintage}
        options={VINTAGE_OPTIONS}
        onSelect={(val) => setVintage(val)}
      />
      {errors.vintage && (
        <Text style={styles.errorText}>Choisissez un millésime</Text>
      )}

      <Input
        label="Nom du château"
        isValid={!errors.name}
        errorText="Champ obligatoire"
        inputProps={{
          value: inputs.name,
          onChangeText: (val) => inputChangeHandler("name", val),
          placeholder: "ex: Château Margaux",
        }}
      />

      <Input
        label="Appellation"
        isValid={!errors.designation}
        errorText="Champ obligatoire"
        inputProps={{
          value: inputs.designation,
          onChangeText: (val) => inputChangeHandler("designation", val),
          placeholder: "ex: Margaux, Bordeaux",
        }}
      />

      <Input
        label="Région"
        inputProps={{
          value: inputs.region,
          onChangeText: (val) => inputChangeHandler("region", val),
          placeholder: "ex: Bordeaux",
        }}
      />

      <Input
        label="Quantité"
        inputProps={{
          value: inputs.quantity,
          onChangeText: (val) =>
            inputChangeHandler("quantity", val.replace(/[^0-9]/g, "")),
          keyboardType: "numeric",
          placeholder: "ex: 6",
        }}
      />

      <Input
        label="Prix / bouteille"
        inputProps={{
          value: inputs.price,
          onChangeText: (val) =>
            inputChangeHandler("price", val.replace(/[^0-9.]/g, "")),
          keyboardType: "numeric",
          placeholder: "ex: 380",
        }}
      />

      <Input
        label="Score"
        inputProps={{
          value: inputs.score,
          onChangeText: (val) =>
            inputChangeHandler("score", val.replace(/[^0-9]/g, "")),
          keyboardType: "numeric",
          placeholder: "ex: 97",
        }}
      />

      <View style={styles.buttonContainer}>
        <Button type="secondary" onPress={onCancel}>
          Annuler
        </Button>
        <Button type="primary" onPress={submitBottle}>
          {label}
        </Button>
      </View>
    </View>
  );
}

export default BottleForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontFamily: "PlayfairDisplay",
    fontSize: 24,
    color: GlobalStyles.colors.ink,
    marginBottom: 24,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 8,
  },
  errorText: {
    fontFamily: "DMSans",
    fontSize: 12,
    color: GlobalStyles.colors.error,
    marginTop: -12,
    marginBottom: 12,
  },
});
