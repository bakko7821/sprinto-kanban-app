import express, { Request, Response } from "express";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";
import Board from "../models/Board";
import Column from "../models/Column";
import Task from "../models/Task";

const router = express.Router()

router.get("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;

    if (!userId) {
        return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const boardId = Number(req.params.id);

        const board = await Board.findByPk(boardId);
        if (!board) {
            return res.status(404).json({ message: "Доска не найдена" });
        }

        const columns = await Column.findAll({
            where: { boardId }
        });

        if (columns.length === 0) {
            return res.json([]);
        }

        const tasksArrays = await Promise.all(
            columns.map(column =>
                Task.findAll({
                    where: {
                        columnId: column.id,
                        isArchive: true
                    }
                })
            )
        );

        const allTasks = tasksArrays.flat();

        res.json(allTasks);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении задач" });
    }
});

export default router