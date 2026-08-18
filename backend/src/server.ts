// criando um server para ver se ta td correto

import express, { Request, Response } from "express";
import cors from "cors"; // para não dar interferencia de porta
import dotenv from "dotenv";
import { sequelize } from "./config/database";
import { User } from "./models/User";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware

app.use(cors());
app.use(express.json());

// rota de Health Check
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    mensagem: "Servidor Backend rodando com sucesso.",
    timestamp: new Date().toISOString(),
  });
});

// rota para cadastrar o novo usuario

app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const { nome, email, senha_hash } = req.body;
    if (!nome || !email || !senha_hash) {
      return res.status(400).json({ erro: "nome, email e senha_hash são obrigatórias" });
    }

    const novoUsuario = await User.create({ nome, email, senha_hash });

    return res.status(201).json(novoUsuario);
  } catch (error: any) {
    return res.status(500).json({ erro: "Erro ao cadastrar usuario.", detalhe: error.message });
  }
});

// listar todos os usuariaos
app.get("/api/users", async (req: Request, res: Response) => {
  try {

    const usuarios = await User.findAll({attributes: ['id', 'nome', 'email', 'createdAt']});
    return res.status(200).json(usuarios)

  } catch (error: any) {
    return res.status(500).json({ erro: "Erro ao cadastrar usuario.", detalhe: error.message });
  }
});

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o PostgreSQL no Supabase realizada com sucesso");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(
        `Health Check disponivel em: http://localhost:${PORT}/api/health`,
      );
    });
  } catch (error) {
    console.log("Erro ao conectar com o banco de dados", error);
  }
}

main();
