const db = require('./config/db');
const User = require('./models/user');
const Video = require('./models/video');
const History = require('./models/history');
const Recommendation = require('./models/recommendation');

const seedData = async () => {
    console.log('🌱 Iniciando Seed de Dados...');

    try {
        // 1. Inicializa as tabelas
        await User.init();
        await Video.init();
        await History.init();
        await Recommendation.init();
        console.log('✅ Tabelas criadas/verificadas.');

        // 2. Limpa dados antigos (Opcional, cuidado em produção)
        // await db.run('DELETE FROM users');
        // await db.run('DELETE FROM videos');
        // await db.run('DELETE FROM history');

        // 3. Cria Usuários Fictícios
        const users = [
            { name: 'Admin User', email: 'admin@aikids.com', password: 'password123', role: 'admin' },
            { name: 'Alice Kids', email: 'alice@email.com', password: 'password123' },
            { name: 'Bob Teen', email: 'bob@email.com', password: 'password123' },
            { name: 'Charlie', email: 'charlie@email.com', password: 'password123' },
            { name: 'Diana', email: 'diana@email.com', password: 'password123' }
        ];

        for (const u of users) {
            // Verifica se já existe para não duplicar erro
            const exists = await User.findByEmail(u.email);
            if (!exists) {
                await User.create(u);
                console.log(`👤 Usuário criado: ${u.name}`);
            }
        }

        // 4. Cria Vídeos Fictícios (Conteúdo Educativo)
        const videos = [
            {
                title: 'Introdução à IA',
                description: 'O que é Inteligência Artificial e como ela funciona?',
                category: 'ia',
                thumbnailUrl: 'https://img.youtube.com/vi/JMUxmLyrhSk/hqdefault.jpg',
                videoUrl: 'https://www.youtube.com/embed/JMUxmLyrhSk',
                duration: 600,
                difficulty: 'easy'
            },
            {
                title: 'Como os Robôs Pensam?',
                description: 'Lógica de programação para crianças.',
                category: 'robotica',
                thumbnailUrl: 'https://img.youtube.com/vi/8j0UDiN7my4/hqdefault.jpg',
                videoUrl: 'https://www.youtube.com/embed/8j0UDiN7my4',
                duration: 450,
                difficulty: 'easy'
            },
            {
                title: 'Python para Iniciantes',
                description: 'Seu primeiro código em Python.',
                category: 'programacao',
                thumbnailUrl: 'https://img.youtube.com/vi/rfscVS0vtbw/hqdefault.jpg',
                videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
                duration: 1200,
                difficulty: 'medium'
            },
            {
                title: 'O Universo dos Dados',
                description: 'Entendendo Big Data de forma simples.',
                category: 'dados',
                thumbnailUrl: 'https://img.youtube.com/vi/b71idNfCj8s/hqdefault.jpg',
                videoUrl: 'https://www.youtube.com/embed/b71idNfCj8s',
                duration: 800,
                difficulty: 'medium'
            },
            {
                title: 'Redes Neurais Explicadas',
                description: 'Como o cérebro do computador aprende.',
                category: 'ia',
                thumbnailUrl: 'https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg',
                videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
                duration: 900,
                difficulty: 'hard'
            },
            {
                title: 'Matemática Divertida',
                description: 'Truques matemáticos que parecem mágica.',
                category: 'matematica',
                thumbnailUrl: 'https://img.youtube.com/vi/47b85gJk88E/hqdefault.jpg',
                videoUrl: 'https://www.youtube.com/embed/47b85gJk88E',
                duration: 300,
                difficulty: 'easy'
            },
            {
                title: 'Sistema Solar 3D',
                description: 'Viagem pelos planetas.',
                category: 'ciencia',
                thumbnailUrl: 'https://img.youtube.com/vi/libKVRa01L8/hqdefault.jpg',
                videoUrl: 'https://www.youtube.com/embed/libKVRa01L8',
                duration: 600,
                difficulty: 'easy'
            },
            {
                title: 'Criando um Jogo no Scratch',
                description: 'Tutorial passo a passo.',
                category: 'programacao',
                thumbnailUrl: 'https://img.youtube.com/vi/F9w3a9Gv5kQ/hqdefault.jpg',
                videoUrl: 'https://www.youtube.com/embed/F9w3a9Gv5kQ',
                duration: 1500,
                difficulty: 'medium'
            },
            {
                title: 'História da Computação',
                description: 'De onde vieram os computadores?',
                category: 'historia',
                thumbnailUrl: 'https://img.youtube.com/vi/O5nskjZ_GoI/hqdefault.jpg',
                videoUrl: 'https://www.youtube.com/embed/O5nskjZ_GoI',
                duration: 700,
                difficulty: 'medium'
            },
            {
                title: 'Machine Learning na Prática',
                description: 'Treinando sua primeira IA.',
                category: 'ia',
                thumbnailUrl: 'https://img.youtube.com/vi/KNAWp2S3w94/hqdefault.jpg',
                videoUrl: 'https://www.youtube.com/embed/KNAWp2S3w94',
                duration: 1800,
                difficulty: 'hard'
            }
        ];

        // Verifica se já existem vídeos para não duplicar
        const existingVideos = await Video.findAll();
        if (existingVideos.length === 0) {
            for (const v of videos) {
                await Video.create(v);
            }
            console.log(`🎥 ${videos.length} vídeos inseridos.`);
        } else {
            console.log('ℹ️ Vídeos já existem no banco.');
        }

        // 5. Cria Histórico Simulado (Alice assistiu IA e Robótica)
        const alice = await User.findByEmail('alice@email.com');
        const allVideos = await Video.findAll();
        
        if (alice && allVideos.length > 0) {
            // Alice assistiu o vídeo 1 (IA) completo
            await History.upsert({
                userId: alice.id,
                videoId: allVideos[0].id,
                progress: 100,
                completed: true
            });
            
            // Alice assistiu o vídeo 2 (Robótica) pela metade
            await History.upsert({
                userId: alice.id,
                videoId: allVideos[1].id,
                progress: 50,
                completed: false
            });
            console.log('📜 Histórico simulado para Alice criado.');
        }

        console.log('🚀 Seed concluído com sucesso!');
        process.exit(0);

    } catch (err) {
        console.error('❌ Erro no seed:', err);
        process.exit(1);
    }
};

seedData();
