// ============================================================
// MODEL: players_model.js
// Responsável por: todas as queries SQL da tabela players
// ============================================================

import { db } from "../config/db.js";

// Insere um novo player
export async function insert(nickname, plataforma) {
    const [result] = await db.execute(
        "INSERT INTO players (nickname, plataforma) VALUES (?, ?)",
        [nickname, plataforma]
    );
    return result;
}

// Retorna todos os players
export async function getAll() {
    const [rows] = await db.execute("SELECT * FROM players");
    return rows;
}

// Retorna um player pelo ID
export async function getById(id) {
    const [rows] = await db.execute(
        "SELECT * FROM players WHERE id = ?",
        [id]
    );
    return rows[0] || null;
}

// Atualiza os dados de um player
export async function update(id, nickname, plataforma) {
    const [result] = await db.execute(
        "UPDATE players SET nickname = ?, plataforma = ? WHERE id = ?",
        [nickname, plataforma, id]
    );
    return result;
}

// Remove um player pelo ID
// ⚠ Partidas vinculadas também serão removidas (ON DELETE CASCADE)
export async function remove(id) {
    const [result] = await db.execute(
        "DELETE FROM players WHERE id = ?",
        [id]
    );
    return result;
}