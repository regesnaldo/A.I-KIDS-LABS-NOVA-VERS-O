import { useEffect, useState } from 'react';
import { recommendationsAPI } from '../services/api';
import LabCard from './LabCard';
import { MissionModule } from '../types';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<MissionModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await recommendationsAPI.getRecommendations();
        // Se a API retornar um objeto com 'data', usamos ele, senão usamos o array direto
        const modules = data.data || data; 
        
        // Mapear para o formato MissionModule se necessário
        // Aqui assumimos que o backend já retorna compatível ou fazemos adapter
        setRecommendations(Array.isArray(modules) ? modules : []);
      } catch (error) {
        console.error("Erro ao carregar recomendações:", error);
        // Fallback mock se falhar
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <div style={{ color: 'white', padding: '20px' }}>Carregando recomendações...</div>;
  if (recommendations.length === 0) return null;

  return (
    <div className="recommendations-section" style={{ padding: '20px 4%' }}>
      <h2 style={{ 
        color: '#e5e5e5', 
        marginBottom: '20px',
        fontSize: '1.4vw',
        fontWeight: 'bold'
      }}>
        Recomendados para Você
      </h2>
      <div className="recommendations-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {recommendations.map((module: any) => (
          // Adapter simples para garantir compatibilidade com LabCard
          <LabCard 
            key={module.id} 
            module={{
              id: module.id,
              title: module.title,
              description: module.description || '',
              thumbnailUrl: module.thumbnailUrl,
              videoUrl: module.videoUrl,
              duration: module.duration ? `${Math.floor(module.duration/60)}m` : '10m',
              difficulty: module.difficulty || 'easy',
              state: 'locked', // Default state
              seasonId: 'rec',
              category: module.category || 'ia'
            }} 
            onPlay={() => console.log('Play recomendação', module.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
