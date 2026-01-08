import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/Login';
import { vi } from 'vitest';
import { authAPI } from '../services/api';

// Mock authAPI
vi.mock('../services/api', () => ({
  authAPI: {
    login: vi.fn(),
    register: vi.fn(),
  },
}));

describe('Login Component', () => {
  const mockOnLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form by default', () => {
    render(<Login onLogin={mockOnLogin} />);
    expect(screen.getByText('Entrar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByText('ACESSAR')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Nome')).not.toBeInTheDocument();
  });

  it('switches to register form', () => {
    render(<Login onLogin={mockOnLogin} />);
    fireEvent.click(screen.getByText('Registre-se'));
    expect(screen.getByText('Cadastrar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByText('CRIAR CONTA')).toBeInTheDocument();
  });

  it('handles login success', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (authAPI.login as any).mockResolvedValue({ success: true, token: 'fake-token', user: { name: 'Test' } });
    
    render(<Login onLogin={mockOnLogin} />);
    
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('ACESSAR'));

    await waitFor(() => {
      expect(authAPI.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
      expect(mockOnLogin).toHaveBeenCalled();
    });
  });

  it('handles register success', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (authAPI.register as any).mockResolvedValue({ success: true, token: 'fake-token', user: { name: 'Test' } });
    
    render(<Login onLogin={mockOnLogin} />);
    fireEvent.click(screen.getByText('Registre-se'));
    
    fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('CRIAR CONTA'));

    await waitFor(() => {
      expect(authAPI.register).toHaveBeenCalledWith({ name: 'Test User', email: 'test@example.com', password: 'password', age: 10 });
      expect(mockOnLogin).toHaveBeenCalled();
    });
  });

  it('handles login failure', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (authAPI.login as any).mockResolvedValue({ success: false, msg: 'Invalid credentials' });
    
    render(<Login onLogin={mockOnLogin} />);
    
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByText('ACESSAR'));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('handles network error', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (authAPI.login as any).mockRejectedValue(new Error('Network Error'));
    
    render(<Login onLogin={mockOnLogin} />);
    
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('ACESSAR'));

    await waitFor(() => {
      expect(screen.getByText('Erro de conexão com o servidor. Verifique se o backend está rodando.')).toBeInTheDocument();
    });
  });
});
