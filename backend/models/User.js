const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Modelo de Usuário
// Responsável por gerenciar dados de autenticação e perfil
class User {
    // Inicializa a tabela se não existir
    static async init() {
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT DEFAULT 'user', -- 'user' ou 'admin'
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await db.run(sql);
    }

    // Cria um novo usuário com senha hash
    static async create({ name, email, password, role = 'user' }) {
        // Gera o hash da senha para segurança
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
        return db.run(sql, [name, email, hashedPassword, role]);
    }

    // Busca usuário por e-mail (usado no login)
    static async findByEmail(email) {
        const sql = `SELECT * FROM users WHERE email = ?`;
        return db.get(sql, [email]);
    }

    // Busca usuário por ID (usado no middleware de auth)
    static async findById(id) {
        const sql = `SELECT id, name, email, role, created_at FROM users WHERE id = ?`;
        return db.get(sql, [id]);
    }

    // Valida a senha comparando com o hash
    static async validatePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
}

module.exports = User;
