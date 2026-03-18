// ============================================================
// MODEL: jogos_model.js
// Responsável por: todas as queries SQL da tabela jogos
// ============================================================

import { db } from "../config/db.js";

// Insere um novo jogo
export async function insert(nome, genero) {
    const [result] = await db.execute(
        "INSERT INTO jogos (nome, genero) VALUES (?, ?)",
        [nome, genero]
    );
    return result;
}

// Retorna todos os jogos
export async function getAll() {
    const [rows] = await db.execute("SELECT * FROM jogos");
    return rows;
}

// Retorna um jogo pelo ID
export async function getById(id) {
    const [rows] = await db.execute(
        "SELECT * FROM jogos WHERE id = ?",
        [id]
    );
    return rows[0] || null;
}

// Atualiza os dados de um jogo
export async function update(id, nome, genero) {
    const [result] = await db.execute(
        "UPDATE jogos SET nome = ?, genero = ? WHERE id = ?",
        [nome, genero, id]
    );
    return result;
}

// Remove um jogo pelo ID
// ⚠ Partidas vinculadas também serão removidas (ON DELETE CASCADE)
export async function remove(id) {
    const [result] = await db.execute(
        "DELETE FROM jogos WHERE id = ?",
        [id]
    );
    return result;
}