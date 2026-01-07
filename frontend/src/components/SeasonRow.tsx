import React from 'react';
import VideoCard, { MissionModule } from './VideoCard';

interface SeasonRowProps {
    title: string;
    videos: MissionModule[];
    onPlay: (module: MissionModule) => void;
    level?: string; // Propriedade opcional para evitar erros se for passada
}

const SeasonRow: React.FC<SeasonRowProps> = ({ title, videos, onPlay, level }) => {
    return (
        <div className="season-row">
            <h2 className="season-title">
                {title} 
                {level && <span style={{fontSize: '0.8rem', marginLeft: '10px', opacity: 0.7}}>({level})</span>}
            </h2>
            <div className="row-container">
                {videos.map(module => (
                    <VideoCard 
                        key={module.id} 
                        module={module} 
                        onPlay={onPlay} 
                    />
                ))}
            </div>
        </div>
    );
};

export default SeasonRow;
