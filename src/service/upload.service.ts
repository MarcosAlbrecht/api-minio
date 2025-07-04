import { MinioRepository } from "../repository/minio.repository";

export class UploadService {
  private minioRepository = new MinioRepository();

  async execute(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error("Arquivo não encontrado.");
    }

    const url = await this.minioRepository.uploadImage(
      file.path,
      file.originalname,
      file.mimetype
    );

    return url;
  }
  async list(): Promise<{ name: string; url: string }[]> {
    return this.minioRepository.listFiles();
  }

  async delete(fileName: string): Promise<void> {
    return this.minioRepository.deleteFile(fileName);
  }
}
