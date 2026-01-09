import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Module from '../components/Module';
import { vi } from 'vitest';

// Mock child components with dynamic behavior support
const mockVideoPlayer = vi.fn();
const mockQuiz = vi.fn();

vi.mock('../components/VideoPlayer', () => ({
  default: (props: { onVideoComplete: () => void, onProgressUpdate: (p: number) => void }) => {
    mockVideoPlayer(props);
    return (
      <div data-testid="video-player">
        <button onClick={() => props.onProgressUpdate(50)}>Progress 50%</button>
        <button onClick={props.onVideoComplete}>Complete Video</button>
      </div>
    );
  },
}));

vi.mock('../components/Quiz', () => ({
  default: (props: { onSubmit: (a: string[], s: number) => void, onCancel: () => void }) => {
    mockQuiz(props);
    return (
      <div data-testid="quiz">
        <button onClick={() => props.onSubmit(['answer'], 100)}>Finish Quiz 100</button>
        <button onClick={() => props.onSubmit(['answer'], 80)}>Finish Quiz 80</button>
        <button onClick={() => props.onSubmit(['answer'], 60)}>Finish Quiz 60</button>
        <button onClick={props.onCancel}>Cancel Quiz</button>
      </div>
    );
  },
}));

describe('Module Component', () => {
  const mockModule = {
    id: 'mod1',
    title: 'Test Module',
    description: 'Desc',
    ageRange: '5-7',
    difficulty: 'easy',
    duration: '10m',
    videoUrl: 'vid.mp4',
    thumbnailUrl: 'thumb.jpg',
    phase: 1,
    seasonId: 's1',
    quizzes: [],
    progress: 0,
    isCompleted: false,
    videoWatched: false,
    starsEarned: 0,
  };

  const mockOnProgressUpdate = vi.fn();

  beforeEach(() => {
    mockOnProgressUpdate.mockClear();
    mockVideoPlayer.mockClear();
    mockQuiz.mockClear();
  });

  it('renders correctly', () => {
    render(<Module module={mockModule} onProgressUpdate={mockOnProgressUpdate} />);
    expect(screen.getByText('Test Module')).toBeInTheDocument();
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
  });

  it('shows quiz button only after video complete', () => {
    render(<Module module={mockModule} onProgressUpdate={mockOnProgressUpdate} />);
    expect(screen.queryByText('📝 Fazer Quiz')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Complete Video'));
    
    expect(screen.getByText('📝 Fazer Quiz')).toBeInTheDocument();
  });

  it('starts and completes quiz with 100 score (3 stars)', () => {
    render(<Module module={{ ...mockModule, videoWatched: true }} onProgressUpdate={mockOnProgressUpdate} />);
    
    fireEvent.click(screen.getByText('📝 Fazer Quiz'));
    expect(screen.getByTestId('quiz')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Finish Quiz 100'));
    expect(screen.getByText('🎉 Módulo Concluído!')).toBeInTheDocument();
    expect(mockOnProgressUpdate).toHaveBeenCalledWith('mod1', 100, true);
    // Check stars visual representation roughly or implementation detail?
    // The text contains stars.
  });

  it('completes quiz with 80 score (2 stars)', () => {
    render(<Module module={{ ...mockModule, videoWatched: true }} onProgressUpdate={mockOnProgressUpdate} />);
    fireEvent.click(screen.getByText('📝 Fazer Quiz'));
    fireEvent.click(screen.getByText('Finish Quiz 80'));
    expect(screen.getByText('🎉 Módulo Concluído!')).toBeInTheDocument();
  });

  it('completes quiz with 60 score (1 star)', () => {
    render(<Module module={{ ...mockModule, videoWatched: true }} onProgressUpdate={mockOnProgressUpdate} />);
    fireEvent.click(screen.getByText('📝 Fazer Quiz'));
    fireEvent.click(screen.getByText('Finish Quiz 60'));
    expect(screen.getByText('🎉 Módulo Concluído!')).toBeInTheDocument();
  });
  
  it('cancels quiz', () => {
    render(<Module module={{ ...mockModule, videoWatched: true }} onProgressUpdate={mockOnProgressUpdate} />);
    fireEvent.click(screen.getByText('📝 Fazer Quiz'));
    fireEvent.click(screen.getByText('Cancel Quiz'));
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
  });

  it('renders completed view initially if module is completed', () => {
    render(<Module module={{ ...mockModule, isCompleted: true }} onProgressUpdate={mockOnProgressUpdate} />);
    expect(screen.getByText('🎉 Módulo Concluído!')).toBeInTheDocument();
  });

  it('handles continue button', () => {
    render(<Module module={{ ...mockModule, isCompleted: true }} onProgressUpdate={mockOnProgressUpdate} />);
    fireEvent.click(screen.getByText('Continuar Aprendendo'));
    expect(screen.getByText('🎉 Módulo Concluído!')).toBeInTheDocument();
  });
});
