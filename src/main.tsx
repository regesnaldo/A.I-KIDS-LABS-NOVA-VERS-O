import React from 'react';
import ReactDOM from 'react-dom/client';
import './neon-styles.css';

const missions = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `LAB ${i + 1}`,
  category: i % 2 === 0 ? "INTELIGÊNCIA" : "CRIATIVIDADE"
}));

const AIStudioPortal = () => (
  <div className="app-container">
    <header style={{ textAlign: 'center', marginBottom: '80px' }}>
      <h1 className="neon-title" style={{ fontSize: 'clamp(2rem, 8vw, 5rem)' }}>A.I. KIDS LABS</h1>
      <p style={{ color: '#a78bfa', fontWeight: 'bold' }}>DESPERTE O GÊNIO DIGITAL</p>
    </header>

    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
      gap: '25px', width: '100%' 
    }}>
      {missions.map((m) => (
        <div key={m.id} className="netflix-card" style={{ borderRadius: '15px', padding: '30px' }}>
          <div style={{ opacity: 0.3, fontSize: '0.8rem', fontWeight: 'bold' }}>{m.category}</div>
          <h2 style={{ fontSize: '1.8rem', margin: '15px 0' }}>{m.title}</h2>
          <div style={{ height: '4px', width: '40px', background: '#7c3aed', borderRadius: '2px' }}></div>
          <p style={{ marginTop: '20px', color: '#94a3b8', fontSize: '0.9rem' }}>Toque para iniciar esta missão generativa.</p>
        </div>
      ))}
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><AIStudioPortal /></React.StrictMode>);