import { Router } from "express";
import multer from "multer";
import { UploadController } from "../controller/upload.controller";

const upload = multer({ dest: "uploads/" });
const uploadController = new UploadController();

const router = Router();

router.post("/upload", upload.single("file"), (req, res) =>
  uploadController.handle(req, res)
);

export default router;
