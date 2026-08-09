import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Projects } from './Projects';
import { projects } from '../../data/projects';

describe('Projects', () => {
  it('renders the section heading inside an anchor with the projects id', () => {
    const { container } = render(<Projects />);

    expect(container.querySelector('#projects')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Projetos em Destaque' })
    ).toBeInTheDocument();
  });

  it('renders one card per project from the data module', () => {
    render(<Projects />);

    projects.forEach((project) => {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
    });
  });

  it('renders the GitHub call to action', () => {
    render(<Projects />);

    expect(screen.getByRole('link', { name: /visitar github/i })).toHaveAttribute(
      'href',
      'https://github.com/GabrielPalhares28'
    );
  });
});
