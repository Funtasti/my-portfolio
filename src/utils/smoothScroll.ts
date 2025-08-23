export function smoothScrollTo(sectionId: string): void {
  if (typeof window === "undefined") return; // guard for SSR
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.offsetTop - 70;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }
}
