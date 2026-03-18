// ============================================================
// MODEL: usuarios_model.js
// Responsável por: todas as queries SQL da tabela usuarios
// O controller NÃO conhece SQL — só chama funções daqui
// ============================================================

import { db } from "../config/db.js";

// Insere um novo usuário
export async function insert(nome, email, senha_hash) {
    const [result] = await db.execute(
        "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)",
        [nome, email, senha_hash]
    );
    return result;
}

// Retorna todos os usuários (sem expor senha_hash)
export async function getAll() {
    const [rows] = await db.execute(
        "SELECT id, nome, email, criado_em FROM usuarios"
    );
    return rows;
}

// Retorna um usuário pelo ID (sem expor senha_hash)
export async function getById(id) {
    const [rows] = await db.execute(
        "SELECT id, nome, email, criado_em FROM usuarios WHERE id = ?",
        [id]
    );
    return rows[0] || null; // retorna o objeto ou null se não encontrar
}

// Atualiza os dados de um usuário
export async function update(id, nome, email, senha_hash) {
    const [result] = await db.execute(
        "UPDATE usuarios SET nome = ?, email = ?, senha_hash = ? WHERE id = ?",
        [nome, email, senha_hash, id]
    );
    return result;
}

// Remove um usuário pelo ID
export async function remove(id) {
    const [result] = await db.execute(
        "DELETE FROM usuarios WHERE id = ?",
        [id]
    );
    return result;
}