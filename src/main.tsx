import React from 'react';
import ReactDOM from 'react-dom/client';
import './neon-styles.css';

// Estrutura dos 50 Cards - Missões A.I. KIDS LABS
const missions = [
  { id: 1, title: "Fábrica de Monstros", icon: "👾", desc: "Crie criaturas usando IA generativa.", cat: "Arte" },
  { id: 2, title: "Tradutor de Emojis", icon: "🤖", desc: "Transforme frases em códigos de emojis.", cat: "Lógica" },
  { id: 3, title: "Avatar Galáctico", icon: "👨‍🚀", desc: "Crie a sua versão no espaço com 1 clique.", cat: "Arte" },
  { id: 4, title: "Mestre dos Códigos", icon: "💻", desc: "Dê ordens simples para o computador.", cat: "Code" },
  { id: 5, title: "Histórias Mágicas", icon: "📚", desc: "Escreva um livro inteiro com ajuda da IA.", cat: "Texto" },
  { id: 6, title: "Detetive de Plantas", icon: "🌿", desc: "Identifique qualquer planta pela foto.", cat: "Utilidade" },
  { id: 7, title: "DJ do Futuro", icon: "🎧", desc: "Crie batidas de música usando apenas texto.", cat: "Som" },
  { id: 8, title: "Cardápio Digital", icon: "🍔", desc: "Crie apps de comida para o seu bairro.", cat: "Negócio" },
  { id: 9, title: "Agenda Inteligente", icon: "📅", desc: "Organize o seu dia de forma automática.", cat: "Utilidade" },
  { id: 10, title: "Pintura Viva", icon: "🎨", desc: "Transforme rabiscos em arte realista.", cat: "Arte" },
  // ... Gerando mais 40 missões variadas para completar 50
  ...Array.from({ length: 40 }, (_, i) => ({
    id: i + 11,
    title: `Missão Nível ${i + 11}`,
    icon: ["🚀", "🧪", "🦾", "🌌", "🧠"][i % 5],
    desc: "Desbloqueie novas habilidades de IA generativa neste módulo.",
    cat: "Avançado"
  }))
];

const AIStudioPortal = () => {
  return (
    <div className="app-container" style={{ padding: '20px', color: 'white' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="neon-text" style={{ fontSize: '3rem', fontFamily: 'Orbitron' }}>A.I. KIDS LABS</h1>
        <p style={{ color: '#ccc' }}>Domine o Futuro: Da criatividade aos negócios [7 a 99 anos]</p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        {missions.map((m) => (
          <div key={m.id} className="glass" style={{ 
            padding: '20px', 
            borderRadius: '15px', 
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            transition: '0.3s'
          }}>
            <span style={{ fontSize: '2rem' }}>{m.icon}</span>
            <h3 style={{ margin: '10px 0', color: '#a855f7' }}>{m.id}. {m.title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#aaa' }}>{m.desc}</p>
            <div style={{ 
              marginTop: '15px', 
              fontSize: '0.7rem', 
              background: '#3b82f6', 
              display: 'inline-block', 
              padding: '2px 8px', 
              borderRadius: '10px' 
            }}>{m.cat}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AIStudioPortal />
  </React.StrictMode>
);