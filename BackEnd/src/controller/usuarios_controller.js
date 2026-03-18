// ============================================================
// CONTROLLER: usuarios_controller.js  (versão com Model)
// Responsabilidade: validar dados e montar a resposta HTTP
// Quem fala com o banco: usuarios_model.js
// ============================================================

import * as UsuarioModel from "../model/usuarios_model.js";

// ► POST /usuarios
export async function criarUsuario(req, res) {
    try {
        const { nome, email, senha_hash } = req.body;

        if (!nome || !email || !senha_hash)
            return res.status(400).json({ erro: "Os campos nome, email e senha_hash são obrigatórios" });

        await UsuarioModel.insert(nome, email, senha_hash);

        res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY")
            return res.status(409).json({ erro: "Este e-mail já está cadastrado" });

        res.status(500).json({ erro: err.message });
    }
}

// ► GET /usuarios
export async function listarUsuarios(req, res) {
    try {
        const usuarios = await UsuarioModel.getAll();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao listar usuários" });
    }
}

// ► GET /usuarios/:id
export async function obterUsuario(req, res) {
    try {
        const usuario = await UsuarioModel.getById(req.params.id);

        if (!usuario)
            return res.status(404).json({ erro: "Usuário não encontrado" });

        res.json(usuario);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}

// ► PUT /usuarios/:id
export async function alterarUsuario(req, res) {
    try {
        const { nome, email, senha_hash } = req.body;

        if (!nome || !email || !senha_hash)
            return res.status(400).json({ erro: "Os campos nome, email e senha_hash são obrigatórios" });

        const result = await UsuarioModel.update(req.params.id, nome, email, senha_hash);

        if (result.affectedRows === 0)
            return res.status(404).json({ erro: "Usuário não encontrado para atualizar" });

        res.json({ mensagem: "Usuário atualizado com sucesso!" });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY")
            return res.status(409).json({ erro: "Este e-mail já está em uso por outro usuário" });

        res.status(500).json({ erro: err.message });
    }
}

// ► DELETE /usuarios/:id
export async function deletarUsuario(req, res) {
    try {
        const result = await UsuarioModel.remove(req.params.id);

        if (result.affectedRows === 0)
            return res.status(404).json({ erro: "Usuário não encontrado para deletar" });

        res.json({ mensagem: "Usuário deletado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}