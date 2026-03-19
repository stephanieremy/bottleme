import { FlatList } from "react-native";
import { WineCard } from "./WineCard";

function renderBottleItem(item) {
  return <WineCard bottle={item.item} key={item.id} />;
}

function BottlesList({ bottles }) {
  return (
    <FlatList
      data={bottles}
      renderItem={renderBottleItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 4, gap: 12 }}
    />
  );
}

export default BottlesList;
