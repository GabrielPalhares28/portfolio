import { describe, expect, it } from 'vitest';
import { projects } from './projects';

describe('projects data', () => {
  it('is a non empty list', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('has complete entries', () => {
    projects.forEach((project) => {
      expect(project.title.trim()).not.toBe('');
      expect(project.description.trim()).not.toBe('');
      expect(project.image.startsWith('/')).toBe(true);
      expect(project.link).toMatch(/^https:\/\//);
    });
  });

  it('has unique titles', () => {
    const titles = projects.map((project) => project.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
