// ============================================================
// CONTROLLER: jogos_controller.js  (versão com Model)
// Responsabilidade: validar dados e montar a resposta HTTP
// Quem fala com o banco: jogos_model.js
// ============================================================

import * as JogoModel from "../model/jogos_model.js";

// ► POST /jogos
export async function criarJogo(req, res) {
    try {
        const { nome, genero } = req.body;

        if (!nome || !genero)
            return res.status(400).json({ erro: "Os campos nome e genero são obrigatórios" });

        await JogoModel.insert(nome, genero);

        res.status(201).json({ mensagem: "Jogo criado com sucesso!" });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY")
            return res.status(409).json({ erro: "Já existe um jogo com este nome" });

        res.status(500).json({ erro: err.message });
    }
}

// ► GET /jogos
export async function listarJogos(req, res) {
    try {
        const jogos = await JogoModel.getAll();
        res.json(jogos);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao listar jogos" });
    }
}

// ► GET /jogos/:id
export async function obterJogo(req, res) {
    try {
        const jogo = await JogoModel.getById(req.params.id);

        if (!jogo)
            return res.status(404).json({ erro: "Jogo não encontrado" });

        res.json(jogo);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}

// ► PUT /jogos/:id
export async function alterarJogo(req, res) {
    try {
        const { nome, genero } = req.body;

        if (!nome || !genero)
            return res.status(400).json({ erro: "Os campos nome e genero são obrigatórios" });

        const result = await JogoModel.update(req.params.id, nome, genero);

        if (result.affectedRows === 0)
            return res.status(404).json({ erro: "Jogo não encontrado para atualizar" });

        res.json({ mensagem: "Jogo atualizado com sucesso!" });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY")
            return res.status(409).json({ erro: "Já existe outro jogo com este nome" });

        res.status(500).json({ erro: err.message });
    }
}

// ► DELETE /jogos/:id
export async function deletarJogo(req, res) {
    try {
        const result = await JogoModel.remove(req.params.id);

        if (result.affectedRows === 0)
            return res.status(404).json({ erro: "Jogo não encontrado para deletar" });

        res.json({ mensagem: "Jogo deletado com sucesso! (partidas associadas também foram removidas)" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}