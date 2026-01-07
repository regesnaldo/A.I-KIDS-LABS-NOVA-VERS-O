const db = require('../config/db');

// Modelo de Histórico
// Rastreia o progresso e visualizações dos usuários
class History {
    // Inicializa a tabela de histórico
    static async init() {
        const sql = `
            CREATE TABLE IF NOT EXISTS history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                video_id INTEGER NOT NULL,
                watched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                progress INTEGER DEFAULT 0, -- Porcentagem assistida (0-100)
                completed BOOLEAN DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (video_id) REFERENCES videos(id)
            )
        `;
        await db.run(sql);
    }

    // Registra ou atualiza uma visualização
    static async upsert({ userId, videoId, progress, completed }) {
        // Verifica se já existe registro
        const existing = await db.get(
            'SELECT id FROM history WHERE user_id = ? AND video_id = ?', 
            [userId, videoId]
        );

        if (existing) {
            // Atualiza registro existente
            const sql = `
                UPDATE history 
                SET watched_at = CURRENT_TIMESTAMP, progress = ?, completed = ?
                WHERE id = ?
            `;
            return db.run(sql, [progress, completed ? 1 : 0, existing.id]);
        } else {
            // Cria novo registro
            const sql = `
                INSERT INTO history (user_id, video_id, progress, completed)
                VALUES (?, ?, ?, ?)
            `;
            return db.run(sql, [userId, videoId, progress, completed ? 1 : 0]);
        }
    }

    // Lista histórico de um usuário
    static async findByUser(userId) {
        const sql = `
            SELECT h.*, v.title, v.thumbnailUrl, v.description, v.category
            FROM history h
            JOIN videos v ON h.video_id = v.id
            WHERE h.user_id = ?
            ORDER BY h.watched_at DESC
        `;
        return db.all(sql, [userId]);
    }
}

module.exports = History;
