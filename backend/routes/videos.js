const express = require('express');
const router = express.Router();
const Video = require('../models/video');
const auth = require('../middleware/auth'); // Opcional: proteger rotas se necessário

// @route   GET /api/videos
// @desc    Listar todos os vídeos
// @access  Public
router.get('/', async (req, res) => {
    try {
        const videos = await Video.findAll();
        res.json(videos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao buscar vídeos.');
    }
});

// @route   GET /api/videos/:id
// @desc    Obter detalhes de um vídeo específico
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ msg: 'Vídeo não encontrado' });
        }
        res.json(video);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao buscar vídeo.');
    }
});

// @route   POST /api/videos
// @desc    Adicionar um novo vídeo (Admin)
// @access  Private (Deveria ser admin, mas deixaremos aberto para testes ou auth simples)
router.post('/', auth, async (req, res) => {
    const { title, description, category, thumbnailUrl, videoUrl, duration, difficulty } = req.body;

    try {
        await Video.create({
            title, description, category, thumbnailUrl, videoUrl, duration, difficulty
        });
        res.status(201).json({ msg: 'Vídeo adicionado com sucesso!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao adicionar vídeo.');
    }
});

module.exports = router;
