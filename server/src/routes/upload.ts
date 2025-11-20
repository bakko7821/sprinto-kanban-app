import { Router } from "express";
import formidable, { File } from "formidable";
import path from "path";
import fs from "fs";

const router = Router();

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

router.post("/image", (req, res) => {
    const form = formidable({
        uploadDir,
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024,
        filter: (part) => part.mimetype?.startsWith("image/") || false,
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ error: "Upload error" });
        }

        const fileArray = files.image as File[];
        if (!fileArray || !fileArray[0]) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const file = fileArray[0];

        const fileName = path.basename(file.filepath); // 100% работает
        const url = `/uploads/${fileName}`;

        return res.json({
            message: "Uploaded",
            url,
        });
    });
});

export default router;
