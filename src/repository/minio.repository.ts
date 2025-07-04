import fs from "fs";
import { minioClient } from "../config/minio";

const BUCKET = "biotask";

export class MinioRepository {
  async uploadImage(
    localPath: string,
    objectName: string,
    mimeType: string
  ): Promise<string> {
    const metaData = { "Content-Type": mimeType };

    // Garante que o bucket existe
    const exists = await minioClient.bucketExists(BUCKET);
    if (!exists) {
      await minioClient.makeBucket(BUCKET, "us-east-1");
    }

    await minioClient.fPutObject(BUCKET, objectName, localPath, metaData);

    fs.unlinkSync(localPath); // limpa arquivo local temporário

    return `http://localhost:9000/${BUCKET}/${objectName}`;
  }

  async listFiles(): Promise<{ name: string; url: string }[]> {
    const objectsStream = minioClient.listObjectsV2(BUCKET, "", true);

    const files: { name: string; url: string }[] = [];

    return new Promise((resolve, reject) => {
      objectsStream.on("data", (obj) => {
        if (typeof obj.name === "string") {
          const fileUrl = `http://localhost:9000/${BUCKET}/${obj.name}`;
          files.push({ name: obj.name, url: fileUrl });
        }
      });

      objectsStream.on("end", () => resolve(files));
      objectsStream.on("error", reject);
    });
  }

  async deleteFile(objectName: string): Promise<void> {
    await minioClient.removeObject(BUCKET, objectName);
  }
}
