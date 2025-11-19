import express, { Request, Response } from "express";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";
import Component from "../models/Column";
import Board from "../models/Board";
import Column from "../models/Column";

const router = express.Router()

router.post("/:id", authMiddleware, async(req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const { name } = req.body;
        const boardId = Number(req.params.id)

        const newColumn = await Column.create({
            name,
            boardId: boardId,
        });

        res.json(newColumn);
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при создании нового столбца" });
    }
})

router.get("/boardId/:id", authMiddleware, async(req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const id = Number(req.params.id)

        const columns = await Column.findAll({
            where: { boardId: id }
        });

        if (!columns) {
            return res.status(404).json({ message: "Колонка не найдена" });
        }

        res.json(columns);

    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при создании новой доски" });
    }
})

router.delete("/:id", authMiddleware, async(req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const id = Number(req.params.id)

        await Column.destroy({ where: { id } });

    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при удалении колонки" });
    }
})

export default router