import express, { Request, Response } from "express";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";
import Component from "../models/Column";
import Board from "../models/Board";

const router = express.Router()

router.post("/:id", authMiddleware, async(req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const { name } = req.body;
        const boardId = Number(req.params.id)

        const newComponent = await Component.create({
            name,
            boardId: boardId,
        });

        res.json(newComponent);
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при создании новой доски" });
    }
})

router.get("/boardId/:id", authMiddleware, async(req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const id = Number(req.params.id)

        const components = await Component.findAll({
            where: { boardId: id }
        });

        if (!components) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.json(components);

    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при создании новой доски" });
    }
})

export default router