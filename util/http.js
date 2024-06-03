import axios from "axios";

const DATABASE_URL =
  "https://bottleme-466a1-default-rtdb.europe-west1.firebasedatabase.app/";

export async function storeBottle(bottleData) {
  const response = await axios.post(DATABASE_URL + "bottles.json", bottleData);
  return response.data.name;
}

export async function fetchBottles() {
  const response = await axios.get(DATABASE_URL + "bottles.json");
  const bottles = [];
  for (const key of response.data) {
    const bottle = {
      id: key,
      date: new Date(response.data[key].date),
      designation: response.data[key].designation,
      vintage: response.data[key].vintage,
      type: response.data[key].type,
    };
    bottles.push(bottle);
  }
  return bottles;
}

export function updateBottle(id, bottleData) {
  return axios.put(DATABASE_URL + `/bottles/${id}.json`, bottleData);
}

export function deleteBottle(id) {
  return axios.delete(DATABASE_URL + `/bottles/${id}.json`);
}
