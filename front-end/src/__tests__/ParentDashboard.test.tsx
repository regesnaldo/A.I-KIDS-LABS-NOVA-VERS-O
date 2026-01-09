import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ParentDashboard from '../components/ParentDashboard';
import { vi } from 'vitest';

describe('ParentDashboard Component', () => {
  const parentId = 'parent1';

  it('renders loading initially', () => {
    render(<ParentDashboard parentId={parentId} />);
    expect(screen.getByText('Carregando informações...')).toBeInTheDocument();
  });

  it('renders children data after loading and handles interactions', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<ParentDashboard parentId={parentId} />);
    
    await waitFor(() => {
      expect(screen.getByText('Joãozinho (Idade: 8)')).toBeInTheDocument();
    }, { timeout: 2000 });
    
    expect(screen.getByText('Painel de Controle Parental')).toBeInTheDocument();

    // Select child
    fireEvent.click(screen.getByText('Mariazinha (Idade: 10)'));
    expect(screen.getByText('Progresso de Mariazinha')).toBeInTheDocument();

    // Interact with inputs
    const timeInput = screen.getByLabelText(/Tempo máximo diário/i);
    fireEvent.change(timeInput, { target: { value: '90' } });
    expect(timeInput).toHaveValue(90);

    const difficultySelect = screen.getByLabelText(/Dificuldade máxima permitida/i);
    fireEvent.change(difficultySelect, { target: { value: 'hard' } });
    expect(difficultySelect).toHaveValue('hard');

    const pinInput = screen.getByLabelText(/PIN de controle parental/i);
    fireEvent.change(pinInput, { target: { value: '4321' } });
    expect(pinInput).toHaveValue('4321');

    const startTimeInput = screen.getByLabelText(/Horário inicial/i);
    fireEvent.change(startTimeInput, { target: { value: '09:00' } });
    expect(startTimeInput).toHaveValue('09:00');

    const endTimeInput = screen.getByLabelText(/Horário final/i);
    fireEvent.change(endTimeInput, { target: { value: '21:00' } });
    expect(endTimeInput).toHaveValue('21:00');

    // Save restrictions
    fireEvent.click(screen.getByText('Salvar Restrições'));
    expect(alertMock).toHaveBeenCalledWith('Restrições salvas com sucesso!');

    // Generate report
    fireEvent.click(screen.getByText('Gerar Relatório'));
    expect(alertMock).toHaveBeenCalledWith('Relatório gerado com sucesso!');
  });
});
