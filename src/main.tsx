import React from 'react'
import ReactDOM from 'react-dom/client'
import './neon-styles.css'
import RecommendationEngine from './components/RecommendationEngine';
import ChatAssistant from './components/ChatAssistant';
import VideoPlayer from './components/VideoPlayer';

console.log(import.meta.env.VITE_API_URL);
// Tipos para as fases pedagógicas
type PedagogicalPhase = 1 | 2 | 3 | 4 | 5;

// Interface para temporadas
interface Season {
  id: string;
  order: number;
  title: string;
  phase: PedagogicalPhase;
  description: string;
  ageRange: string;
  status: 'draft' | 'published' | 'archived';
  coverImage?: string;
  featured?: boolean;
}

// Interface para módulos de missão
interface MissionModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  seasonId: string;
  state: 'locked' | 'available' | 'completed';
}

// Dados das temporadas
const seasons: Season[] = [
  {
    id: 'season-001',
    order: 1,
    title: 'Temporada 01',
    phase: 1,
    description: 'Introdução à lógica de programação',
    ageRange: '6+',
    status: 'published',
    coverImage: '/images/season-001-cover.jpg',
    featured: true
  },
  {
    id: 'season-002',
    order: 2,
    title: 'Temporada 02',
    phase: 1,
    description: 'Conceitos básicos de matemática',
    ageRange: '6+',
    status: 'published',
    coverImage: '/images/season-002-cover.jpg',
    featured: false
  },
  {
    id: 'season-003',
    order: 3,
    title: 'Temporada 03',
    phase: 2,
    description: 'Lógica e raciocínio lógico',
    ageRange: '7+',
    status: 'published',
    coverImage: '/images/season-003-cover.jpg',
    featured: false
  },
  {
    id: 'season-004',
    order: 4,
    title: 'Temporada 04',
    phase: 2,
    description: 'Geometria e formas',
    ageRange: '7+',
    status: 'published',
    coverImage: '/images/season-004-cover.jpg',
    featured: false
  },
  {
    id: 'season-005',
    order: 5,
    title: 'Temporada 05',
    phase: 3,
    description: 'Álgebra e padrões',
    ageRange: '8+',
    status: 'published',
    coverImage: '/images/season-005-cover.jpg',
    featured: false
  }
];

// Gerar temporadas 6-50 programaticamente
for (let i = 5; i < 49; i++) { // i = 5 to 49 corresponds to seasons 6-50
  const seasonIndex = i + 1; // This will be 6-50
  const phaseValue = Math.floor((seasonIndex - 1) / 10) + 1;
  const validPhase = Math.min(Math.max(phaseValue, 1), 5) as PedagogicalPhase;
  
  seasons.push({
    id: `season-${String(seasonIndex).padStart(3, '0')}`,
    order: seasonIndex,
    title: `Temporada ${seasonIndex.toString().padStart(2, '0')}`,
    phase: validPhase,
    description: `Conteúdo educativo avançado ${seasonIndex.toString().padStart(2, '0')}`,
    ageRange: seasonIndex > 30 ? '12+' : '9+',
    status: 'published',
    coverImage: `/images/season-${String(seasonIndex).padStart(3, '0')}-cover.jpg`,
    featured: false
  });
}

// Módulos de exemplo para cada temporada
const getMissionModules = (seasonId: string): MissionModule[] => {
  const modules: MissionModule[] = [];
  const seasonNumber = parseInt(seasonId.replace('season-', ''));
  
  for (let i = 1; i <= 5; i++) {
    modules.push({
      id: `${seasonId}-module-${i}`,
      title: `Missão ${i}`,
      description: `Conteúdo educativo da ${seasonId} - Missão ${i}`,
      duration: '10 min',
      difficulty: i <= 2 ? 'easy' : i <= 4 ? 'medium' : 'hard',
      seasonId,
      state: seasonNumber <= 2 || i <= 3 ? 'available' : 'locked'
    });
  }
  
  return modules;
};

// Componente de Card de Laboratório
const LabCard = ({ module, level, onPlay }: { module: MissionModule; level?: 'kids' | 'teens' | 'adults'; onPlay: (m: MissionModule) => void }) => {
  // Verificar se o conteúdo deve ser bloqueado por controle parental
  const isParentalLocked = module.difficulty === 'hard' && module.state !== 'completed';
  
  // Default to 'kids' if not provided
  const cardLevel = level || 'kids';
  
  return (
    <article className={`lab-card ${module.state} card-${cardLevel} ${isParentalLocked ? 'parental-locked' : ''}`} 
             tabIndex={0}
             onKeyDown={(e) => {
               if (e.key === 'Enter' || e.key === ' ') {
                 e.preventDefault();
                 // Lógica para interação via teclado
               }
             }}>
      <h3 className="card-title">{module.title}</h3>
      
      <div className="card-overlay">
        <div className="card-actions">
          <button className="btn-play" onClick={() => onPlay(module)}>▶ Assistir</button>
          <button className="btn-like">ℹ️ Mais Informações</button>
        </div>
        
        <div className="card-meta">
          <span className="duration">⏱️ {module.duration}</span>
          <span className={`difficulty ${module.difficulty}`}>
            {module.difficulty === 'easy' ? '🟢 Fácil' : 
             module.difficulty === 'medium' ? '🟡 Médio' : '🔴 Difícil'}
          </span>
        </div>
      </div>
    </article>
  );
};

// Componente de Linha de Temporada
const SeasonRow = ({ season, onPlay }: { season: Season; onPlay: (m: MissionModule) => void }) => {
  const modules = getMissionModules(season.id);
  
  // Determine UX Level based on age range
  let level: 'kids' | 'teens' | 'adults' = 'kids';
  if (season.ageRange === '6+' || season.ageRange === '7+' || season.ageRange === '8+') {
    level = 'kids';
  } else if (season.ageRange === '9+' || season.ageRange === '12+') {
    level = 'teens';
  } else {
    level = 'adults';
  }
  
  return (
    <section className="season-container" style={{ position: 'relative', zIndex: 5, marginTop: '-50px', paddingBottom: '40px' }}>
      <h2 className="season-title" style={{ marginLeft: '4%', marginBottom: '10px', fontSize: '1.4vw', color: '#e5e5e5' }}>{season.title}</h2>
      <div className="season-row" style={{ paddingLeft: '4%' }}>
        {modules.map(module => (
          <LabCard key={module.id} module={module} level={level} onPlay={onPlay} />
        ))}
      </div>
    </section>
  );
};

// Componente Hero Section (Capa Estilo Netflix)
const HeroSection = () => {
  return (
    <>
      {/* Navbar Overlay */}
      <nav className="navbar">
        <div className="nav-logo" style={{ color: '#00ffff', textShadow: '0 0 10px rgba(0,255,255,0.7)' }}>A.I. KIDS LABS</div>
        <ul className="nav-menu">
          <li><a href="#" className="nav-link active">Início</a></li>
          <li><a href="#" className="nav-link">Séries</a></li>
          <li><a href="#" className="nav-link">Filmes</a></li>
          <li><a href="#" className="nav-link">Bombando</a></li>
          <li><a href="#" className="nav-link">Minha lista</a></li>
        </ul>
        <div className="nav-right">
          <span>🔍</span>
          <span>🔔</span>
          <div style={{ width: '30px', height: '30px', background: '#333', borderRadius: '4px' }}></div>
        </div>
      </nav>

      {/* Hero Content */}
      <header className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">A.I. KIDS LABS</h1>
          
          <div className="hero-badge">
            <div className="top-10-badge">
              TOP <span>1</span>
            </div>
            <span>em Educação Tecnológica hoje</span>
          </div>
          
          <p className="hero-description">
            Paul Bettany interpreta um padre determinado a resgatar sua sobrinha... Ops! Aqui você é o herói que domina a Inteligência Artificial para criar o futuro.
          </p>
          
          <div className="hero-buttons">
            <button className="btn-hero play">
              <span>▶</span> Assistir
            </button>
            <button className="btn-hero info">
              <span>ℹ️</span> Mais informações
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

// Componente Principal do App
const App = () => {
  const [playingModule, setPlayingModule] = React.useState<MissionModule | null>(null);

  // Filtrar apenas temporadas publicadas
  const publishedSeasons = seasons.filter(season => season.status === 'published');
  
  // Agrupar temporadas por fase pedagógica
  const seasonsByPhase = publishedSeasons.reduce((acc, season) => {
    if (!acc[season.phase]) {
      acc[season.phase] = [];
    }
    acc[season.phase].push(season);
    return acc;
  }, {} as Record<PedagogicalPhase, Season[]>);

  const handlePlay = (module: MissionModule) => {
    setPlayingModule(module);
  };

  return (
    <div className="app" style={{ backgroundColor: '#141414', minHeight: '100vh', color: 'white' }}>
      <HeroSection />
      
      <main className="main-content" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ padding: '0 4%', marginBottom: '2rem' }}>
          <RecommendationEngine />
        </div>
        <ChatAssistant />
        
        {Object.entries(seasonsByPhase).map(([phase, seasonList]) => (
          <div key={phase} className="phase-section">
             {/* Removido título da fase para ficar mais limpo estilo Netflix, ou manter discreto */}
            <div className="labs-grid">
              {seasonList.map(season => (
                <SeasonRow key={season.id} season={season} onPlay={handlePlay} />
              ))}
            </div>
          </div>
        ))}
      </main>

      {playingModule && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <button 
                onClick={() => setPlayingModule(null)} 
                style={{ position: 'absolute', top: 30, right: 30, fontSize: '2.5rem', color: 'white', background: 'none', border: 'none', cursor: 'pointer', zIndex: 1001 }}
            >
                ×
            </button>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                <VideoPlayer 
                    videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
                    title={playingModule.title}
                    onProgressUpdate={() => {}}
                    onVideoComplete={() => {}}
                />
            </div>
        </div>
      )}
    </div>
  );
};

// Renderizar o app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
