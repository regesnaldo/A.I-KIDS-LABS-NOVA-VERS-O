import React from 'react'
import ReactDOM from 'react-dom/client'

// Código de segurança para limpar erros e testar o caminho ZERO (0)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ 
      backgroundColor: '#0a0a0a', 
      color: '#00ffff', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ textShadow: '0 0 20px #00ffff', fontSize: '50px' }}>A.I. KIDS LABS</h1>
      <p style={{ color: '#ff00ff', fontSize: '20px' }}>🚀 O CAMINHO COM ZERO (0) FOI ATIVADO!</p>
      <p style={{ color: 'white' }}>Se você ver esta tela no GitHub, matamos a tela preta.</p>
    </div>
  </React.StrictMode>
)