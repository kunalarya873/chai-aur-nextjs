
import { index, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
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

export const products = pgTable("products",{
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    price: integer("price").notNull(),
    image: text("image"),
    updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});

export const warehouses =pgTable("warehouses",{
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    pincode: varchar("pincode", { length: 100 }).notNull(),
    updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
},
(table) =>{
    return {
        pincodeIdx: index('pincode_idx').on(table.pincode)
    }
});

export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    // userId: integer("user_id").notNull().references(() => users.id, {onDelete: "cascade"}),
    // productId: integer("product_id").notNull().references(() => products.id, {onDelete: "cascade"}),
    // quantity: integer("quantity").notNull(),
    // totalPrice: integer("total_price").notNull(),
    // status: varchar("status", { length: 20 }).notNull().default("pending"),
    // updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    // createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});

export const deliveryPersons = pgTable("delivery_persons",{
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    phone: varchar("phone", { length: 13 }).notNull(),
    warehouseId: integer("warehouse_id").notNull().references(() => warehouses.id, {onDelete: "cascade"}),
    order_id: integer("order_id").references(() => orders.id, {onDelete: "set null"}),
    updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});