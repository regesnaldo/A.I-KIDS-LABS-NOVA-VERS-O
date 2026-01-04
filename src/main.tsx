import React from 'react';
import ReactDOM from 'react-dom/client';
import './neon-styles.css';

const missions = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `LAB ${i + 1}`,
  icon: "🚀"
}));

const AIStudioPortal = () => (
  <div className="portal-container">
    <h1 className="neon-header" style={{ fontSize: '5rem', fontWeight: 900 }}>A.I. KIDS LABS</h1>
    
    {/* GRID 5 COLUNAS - NETFLIX FUTURISTA */}
    <div className="mission-grid">
      {missions.map((m) => (
        <div key={m.id} className="card-dna">
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '20px',
            filter: 'drop-shadow(0 0 10px rgba(124, 58, 237, 0.5))'
          }}>{m.icon}</div>
          <h2 style={{ 
            fontSize: '1.8rem', 
            color: 'white',
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 900,
            letterSpacing: '0.05em',
            textShadow: '0 0 15px rgba(124, 58, 237, 0.6)',
            marginBottom: '12px'
          }}>{m.title}</h2>
          <p style={{ 
            color: '#9ca3af', 
            fontSize: '1rem', 
            marginTop: '8px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500
          }}>
            Missão Generativa
          </p>
        </div>
      ))}
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AIStudioPortal /></React.StrictMode>
);