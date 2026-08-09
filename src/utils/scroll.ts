export const HEADER_OFFSET = 80;

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;

  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
