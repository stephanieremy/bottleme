import { StyleSheet, View } from "react-native";
import { useLayoutEffect, useState } from "react";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import BottleForm from "../components/BottleForm";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";
import { useBottlesService } from "../api/apiState";

function ManageBottle({ route, navigation }) {
  const [error, setError] = useState();
  const editedBottleId = route.params?.id;
  const isEdit = !!editedBottleId;

  const { getBottle, createBottle, updateBottle, deleteBottle } =
    useBottlesService(editedBottleId);

  async function deleteBottleHandler() {
    try {
      await deleteBottle.mutateAsync(editedBottleId);
      navigation.goBack();
    } catch (e) {
      setError("This bottle has not been deleted");
    }
  }

  async function confirmBottle(bottle) {
    try {
      if (isEdit) {
        await updateBottle.mutateAsync({ id: editedBottleId, ...bottle });
      } else {
        await createBottle.mutateAsync(bottle);
      }
      navigation.goBack();
    } catch (e) {
      setError("Could not save data. Please try again");
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? "Editer la bouteille" : "Ajouter une bouteille",
    });
  }, [navigation, isEdit]);

  if (
    deleteBottle.isPending ||
    createBottle.isPending ||
    updateBottle.isPending
  ) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }

  return (
    <View style={styles.container}>
      <BottleForm
        selectedBottle={getBottle.data}
        onCancel={() => navigation.goBack()}
        onSubmit={confirmBottle}
        label={isEdit ? "Editer la bouteille" : "Ajouter une bouteille"}
      />
      {isEdit && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteBottleHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageBottle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.bg,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.border,
  },
});
