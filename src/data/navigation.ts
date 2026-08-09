export interface NavItem {
  label: string;
  id: string;
}

export const navItems: NavItem[] = [
  { label: "Início", id: "hero" },
  { label: "Tech Stack", id: "techstack" },
  { label: "Projetos", id: "projects" },
  { label: "Sobre", id: "about" },
  { label: "Contato", id: "contact" },
];
