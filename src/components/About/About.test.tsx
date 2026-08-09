import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { About } from './About';

describe('About', () => {
  it('renders the section with the headline and the quick stats', () => {
    const { container } = render(<About />);

    expect(container.querySelector('#about')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sobre Mim' })).toBeInTheDocument();
    ['2+', '10+', '100%'].forEach((stat) => {
      expect(screen.getByText(stat)).toBeInTheDocument();
    });
  });

  it('renders the whole experience timeline', () => {
    render(<About />);

    expect(
      screen.getByRole('heading', { name: 'Desenvolvedor Full Stack Freelancer' })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Desenvolvedor Backend' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Análise e Desenvolvimento de Sistemas' })
    ).toBeInTheDocument();
    expect(screen.getByText('Workana')).toBeInTheDocument();
  });

  it('renders each skill with its progress bar value', () => {
    render(<About />);

    expect(screen.getByText('React & TypeScript')).toBeInTheDocument();
    expect(screen.getByText('90%')).toBeInTheDocument();

    const bars = screen.getAllByRole('progressbar');
    expect(bars).toHaveLength(6);
    expect(bars[0]).toHaveAttribute('aria-valuenow', '90');
  });

  it('renders the interests', () => {
    render(<About />);

    ['Clean Code', 'Problem Solving', 'Desafios', 'Open Source'].forEach((interest) => {
      expect(screen.getByText(interest)).toBeInTheDocument();
    });
  });

  it('highlights a timeline entry while hovered', async () => {
    render(<About />);

    const entry = screen
      .getByRole('heading', { name: 'Desenvolvedor Backend' })
      .closest('.MuiCard-root') as HTMLElement;

    await userEvent.hover(entry);
    expect(entry).toHaveStyle({ transform: 'translateY(-4px)' });

    await userEvent.unhover(entry);
    expect(entry).toHaveStyle({ transform: 'translateY(0)' });
  });

  it('clears the avatar source when the image fails to load', () => {
    render(<About />);

    const image = screen.getByRole('img', { name: 'Gabriel Palhares' });

    image.dispatchEvent(new Event('error', { bubbles: true }));

    expect(image).toHaveAttribute('src', '');
  });
});
