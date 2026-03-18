import express from "express";
import cors from "cors"
import {
    criarPartida,
    listarPartidas,
    obterPartida,
    alterarPartida,
    deletarPartida
} from "./controller/partidas_controller.js";
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.json({msg: "Hello world"})
})
app.post("/", criarPartida);        
app.get("/", listarPartidas);       
app.get("/:id", obterPartida);      
app.put("/:id", alterarPartida);    
app.delete("/:id", deletarPartida); 

    
export default app