import { Client } from "minio";

export const minioClient = new Client({
  endPoint: String(process.env.BASE_URL_S3) || "localhost",
  port: Number(process.env.PORT_S3) || 9000,
  useSSL: false,
  accessKey: String(process.env.ACCESS_KEY_S3) || "minioadmin",
  secretKey: String(process.env.SECRET_KEY_S3) || "minioadmin",
});
