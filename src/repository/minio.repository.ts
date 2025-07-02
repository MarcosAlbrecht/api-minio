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
}
