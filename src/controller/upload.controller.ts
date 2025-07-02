import { Request, Response } from "express";
import { UploadService } from "../service/upload.service";

const uploadService = new UploadService();

export class UploadController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const file = req.file;
      const url = await uploadService.execute(file!);

      res.status(201).json({ message: "Upload feito!", url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro no upload." });
    }
  }
}
