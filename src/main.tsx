import React from 'react';
import ReactDOM from 'react-dom/client';
import { seasons } from './data/seasons';

const AIStudioPortal = () => (
  <main className="app">
    <h1 className="title">A.I. KIDS LABS</h1>
    
    {/* GRADE DE TEMPORADAS - LAYOUT NETFLIX */}
    <section className="labs-grid">
      {seasons.map((season) => (
        <div key={season.id}>
          <h2 style={{ 
            color: '#7c3aed', 
            fontSize: '1.5rem', 
            fontWeight: 700,
            fontFamily: 'Orbitron, sans-serif',
            marginBottom: '15px',
            textShadow: '0 0 10px rgba(124, 58, 237, 0.5)'
          }}>{season.title}</h2>
          
          <section className="season-row">
            {season.modules.map((module) => (
              <article className="lab-card" key={module.id}>
                <div style={{ 
                  fontSize: '4rem', 
                  marginBottom: '20px',
                  filter: 'drop-shadow(0 0 10px rgba(124, 58, 237, 0.5))'
                }}>{module.icon}</div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  color: 'white',
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 900,
                  letterSpacing: '0.05em',
                  textShadow: '0 0 15px rgba(124, 58, 237, 0.6)',
                  marginBottom: '12px'
                }}>{module.title}</h2>
                <p style={{ 
                  color: '#9ca3af', 
                  fontSize: '1rem', 
                  marginTop: '8px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  lineHeight: '1.4'
                }}>
                  {module.desc}
                </p>
              </article>
            ))}
          </section>
        </div>
      ))}
    </section>
  </main>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AIStudioPortal /></React.StrictMode>
);
