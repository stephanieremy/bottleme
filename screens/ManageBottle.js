import { StyleSheet, View } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { BottlesContext } from "../store/bottle-context";
import BottleForm from "../components/BottleForm";
import { deleteBottle, storeBottle, updateBottle } from "../util/db";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function ManageBottle({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const bottleContext = useContext(BottlesContext);
  const [error, setError] = useState();

  const editedBottleId = route.params?.id;
  const isEdit = !!editedBottleId;
  const selectedBottle = bottleContext.bottles.find(
    (bottle) => bottle.id === editedBottleId,
  );

  async function deleteBottleHandler() {
    setIsSubmitting(true);
    try {
      await deleteBottle(editedBottleId);
      bottleContext.deleteBottle(editedBottleId);
      navigation.goBack();
    } catch (error) {
      setError("This bottle has not been deleted");
      setIsSubmitting(false);
    }
  }

  function cancelBottle() {
    navigation.goBack();
  }

  function onConfirm() {
    setError(null);
  }

  async function confirmBottle(bottle) {
    setIsSubmitting(true);
    try {
      if (isEdit) {
        bottleContext.updateBottle(editedBottleId, bottle);
        await updateBottle(editedBottleId, bottle);
      } else {
        const id = await storeBottle(bottle);
        bottleContext.addBottle({ ...bottle, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data. Please try again");
      setIsSubmitting(false);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? "Editer la bouteille" : "Ajouter une bouteille",
    });
  }, [navigation, isEdit]);

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={onConfirm} />;
  }

  return (
    <View style={styles.container}>
      <BottleForm
        selectedBottle={selectedBottle}
        onCancel={cancelBottle}
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
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary50,
  },
});
