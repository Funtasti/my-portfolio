export function smoothScrollTo(sectionId: string): void {
  if (typeof window === "undefined") return; // guard for SSR

  const element = document.getElementById(sectionId);
  if (!element) return;

  const elementTop = element.getBoundingClientRect().top + window.scrollY;

  const offsetTop = elementTop - 70;
  
  window.scrollTo({ top: offsetTop, behavior: "smooth" });
}