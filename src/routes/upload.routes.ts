import { Router } from "express";
import multer from "multer";
import { MinioController } from "../controller/minio.controller";

const upload = multer({ dest: "uploads/" });
const uploadController = new MinioController();

const router = Router();

router.post("/upload", upload.single("file"), (req, res) =>
  uploadController.handle(req, res)
);
router.get("/files", (req, res) => uploadController.list(req, res));
router.delete("/files/:name", (req, res) => uploadController.delete(req, res));

export default router;
