import React, { useState, useEffect } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  onProgressUpdate: (progress: number) => void;
  onVideoComplete: () => void;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoUrl, 
  thumbnailUrl, 
  onProgressUpdate, 
  onVideoComplete,
  title 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Simulate video loading and playback
  useEffect(() => {
    // Simulate loading time
    const loadTimer = setTimeout(() => {
      setVideoLoaded(true);
      setShowPlaceholder(false);
    }, 1500);

    let progressInterval: ReturnType<typeof setInterval> | null = null;
    
    if (isPlaying) {
      progressInterval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          const newProgress = (newTime / 300) * 100; // Assuming 5 min video for demo
          
          setProgress(Math.min(newProgress, 100));
          onProgressUpdate(Math.min(newProgress, 100));
          
          if (newTime >= 300) { // 5 minutes in seconds
            if (progressInterval) clearInterval(progressInterval);
            onVideoComplete();
            setIsPlaying(false);
            return 300;
          }
          
          return newTime;
        });
      }, 1000); // Update every second
    }

    return () => {
      clearTimeout(loadTimer);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentTime(0);
    setProgress(0);
    setIsPlaying(false);
    onProgressUpdate(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-player-container">
      <div className="video-player-wrapper">
        {showPlaceholder ? (
          <div className="video-placeholder">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Carregando vídeo...</p>
            </div>
          </div>
        ) : (
          <div className="actual-video-content">
            <div className="video-display">
              <div className="placeholder-video">
                <div className="video-thumbnail" style={{ backgroundImage: `url(${thumbnailUrl})` }}>
                  <div className="play-overlay">
                    <div className="play-button" onClick={isPlaying ? handlePause : handlePlay}>
                      {isPlaying ? '⏸️' : '▶️'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="video-controls">
                <div className="progress-container">
                  <div 
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="time-info">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(300)}</span>
                </div>
              </div>
              
              <div className="control-buttons">
                <button 
                  className="play-pause-btn" 
                  onClick={isPlaying ? handlePause : handlePlay}
                >
                  {isPlaying ? '⏸️ Pausar' : '▶️ Assistir'}
                </button>
                <button className="reset-btn" onClick={handleReset}>
                  ↺ Reiniciar
                </button>
              </div>
            </div>
            
            <div className="video-info">
              <h3>{title}</h3>
              <p>Este é um vídeo educativo sobre o tema abordado no módulo.</p>
              <div className="video-stats">
                <span>🎯 Progresso: {Math.round(progress)}%</span>
                <span>⏱️ Tempo: {formatTime(currentTime)}/05:00</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;