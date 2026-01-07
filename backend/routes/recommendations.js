const express = require('express');
const router = express.Router();
const Recommendation = require('../models/recommendation');
const auth = require('../middleware/auth');

// @route   GET /api/recommendations
// @desc    Obter recomendações personalizadas para o usuário logado
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        // Gera recomendações dinamicamente baseadas no ID do usuário
        const recommendations = await Recommendation.generateForUser(req.user.id);
        
        // Retorna JSON estruturado
        res.json({
            userId: req.user.id,
            generatedAt: new Date(),
            source: 'ai_engine_v1_mock', // Identificador da versão do algoritmo
            data: recommendations
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao gerar recomendações.');
    }
});

module.exports = router;
