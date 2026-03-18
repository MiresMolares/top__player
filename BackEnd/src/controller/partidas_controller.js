// ============================================================
// CONTROLLER: partidas_controller.js  (versão com Model)
// Responsabilidade: validar dados e montar a resposta HTTP
// Quem fala com o banco: partidas_model.js
// ============================================================

import * as PartidaModel from "../model/partidas_model.js";

// ► POST /partidas
export async function criarPartida(req, res) {
    try {
        const { jogo_id, player_id, pontos, data_partida } = req.body;

        if (!jogo_id || !player_id || pontos === undefined)
            return res.status(400).json({ erro: "Os campos jogo_id, player_id e pontos são obrigatórios" });

        await PartidaModel.insert(jogo_id, player_id, pontos, data_partida);

        res.status(201).json({ mensagem: "Partida registrada com sucesso!" });
    } catch (err) {
        if (err.code === "ER_NO_REFERENCED_ROW_2")
            return res.status(400).json({ erro: "jogo_id ou player_id inválido: registro não encontrado" });

        res.status(500).json({ erro: err.message });
    }
}

// ► GET /partidas
export async function listarPartidas(req, res) {
    try {
        const partidas = await PartidaModel.getAll();
        res.json(partidas);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao listar partidas" });
    }
}

// ► GET /partidas/:id
export async function obterPartida(req, res) {
    try {
        const partida = await PartidaModel.getById(req.params.id);

        if (!partida)
            return res.status(404).json({ erro: "Partida não encontrada" });

        res.json(partida);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}

// ► PUT /partidas/:id
export async function alterarPartida(req, res) {
    try {
        const { jogo_id, player_id, pontos, data_partida } = req.body;

        if (!jogo_id || !player_id || pontos === undefined)
            return res.status(400).json({ erro: "Os campos jogo_id, player_id e pontos são obrigatórios" });

        const result = await PartidaModel.update(req.params.id, jogo_id, player_id, pontos, data_partida);

        if (result.affectedRows === 0)
            return res.status(404).json({ erro: "Partida não encontrada para atualizar" });

        res.json({ mensagem: "Partida atualizada com sucesso!" });
    } catch (err) {
        if (err.code === "ER_NO_REFERENCED_ROW_2")
            return res.status(400).json({ erro: "jogo_id ou player_id inválido: registro não encontrado" });

        res.status(500).json({ erro: err.message });
    }
}

// ► DELETE /partidas/:id
export async function deletarPartida(req, res) {
    try {
        const result = await PartidaModel.remove(req.params.id);

        if (result.affectedRows === 0)
            return res.status(404).json({ erro: "Partida não encontrada para deletar" });

        res.json({ mensagem: "Partida deletada com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}