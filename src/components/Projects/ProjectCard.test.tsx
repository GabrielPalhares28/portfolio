import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectCard } from './ProjectCard';

const baseProps = {
  title: 'Sistema de Chamados',
  description: 'Aplicação para gestão de chamados internos.',
  image: '/projects/chamados.jpg',
  link: 'https://github.com/GabrielPalhares28',
};

describe('ProjectCard', () => {
  it('renders the project content', () => {
    render(<ProjectCard {...baseProps} />);

    expect(screen.getByRole('heading', { name: baseProps.title })).toBeInTheDocument();
    expect(screen.getByText(baseProps.description)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: baseProps.title })).toHaveAttribute(
      'src',
      baseProps.image
    );
  });

  it('uses default tags and category when they are not provided', () => {
    render(<ProjectCard {...baseProps} />);

    expect(screen.getByText('Full Stack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders the provided tags and category', () => {
    render(<ProjectCard {...baseProps} tags={['Node.js', 'SQL']} category="Backend" />);

    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('SQL')).toBeInTheDocument();
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  it('points the code action to the repository and hides demo when it is not provided', () => {
    render(<ProjectCard {...baseProps} />);

    const codeLink = screen.getByRole('link', { name: /ver código/i });
    expect(codeLink).toHaveAttribute('href', baseProps.link);
    expect(codeLink).toHaveAttribute('target', '_blank');
    expect(codeLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.queryByRole('link', { name: /abrir demonstração/i })).not.toBeInTheDocument();
  });

  it('renders the demo action when demoLink is provided', () => {
    const demoLink = 'https://example.com/demo';
    render(<ProjectCard {...baseProps} demoLink={demoLink} />);

    const demo = screen.getByRole('link', { name: `Abrir demonstração de ${baseProps.title}` });
    expect(demo).toHaveAttribute('href', demoLink);
    expect(demo).toHaveAttribute('target', '_blank');
    expect(demo).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('hides the image when it fails to load', () => {
    render(<ProjectCard {...baseProps} />);

    const image = screen.getByRole('img', { name: baseProps.title });
    image.dispatchEvent(new Event('error', { bubbles: true }));

    expect(image).toHaveStyle({ display: 'none' });
  });

  it('lifts the card while hovered', async () => {
    const { container } = render(<ProjectCard {...baseProps} />);

    const card = container.firstElementChild as HTMLElement;

    expect(card).toHaveStyle({ transform: 'translateY(0)' });

    await userEvent.hover(card);
    expect(card).toHaveStyle({ transform: 'translateY(-8px)' });

    await userEvent.unhover(card);
    expect(card).toHaveStyle({ transform: 'translateY(0)' });
  });
});
