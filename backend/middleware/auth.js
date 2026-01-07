const jwt = require('jsonwebtoken');

// Middleware de Autenticação
// Protege rotas sensíveis verificando o token JWT no header 'Authorization'
const auth = (req, res, next) => {
    // 1. Obtém o token do header
    const authHeader = req.header('Authorization');

    // Verifica se o token existe
    if (!authHeader) {
        return res.status(401).json({ msg: 'Acesso negado. Token não fornecido.' });
    }

    // O formato esperado é "Bearer <token>"
    const token = authHeader.replace('Bearer ', '');

    try {
        // 2. Verifica a validade do token usando a chave secreta
        // Em produção, use process.env.JWT_SECRET
        const secret = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura_para_dev_ai_kids_labs_2024';
        const decoded = jwt.verify(token, secret);

        // 3. Adiciona o usuário decodificado ao objeto da requisição
        // Isso permite que as rotas acessem req.user.id
        req.user = decoded.user;
        
        next(); // Passa para o próximo middleware ou rota
    } catch (err) {
        console.error('Erro na validação do token:', err.message);
        res.status(401).json({ msg: 'Token inválido ou expirado.' });
    }
};

module.exports = auth;
