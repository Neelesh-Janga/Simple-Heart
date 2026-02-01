import { type Response, type InsertResponse, responses } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createResponse(response: InsertResponse): Promise<Response>;
}

export class DatabaseStorage implements IStorage {
  async createResponse(insertResponse: InsertResponse): Promise<Response> {
    const [response] = await db
      .insert(responses)
      .values(insertResponse)
      .returning();
    return response;
  }
}

export const storage = new DatabaseStorage();
