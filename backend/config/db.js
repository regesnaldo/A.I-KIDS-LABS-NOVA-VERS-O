const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Configuração do ambiente
const ENV = process.env.NODE_ENV || 'development';
const DB_PATH = process.env.DB_PATH || path.resolve(__dirname, '../database.sqlite');

// Logging detalhado para debug
const log = (msg) => {
    if (ENV === 'development') {
        console.log(`[DB] ${new Date().toISOString()} - ${msg}`);
    }
};

// Garante que o diretório do banco existe
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    log(`Diretório criado: ${dbDir}`);
}

// Criação da conexão com o banco
// Utiliza SQLite para facilidade de uso local, mas a estrutura permite migração futura
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('[DB] Erro ao conectar ao banco de dados:', err.message);
    } else {
        log(`Conectado ao banco de dados SQLite em: ${DB_PATH}`);
    }
});

// Habilita chaves estrangeiras (Foreign Keys) no SQLite
db.run('PRAGMA foreign_keys = ON');

// Wrapper para Promessas (facilita async/await e futura migração para NoSQL/ORM)
// Mantém a interface de uso similar, permitindo trocar o 'db.run/get/all' por chamadas Mongoose/Sequelize futuramente
const dbAsync = {
    run: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            log(`Executando: ${sql} | Params: ${JSON.stringify(params)}`);
            db.run(sql, params, function (err) {
                if (err) {
                    console.error('[DB] Erro na query:', err.message);
                    reject(err);
                } else {
                    resolve({ id: this.lastID, changes: this.changes });
                }
            });
        });
    },
    get: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            log(`Buscando (get): ${sql} | Params: ${JSON.stringify(params)}`);
            db.get(sql, params, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },
    all: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            log(`Listando (all): ${sql} | Params: ${JSON.stringify(params)}`);
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },
    close: () => {
        return new Promise((resolve, reject) => {
            db.close((err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
};

module.exports = dbAsync;
