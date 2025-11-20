import express, { Request, Response } from "express";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";
import Board from "../models/Board";

const router = express.Router()

router.post("/:id", authMiddleware, async(req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const { name, isPrivate, ownerId } = req.body;
        const boardOwnerId = Number(req.params.id)

        const newBoard = await Board.create({
            name,
            isPrivate,
            backgroundImage: "",
            ownerId: boardOwnerId,
        });

        res.json(newBoard);
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при создании новой доски" });
    }

})

router.get("/:id", authMiddleware, async(req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const id = Number(req.params.id)

        const board = await Board.findByPk(id)

        if (!board) {
            return res.status(404).json({ message: "Доска не найдена" });
        }

        res.json(board);

    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении доски" });
    }

})

router.put("/:id", authMiddleware, async(req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const id = Number(req.params.id)

        const board = await Board.findByPk(id) 

        if (!board) {
            return res.status(404).json({ message: "Задача не найдена" });
        }

        const { name, backgroundImage, isPrivate} = req.body;

        await board.update({
            name,
            backgroundImage,
            isPrivate
        });

        res.json(board);

    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при изменении доски" });
    }
})

export default router