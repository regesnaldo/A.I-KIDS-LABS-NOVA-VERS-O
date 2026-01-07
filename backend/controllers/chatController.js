const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// Helper to get modules for context
const getModulesFromJson = () => {
  const modulesPath = path.join(__dirname, '../data/modules.json');
  try {
    const modulesData = fs.readFileSync(modulesPath, 'utf8');
    return JSON.parse(modulesData);
  } catch (error) {
    return [];
  }
};

// Persona Logic
const generateResponse = (user, message, context) => {
  const age = user.age || 10;
  let ageGroup = 'child';
  if (age >= 11 && age <= 16) ageGroup = 'youth';
  if (age >= 17) ageGroup = 'adult';

  const msg = message.toLowerCase();
  
  // Personas
  const personas = {
    child: {
      greeting: ["Oiê! 🌟 Eu sou seu amigo robô! Como posso ajudar?", "Olá explorador! Pronto para aprender algo novo?", "Oi! Vamos brincar de aprender?"],
      confusion: ["Não se preocupe! Vamos desenhar isso na imaginação. 🎨", "É normal ficar confuso. Pense nisso como um quebra-cabeça!", "Vamos tentar de novo, passo a passo, como uma receita de bolo? 🍰"],
      praise: ["Uau! Você é incrível! 🚀", "Mandou muito bem! Toca aqui! ✋", "Que inteligência! Estou orgulhoso!"],
      explain_ai: "IA é como um robô que aprende lendo livros e vendo exemplos, igual você aprende na escola!",
      fallback: "Humm, interessante! Quer saber mais sobre isso ou vamos ver um vídeo?"
    },
    youth: {
      greeting: ["E aí! Pronto para hackear o conhecimento? 💻", "Olá! Qual é a missão de hoje?", "Oi. Bora desvendar a IA?"],
      confusion: ["Tranquilo. IA tem uns conceitos complexos mesmo. Vamos debugar isso.", "Sem estresse. Vamos quebrar esse problema em partes menores.", "Bora reiniciar a explicação. Às vezes a gente precisa de um F5."],
      praise: ["Boa! Você dominou isso.", "Level Up! 🎮 Mandou bem.", "Isso aí! Raciocínio afiado."],
      explain_ai: "IA é basicamente código que usa estatística e dados para identificar padrões e tomar decisões autônomas.",
      fallback: "Saquei. Se quiser aprofundar nisso, posso te dar umas dicas extras."
    },
    adult: {
      greeting: ["Olá. Como posso auxiliar seus estudos hoje?", "Bem-vindo. Estou à disposição para tirar dúvidas sobre IA.", "Olá. Vamos avançar no seu aprendizado?"],
      confusion: ["Compreendo. Esse conceito pode ser denso. Vamos simplificar.", "Vamos revisar os fundamentos para esclarecer isso.", "Sem problemas. Posso explicar com uma analogia do mercado de trabalho."],
      praise: ["Excelente progresso.", "Muito bom. Você captou a essência do conceito.", "Correto. Está avançando bem."],
      explain_ai: "IA refere-se a sistemas computacionais capazes de realizar tarefas que normalmente exigiriam inteligência humana, baseando-se em dados.",
      fallback: "Entendido. Se tiver dúvidas específicas sobre como aplicar isso profissionalmente, é só perguntar."
    }
  };

  const currentPersona = personas[ageGroup];

  // Logic to select response
  if (msg.includes('olá') || msg.includes('oi') || msg.includes('começar')) {
    return getRandom(currentPersona.greeting);
  }
  
  if (msg.includes('não entendi') || msg.includes('difícil') || msg.includes('ajuda') || msg.includes('confuso')) {
    return getRandom(currentPersona.confusion);
  }
  
  if (msg.includes('consegui') || msg.includes('acertei') || msg.includes('termin')) {
    return getRandom(currentPersona.praise);
  }

  if (msg.includes('o que é ia') || msg.includes('o que é inteligência artificial')) {
    return currentPersona.explain_ai;
  }

  // Contextual Help based on current module
  if (context && context.moduleId) {
    const modules = getModulesFromJson();
    const currentModule = modules.find(m => m.id === context.moduleId);
    if (currentModule) {
      if (msg.includes('módulo') || msg.includes('fazer agora')) {
        return `Estamos no módulo "${currentModule.title}". ${ageGroup === 'child' ? 'É super legal!' : 'Foca no conteúdo.'} Quer uma dica?`;
      }
    }
  }

  return currentPersona.fallback;
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// @desc    Process chat message
// @route   POST /api/chat/message
// @access  Private
const chatMessage = async (req, res) => {
  try {
    const { message, context } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Simulate AI processing delay
    setTimeout(() => {
      const response = generateResponse(user, message, context);
      
      res.json({
        success: true,
        data: {
          message: response,
          timestamp: new Date()
        }
      });
    }, 1000);

  } catch (error) {
    console.error('Error in chatMessage:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

module.exports = {
  chatMessage
};
