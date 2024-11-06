import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
type ConnectionObject = {
    isConnected?: number,
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise <void> {
    if (connection.isConnected) {
        console.log("already connected");
        return;
    }
    try {
        const db = await mongoose.connect(
            process.env.NEXT_PUBLIC_MONGODB_URI || "mongodb://localhost:27017/next_js_testing", {}
        )
        connection.isConnected =db.connections[0].readyState
        console.log("db connected");
    } catch (error) {
        console.error("Database Connection error", error)
        process.exit(1)
    }
}

export default dbConnect;