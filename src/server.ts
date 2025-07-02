import express from "express";
import uploadRoutes from "./routes/upload.routes";

const app = express();

app.use(express.json());
app.use(uploadRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
