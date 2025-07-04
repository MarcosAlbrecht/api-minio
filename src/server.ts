import express from "express";
import "./config";

import uploadRoutes from "./routes/upload.routes";

const app = express();

app.use(express.json());
app.use(uploadRoutes);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
