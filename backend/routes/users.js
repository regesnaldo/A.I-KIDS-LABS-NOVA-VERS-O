const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middleware/auth');

// @route   POST /api/users/register
// @desc    Registrar um novo usuário
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 1. Validação básica
        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Por favor, preencha todos os campos.' });
        }

        // 2. Verifica se usuário já existe
        let user = await User.findByEmail(email);
        if (user) {
            return res.status(400).json({ msg: 'Usuário já existe com este e-mail.' });
        }

        // 3. Cria o usuário
        const result = await User.create({ name, email, password });
        
        // 4. Gera o Token JWT para login automático após registro
        const payload = {
            user: {
                id: result.id
            }
        };

        const secret = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura_para_dev_ai_kids_labs_2024';
        
        jwt.sign(
            payload,
            secret,
            { expiresIn: '7d' }, // Token expira em 7 dias
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor ao registrar usuário.');
    }
});

// @route   POST /api/users/login
// @desc    Autenticar usuário e obter token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Verifica se o usuário existe
        let user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ msg: 'Credenciais inválidas.' });
        }

        // 2. Valida a senha
        const isMatch = await User.validatePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciais inválidas.' });
        }

        // 3. Gera o Token
        const payload = {
            user: {
                id: user.id
            }
        };

        const secret = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura_para_dev_ai_kids_labs_2024';

        jwt.sign(
            payload,
            secret,
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor ao fazer login.');
    }
});

// @route   GET /api/users/me
// @desc    Obter dados do usuário logado
// @access  Private (Requer Token)
router.get('/me', auth, async (req, res) => {
    try {
        // Busca usuário pelo ID decodificado do token, removendo a senha
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor.');
    }
});

module.exports = router;
