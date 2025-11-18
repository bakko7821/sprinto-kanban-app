import express, { Request, Response } from "express";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";
import Component from "../models/Column";
import Board from "../models/Board";
import Task from "../models/Task";

const router = express.Router()

router.post("/:id", authMiddleware, async(req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const { name } = req.body;
        const columnId = Number(req.params.id)

        const newTask = await Task.create({
            name,
            columnId: columnId,
            deadline: "",
            isDone: false,
            tags: []
        });

        res.json(newTask);
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при создании новой доски" });
    }
})

router.get("/columnId/:id", authMiddleware, async(req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const id = Number(req.params.id)

        const tasks = await Task.findAll({
            where: { columnId: id }
        });

        if (!tasks) {
            return res.status(404).json({ message: "Задачи не найдены" });
        }

        res.json(tasks);

    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении всех задач из колонки." });
    }
})

router.put("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    if (!userId) {
        return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const id = Number(req.params.id);

        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: "Задача не найдена" });
        }

        const { name, deadline, tags, isDone } = req.body;

        await task.update({
            name,
            deadline,
            tags,
            isDone
        });

        res.json(task);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при изменении задачи" });
    }
});


export default router