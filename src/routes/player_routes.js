import express from "express";
import {
    criarPlayer,
    listarPlayers,
    obterPlayer,
    alterarPlayer,
    deletarPlayer
} from "../controller/players_controller.js";

const route = express.Router();

route.post("/", criarPlayer);        // Criar player
route.get("/", listarPlayers);       // Listar todos
route.get("/:id", obterPlayer);      // Buscar por ID
route.put("/:id", alterarPlayer);    // Atualizar por ID
route.delete("/:id", deletarPlayer); // Deletar por ID

export default route;
