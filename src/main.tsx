import React from 'react'
import ReactDOM from 'react-dom/client'

// 1. Dados das Temporadas (Como os filmes no vídeo)
const temporadas = [
  { id: 1, titulo: 'Invasão I.A.', cor: '#00ffff', imagem: '🚀' },
  { id: 2, titulo: 'Robôs Amigos', cor: '#ff00ff', imagem: '🤖' },
  { id: 3, titulo: 'Código Mágico', cor: '#ffff00', imagem: '✨' },
  { id: 4, titulo: 'Futuro Kids', cor: '#00ff00', imagem: '🌍' },
]

// 2. Componente de Card (Inspirado no MovieCard do vídeo)
const CardTemporada = ({ t }: { t: typeof temporadas[0] }) => (
  <div style={{
    minWidth: '250px',
    height: '150px',
    backgroundColor: '#1a1a1a',
    borderRadius: '15px',
    border: `2px solid ${t.cor}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '20px',
    cursor: 'pointer',
    transition: 'transform 0.3s',
    boxShadow: `0 0 10px ${t.cor}44`
  }}>
    <span style={{ fontSize: '40px' }}>{t.imagem}</span>
    <h3 style={{ color: 'white', marginTop: '10px' }}>{t.titulo}</h3>
  </div>
)

// 3. O Dashboard (Motor principal)
const Dashboard = () => (
  <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
    <h1 style={{ color: '#00ffff', textShadow: '0 0 20px #00ffff', marginBottom: '30px' }}>
      A.I. KIDS LABS - MÓDULOS
    </h1>
    
    {/* Carrossel Horizontal - Técnica do vídeo */}
    <div style={{
      display: 'flex',
      overflowX: 'auto',
      paddingBottom: '20px',
      scrollbarWidth: 'none', // Esconde a barra no Firefox
    }}>
      {temporadas.map(t => <CardTemporada key={t.id} t={t} />)}
    </div>

    <p style={{ color: '#555', marginTop: '20px' }}>🚀 Role para o lado para ver mais módulos!</p>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
)