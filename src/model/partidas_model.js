// ============================================================
// MODEL: partidas_model.js
// Responsável por: todas as queries SQL da tabela partidas
// Usa JOIN para retornar nomes de jogo e player nas buscas
// ============================================================

import { db } from "../config/db.js";

// Insere uma nova partida
// data_partida é opcional — se não vier, o banco usa CURRENT_TIMESTAMP
export async function insert(jogo_id, player_id, pontos, data_partida) {
    if (data_partida) {
        const [result] = await db.execute(
            "INSERT INTO partidas (jogo_id, player_id, pontos, data_partida) VALUES (?, ?, ?, ?)",
            [jogo_id, player_id, pontos, data_partida]
        );
        return result;
    }

    const [result] = await db.execute(
        "INSERT INTO partidas (jogo_id, player_id, pontos) VALUES (?, ?, ?)",
        [jogo_id, player_id, pontos]
    );
    return result;
}

// Retorna todas as partidas com nome do jogo e nickname do player
export async function getAll() {
    const [rows] = await db.execute(`
        SELECT
            p.id,
            j.nome        AS jogo,
            pl.nickname   AS player,
            p.pontos,
            p.data_partida
        FROM partidas p
        INNER JOIN jogos   j  ON p.jogo_id   = j.id
        INNER JOIN players pl ON p.player_id = pl.id
        ORDER BY p.data_partida DESC
    `);
    return rows;
}

// Retorna uma partida pelo ID com JOIN
export async function getById(id) {
    const [rows] = await db.execute(`
        SELECT
            p.id,
            j.nome        AS jogo,
            pl.nickname   AS player,
            p.pontos,
            p.data_partida
        FROM partidas p
        INNER JOIN jogos   j  ON p.jogo_id   = j.id
        INNER JOIN players pl ON p.player_id = pl.id
        WHERE p.id = ?
    `, [id]);
    return rows[0] || null;
}

// Atualiza os dados de uma partida
export async function update(id, jogo_id, player_id, pontos, data_partida) {
    const [result] = await db.execute(
        "UPDATE partidas SET jogo_id = ?, player_id = ?, pontos = ?, data_partida = ? WHERE id = ?",
        [jogo_id, player_id, pontos, data_partida || new Date(), id]
    );
    return result;
}

// Remove uma partida pelo ID
export async function remove(id) {
    const [result] = await db.execute(
        "DELETE FROM partidas WHERE id = ?",
        [id]
    );
    return result;
}