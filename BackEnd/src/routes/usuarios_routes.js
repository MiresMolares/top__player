import express from "express";
import {
    criarUsuario,
    listarUsuarios,
    obterUsuario,
    alterarUsuario,
    deletarUsuario
} from "../controller/usuarios_controller.js";

const route = express.Router();

route.post("/", criarUsuario);        
route.get("/", listarUsuarios);       
route.get("/:id", obterUsuario);      
route.put("/:id", alterarUsuario);    
route.delete("/:id", deletarUsuario); 

export default route;