import express, { Request, Response } from "express";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";
import User from "../models/User";
import Board from "../models/Board";

const router = express.Router()

router.get("/:id", authMiddleware, async(req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const user = await User.findByPk(userId)

        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.json(user);
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при поиске информации о локальном пользователе." });
    }

})

router.get("/all-boards/:id", authMiddleware, async(req:AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    
    if (!userId) {
        return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const {id} = req.params

        const boardsLits = await Board.findAll({
            where: { ownerId: id }
        });

        if (!boardsLits) {
            return res.status(404).json({ message: "Задачи не найдены" });
        }

        res.json(boardsLits);
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при поиске досок пользователя." });
    }
})

export default router;