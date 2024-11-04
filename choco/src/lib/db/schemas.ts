
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users",{
    id: serial("id").primaryKey(),
    fname: varchar("fname", { length: 100 }).notNull(),
    lname: varchar("lname", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).unique(),
    provider: varchar("provider", { length: 20 }).notNull(),
    external_id: varchar("external_id", { length: 100 }).notNull(),
    image: text("image"),
    role: varchar("role", { length: 20 }).notNull().default("customer"),
    updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});