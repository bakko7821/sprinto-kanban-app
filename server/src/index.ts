import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, sequelize } from "./config/db";
import authRouters from "../src/routes/auth"
import "./models"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouters);

async function startServer() {
    try {
        await connectDB();

        await sequelize.sync({ alter: true });

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server start failed:", error);
        process.exit(1);
    }
}

startServer();

export { app };
