import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TechStack } from './TechStack';

describe('TechStack', () => {
  it('renders the section with its three categories', () => {
    const { container } = render(<TechStack />);

    expect(container.querySelector('#techstack')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Habilidades Técnicas' })).toBeInTheDocument();
    ['Frontend', 'Backend', 'DevOps & Tools'].forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('renders every skill with its level badge', () => {
    render(<TechStack />);

    ['React', 'TypeScript', 'Node.js', 'Spring Boot', 'Docker'].forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
    expect(screen.getAllByText('Avançado').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Intermediário').length).toBeGreaterThan(0);
  });

  it('highlights a skill card while hovered', async () => {
    render(<TechStack />);

    const card = screen.getByText('Docker').parentElement as HTMLElement;
    const icon = card.firstElementChild as HTMLElement;
    const idleStyles = getComputedStyle(icon).cssText;

    await userEvent.hover(card);
    const hoveredStyles = getComputedStyle(icon).cssText;
    expect(hoveredStyles).not.toBe(idleStyles);
    expect(hoveredStyles).toContain('drop-shadow(0 0 8px currentColor)');

    await userEvent.unhover(card);
    expect(getComputedStyle(icon).cssText).toBe(idleStyles);
  });

  it('renders the closing note', () => {
    render(<TechStack />);

    expect(screen.getByText(/sempre aprendendo/i)).toBeInTheDocument();
  });
});
