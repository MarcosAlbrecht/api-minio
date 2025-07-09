import { Request, Response } from "express";
import { UploadService } from "../service/upload.service";

const uploadService = new UploadService();

export class MinioController {
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

  async list(req: Request, res: Response): Promise<void> {
    try {
      const files = await uploadService.list();
      res.status(200).json(files);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao listar arquivos." });
    }
  }

  async getUrl(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const url = await uploadService.getPresignedUrl(id);
      res.status(200).json({ url });
    } catch (error) {
      res.status(500).json({ error: "Erro ao gerar URL." });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.params;
      await uploadService.delete(name);
      res.status(200).json({ message: "Arquivo removido com sucesso." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar arquivo." });
    }
  }
}
