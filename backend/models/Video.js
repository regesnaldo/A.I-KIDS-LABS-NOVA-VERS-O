const db = require('../config/db');

// Modelo de Vídeo
// Gerencia o conteúdo educacional da plataforma
class Video {
    // Inicializa a tabela de vídeos
    static async init() {
        const sql = `
            CREATE TABLE IF NOT EXISTS videos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                category TEXT, -- ex: 'ciencia', 'ia', 'matematica'
                thumbnailUrl TEXT,
                videoUrl TEXT NOT NULL,
                duration INTEGER, -- em segundos
                difficulty TEXT DEFAULT 'easy', -- 'easy', 'medium', 'hard'
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await db.run(sql);
    }

    // Cria um novo vídeo
    static async create(videoData) {
        const { title, description, category, thumbnailUrl, videoUrl, duration, difficulty } = videoData;
        const sql = `
            INSERT INTO videos (title, description, category, thumbnailUrl, videoUrl, duration, difficulty)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        return db.run(sql, [title, description, category, thumbnailUrl, videoUrl, duration, difficulty]);
    }

    // Lista todos os vídeos
    static async findAll() {
        return db.all('SELECT * FROM videos ORDER BY created_at DESC');
    }

    // Busca vídeo por ID
    static async findById(id) {
        return db.get('SELECT * FROM videos WHERE id = ?', [id]);
    }

    // Busca vídeos por categoria
    static async findByCategory(category) {
        return db.all('SELECT * FROM videos WHERE category = ?', [category]);
    }
}

module.exports = Video;
