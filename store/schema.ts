import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";

export const bottles = table(
  "bottles",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    designation: t.text("designation"),
    vintage: t.text("vintage"),
    type: t.text("type"),
    date: t.numeric("date"),
  },
  (table) => {
    return [t.uniqueIndex("designation_idx").on(table.designation)];
  },
);
