import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const responses = pgTable("responses", {
  id: serial("id").primaryKey(),
  visitorName: text("visitor_name"),
  accepted: boolean("accepted").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertResponseSchema = createInsertSchema(responses).pick({
  visitorName: true,
  accepted: true,
});

export type InsertResponse = z.infer<typeof insertResponseSchema>;
export type Response = typeof responses.$inferSelect;
