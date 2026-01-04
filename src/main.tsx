import React from 'react';
import ReactDOM from 'react-dom/client';
import './neon-styles.css';

const missions = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `LAB ${i + 1}`,
  icon: "🚀"
}));

const AIStudioPortal = () => (
  <div className="container" style={{ minHeight: '100vh', paddingBottom: '50px' }}>
    <h1 className="neon-title" style={{ fontSize: '4rem' }}>A.I. KIDS LABS</h1>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(5, 1fr)', /* 5 Colunas [cite: 2025-12-23] */
      gap: '20px', 
      justifyItems: 'center' 
    }}>
      {missions.map((m) => (
        <div key={m.id} className="card">
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{m.icon}</div>
          <h2 style={{ fontSize: '1.2rem', color: 'white' }}>{m.title}</h2>
          <p style={{ color: '#a78bfa', fontSize: '0.8rem', marginTop: '10px' }}>Missão Generativa</p>
        </div>
      ))}
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AIStudioPortal /></React.StrictMode>
);