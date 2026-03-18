import express from "express";
import {
    criarPartida,
    listarPartidas,
    obterPartida,
    alterarPartida,
    deletarPartida
} from "../controller/partidas_controller.js";

const route = express.Router();

route.post("/", criarPartida);        
route.get("/", listarPartidas);       
route.get("/:id", obterPartida);      
route.put("/:id", alterarPartida);    
route.delete("/:id", deletarPartida); 

export default route;