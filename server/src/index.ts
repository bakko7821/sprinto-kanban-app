import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, sequelize } from "./config/db";
import authRouters from "../src/routes/auth"
import usersRoutes from "../src/routes/users"
import boardsRoutes from "../src/routes/boards"
import columnsRoutes from "./routes/columns"
import tasksRoutes from "./routes/tasks"
import tagsRoutes from "./routes/tags"
import "./models"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouters);
app.use("/api/users", usersRoutes);
app.use("/api/boards", boardsRoutes);
app.use("/api/columns", columnsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/tags", tagsRoutes);

async function startServer() {
    try {
        await connectDB();

        await sequelize.sync({ alter: true });
        console.log("All models synchronization")

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
