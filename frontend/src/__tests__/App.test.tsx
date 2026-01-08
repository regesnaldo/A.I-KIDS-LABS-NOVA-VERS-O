import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import * as api from '../services/api';

// Mock child components to isolate App
vi.mock('../components/Navbar', () => ({ default: () => <div data-testid="navbar">Navbar</div> }));
vi.mock('../components/Recommendations', () => ({ default: () => <div data-testid="recommendations">Recommendations</div> }));
vi.mock('../components/ChatAssistant', () => ({ default: () => <div data-testid="chat-assistant">ChatAssistant</div> }));
vi.mock('../components/VideoPlayer', () => ({ default: () => <div data-testid="video-player">VideoPlayer</div> }));
vi.mock('../components/Login', () => ({ default: ({ onLogin }: any) => <button onClick={() => onLogin({ name: 'Test User' })} data-testid="login-btn">Login</button> }));
vi.mock('../components/SeasonRow', () => ({ default: () => <div data-testid="season-row">SeasonRow</div> }));
vi.mock('../components/HeroSection', () => ({ default: () => <div data-testid="hero-section">HeroSection</div> }));

// Mock API
vi.mock('../services/api', () => ({
  modulesAPI: {
    getAllModules: vi.fn(),
  }
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders Login when no user is logged in', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByTestId('login-btn')).toBeInTheDocument();
  });

  it('renders Dashboard when user logs in', async () => {
    // Mock successful API response
    (api.modulesAPI.getAllModules as any).mockResolvedValue({
      success: true,
      data: [
        { id: '1', title: 'Module 1', seasonId: 'season-01', thumbnail: 'test.jpg' }
      ]
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Click login
    const loginBtn = screen.getByTestId('login-btn');
    loginBtn.click();

    // Wait for dashboard elements
    await waitFor(() => {
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    });
  });

  it('renders Dashboard when user is already in localStorage', async () => {
     localStorage.setItem('user', JSON.stringify({ name: 'Stored User' }));
     localStorage.setItem('token', 'fake-token');

     (api.modulesAPI.getAllModules as any).mockResolvedValue({
      success: true,
      data: []
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });
  });
});
