import React from 'react';

export interface MissionModule {
    id: string;
    title: string;
    thumbnailUrl: string;
    videoUrl: string;
    videoPlaceholder?: string; // Fallback
    description: string;
    seasonId: string;
    difficulty: 'easy' | 'medium' | 'hard';
    duration: string;
    category: string;
    state?: 'locked' | 'available' | 'completed';
    progress?: number;
}

interface VideoCardProps {
    module: MissionModule;
    onPlay: (module: MissionModule) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ module, onPlay }) => {
    return (
        <div 
            className="video-card" 
            onClick={() => onPlay(module)}
        >
            <div className="card-image-wrapper">
                <img 
                    src={module.thumbnailUrl} 
                    alt={module.title} 
                    onError={(e) => {
                        e.currentTarget.src = '/assets/modules/season-01.svg'; // Fallback
                    }}
                />
                <div className="play-icon">▶</div>
            </div>
            <div className="card-info">
                <h3>{module.title}</h3>
                <div className="card-meta">
                    <span className="duration">{module.duration}</span>
                    <span className={`difficulty ${module.difficulty}`}>
                        {module.difficulty === 'easy' ? 'Fácil' : module.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
