import fs from "fs";
import { minioClient } from "../config/minio";

const BUCKET = "biotask";
const PRIVATE_BUCKET = "private";

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

  async getPresignedUrl(
    objectName: string,
    expiresInSeconds = 3600
  ): Promise<string> {
    const extension = objectName.split(".").pop()?.toLowerCase();

    // Detecta o tipo de mídia para o header correto
    const contentTypeMap: Record<string, string> = {
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      pdf: "application/pdf",
      webp: "image/webp",
    };

    const contentType =
      contentTypeMap[extension || ""] || "application/octet-stream";

    return await minioClient.presignedUrl(
      "GET",
      PRIVATE_BUCKET,
      objectName,
      expiresInSeconds,
      {
        "response-content-type": contentType,
      }
    );
  }

  async deleteFile(objectName: string): Promise<void> {
    await minioClient.removeObject(BUCKET, objectName);
  }
}
