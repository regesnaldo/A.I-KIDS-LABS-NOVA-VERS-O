const express = require('express');
const router = express.Router();
const History = require('../models/history');
const auth = require('../middleware/auth');

// @route   GET /api/history
// @desc    Obter histórico de visualização do usuário logado
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const history = await History.findByUser(req.user.id);
        res.json(history);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao buscar histórico.');
    }
});

// @route   POST /api/history
// @desc    Salvar progresso de um vídeo
// @access  Private
router.post('/', auth, async (req, res) => {
    const { videoId, progress, completed } = req.body;

    try {
        await History.upsert({
            userId: req.user.id,
            videoId,
            progress,
            completed
        });
        res.json({ msg: 'Histórico atualizado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao atualizar histórico.');
    }
});

module.exports = router;
