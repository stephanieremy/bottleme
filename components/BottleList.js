import { FlatList } from "react-native";
import BottleItem from "./BottleItem";

function renderBottleItem(item) {
  return <BottleItem {...item.item} key={item.id} />;
}

function BottlesList({ bottles }) {
  return (
    <FlatList
      data={bottles}
      renderItem={renderBottleItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default BottlesList;
