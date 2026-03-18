import express from "express";
import {
    criarJogo,
    listarJogos,
    obterJogo,
    alterarJogo,
    deletarJogo
} from "../controller/jogos_controller.js";

const route = express.Router();

route.post("/", criarJogo);        
route.get("/", listarJogos);       
route.get("/:id", obterJogo);      
route.put("/:id", alterarJogo);    
route.delete("/:id", deletarJogo); 

export default route;
