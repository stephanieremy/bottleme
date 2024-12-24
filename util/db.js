import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { bottles as bottlesSchema } from "../store/schema";
import { eq } from "drizzle-orm";

const expo = openDatabaseSync("db.db");
const db = drizzle(expo);

export async function storeBottle(bottleData) {
  db.insert(bottlesSchema).values(bottleData).returning();
}

export async function fetchBottles() {
  return db.select().from(bottlesSchema);
}

export async function fetchRecentBottles() {
  const now = new Date(Date.now());
  const recent = now.setDate(now.getDate() - 7);
  return db
    .select()
    .from(bottlesSchema)
    .where(bottlesSchema.date < recent);
}

export function updateBottle(id, bottleData) {
  return db
    .update(bottlesSchema)
    .set(bottleData)
    .where(eq(bottlesSchema.id, bottleData.id))
    .returning();
}

export function deleteBottle(id) {
  db.delete(bottlesSchema).where(eq(bottlesSchema.id, id));
}
