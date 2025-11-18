import express, { Request, Response } from "express";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";
import Tag from "../models/Tag";

const router = express.Router()

router.post('/create/:id', authMiddleware, async(req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const { name, color } = req.body;
        const ownerId = Number(req.params.id)

        const newTag = await Tag.create({
            name,
            color,
            ownerId: ownerId
        });

        res.json(newTag);
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при создании новой метки" });
    }
})

router.get('/all/:id', authMiddleware, async(req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const id = Number(req.params.id)

        const tags = await Tag.findAll({
            where: { ownerId: id }
        });

        if (!tags) {
            return res.status(404).json({ message: "Метки не найдены" });
        }

        res.json(tags);
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении всех меток пользователя." });
    }
})

router.get('/:id', authMiddleware, async(req: AuthRequest, res: Response) => {
    const userId = (req.user as any)?.id;
    
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    try {
        const id = Number(req.params.id)

        const tag = await Tag.findByPk(id);

        if (!tag) {
            return res.status(404).json({ message: "Метка не найдена" });
        }

        res.json(tag);
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении метки по id." });
    }
})

export default router