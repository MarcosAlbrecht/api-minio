// src/config.ts
import * as dotenv from "dotenv";
import * as path from "path";

// Carrega as variáveis de ambiente o mais cedo possível
dotenv.config({ path: path.resolve(__dirname, "../.env") });
