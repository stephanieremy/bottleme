import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { bottles as bottlesSchema } from "../store/schema";

const expo = openDatabaseSync("db.db");
const db = drizzle(expo);

export async function storeBottle(bottleData) {
  return "";
}

export async function fetchBottles() {
  return db.select().from(bottlesSchema);
}

export function updateBottle(id, bottleData) {
  return "";
}

export function deleteBottle(id) {
  return "";
}
