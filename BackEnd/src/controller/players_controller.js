// ============================================================
// CONTROLLER: players_controller.js
// Responsável por: criação, listagem, busca, edição e remoção de players
// Tabela: players (id, nickname, plataforma, criado_em)
// Plataformas válidas: 'PC','PS','XBOX','MOBILE','NINTENDO','OUTRO'
// ============================================================

import { db } from "../config/db.js";

// Plataformas aceitas pelo ENUM no banco
const PLATAFORMAS_VALIDAS = ["PC", "PS", "XBOX", "MOBILE", "NINTENDO", "OUTRO"];

// ► POST /players
// Cria um novo player no banco
export async function criarPlayer(req, res) {
    try {
        const { nickname, plataforma } = req.body;

        if (!nickname || !plataforma)
            return res.status(400).json({ erro: "Os campos nickname e plataforma são obrigatórios" });

        // Validação do ENUM antes de enviar ao banco
        if (!PLATAFORMAS_VALIDAS.includes(plataforma.toUpperCase()))
            return res.status(400).json({
                erro: `Plataforma inválida. Valores aceitos: ${PLATAFORMAS_VALIDAS.join(", ")}`
            });

        await db.execute(
            "INSERT INTO players (nickname, plataforma) VALUES (?, ?)",
            [nickname, plataforma.toUpperCase()]
        );

        res.status(201).json({ mensagem: "Player criado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}

// ► GET /players
// Retorna todos os players cadastrados
export async function listarPlayers(req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM players");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao listar players" });
    }
}

// ► GET /players/:id
// Retorna um player pelo ID
export async function obterPlayer(req, res) {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM players WHERE id = ?",
            [req.params.id]
        );

        if (rows.length === 0)
            return res.status(404).json({ erro: "Player não encontrado" });

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}

// ► PUT /players/:id
// Atualiza os dados de um player existente
export async function alterarPlayer(req, res) {
    try {
        const { nickname, plataforma } = req.body;

        if (!nickname || !plataforma)
            return res.status(400).json({ erro: "Os campos nickname e plataforma são obrigatórios" });

        if (!PLATAFORMAS_VALIDAS.includes(plataforma.toUpperCase()))
            return res.status(400).json({
                erro: `Plataforma inválida. Valores aceitos: ${PLATAFORMAS_VALIDAS.join(", ")}`
            });

        const [result] = await db.execute(
            "UPDATE players SET nickname = ?, plataforma = ? WHERE id = ?",
            [nickname, plataforma.toUpperCase(), req.params.id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ erro: "Player não encontrado para atualizar" });

        res.json({ mensagem: "Player atualizado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}

// ► DELETE /players/:id
// Remove um player pelo ID
// ⚠ ATENÇÃO: deletar um player apaga todas as partidas vinculadas a ele (ON DELETE CASCADE)
export async function deletarPlayer(req, res) {
    try {
        const [result] = await db.execute(
            "DELETE FROM players WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ erro: "Player não encontrado para deletar" });

        res.json({ mensagem: "Player deletado com sucesso! (partidas associadas também foram removidas)" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}