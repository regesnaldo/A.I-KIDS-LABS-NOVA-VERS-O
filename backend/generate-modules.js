const fs = require('fs');

// Read the existing modules file
let content = fs.readFileSync('data/modules.json', 'utf8');
content = content.trim();

// Remove the closing bracket to append more modules
if (content.endsWith(']')) {
  content = content.slice(0, -1); // Remove closing bracket
}
fs.writeFileSync('data/modules.json', content);

// Generate modules 11-50
for (let i = 11; i <= 50; i++) {
  const phase = Math.floor((i - 1) / 10) + 1;
  let ageGroup = '8-10';
  if (phase >= 3) ageGroup = '8-10';
  if (phase >= 5) ageGroup = '11-12';
  
  let difficulty = 'easy';
  if (phase >= 3) difficulty = 'medium';
  if (phase >= 5) difficulty = 'hard';
  
  const newModule = {
    id: `module-${String(i).padStart(3, '0')}`,
    title: `Módulo ${i}: Tema Educacional Avançado`,
    ageGroup,
    difficulty,
    videoPlaceholder: `/videos/module-${String(i).padStart(3, '0')}.mp4`,
    thumbnail: `/images/module-${String(i).padStart(3, '0')}-thumb.jpg`,
    description: `Conteúdo educacional avançado para a fase ${phase} - Explorando conceitos de IA, robótica e programação`,
    duration: `${Math.floor(Math.random() * 5) + 8} min`,
    phase,
    seasonId: `season-${String(Math.floor((i-1)/5) + 1).padStart(2, '0')}`,
    quiz: [
      {
        question: `Pergunta do módulo ${i}: Qual é a importância deste conceito?`,
        type: 'multipleChoice',
        options: [
          { text: 'Opção A', isCorrect: false },
          { text: 'Opção B', isCorrect: Math.random() > 0.5 },
          { text: 'Opção C', isCorrect: false },
          { text: 'Opção D', isCorrect: false }
        ],
        answer: 'Opção B',
        difficulty: difficulty
      },
      {
        question: `Este conceito é útil na prática?`,
        type: 'trueFalse',
        answer: true,
        correct: true,
        difficulty: 'easy'
      }
    ],
    badges: [
      {
        id: `badge-${String(i).padStart(3, '0')}`,
        name: `Conquistador do Módulo ${i}`,
        description: `Completou o módulo ${i} com sucesso`,
        icon: ['🏆', '🎯', '🌟', '🎓', '💎'][Math.floor(Math.random() * 5)]
      }
    ],
    skills: ['Aprendizado', 'Raciocínio Lógico', 'Tecnologia'],
    tags: ['educação', 'ia', 'tecnologia'],
    prerequisites: [`module-${String(Math.max(1, i-5)).padStart(3, '0')}`],
    learningObjectives: [`Aprender conceitos avançados`, `Aplicar conhecimentos`]
  };
  
  // Add comma separator if not the first module being added
  if (i > 11) fs.appendFileSync('data/modules.json', ',');
  
  // Append the new module
  fs.appendFileSync('data/modules.json', '\n  ' + JSON.stringify(newModule, null, 2));
}

// Close the array
fs.appendFileSync('data/modules.json', '\n]');
console.log('Generated modules 11-50. Total modules: 50');