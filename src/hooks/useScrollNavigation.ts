import { useEffect, useState } from "react";

type UseScrollNavigationResult = {
  activeSection: string;
  isScrolled: boolean;
};

export function useScrollNavigation(): UseScrollNavigationResult {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const sectionIds = ["home", "about", "portfolio", "contact" ];

    const handleScroll = (): void => {
      const scrollY = window.scrollY ?? window.pageYOffset ?? 0;

      setIsScrolled(scrollY > 100);

      const viewportCenter = scrollY + window.innerHeight / 2;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const top = scrollY + rect.top;
        const bottom = top + rect.height;

        if (viewportCenter >= top && viewportCenter < bottom) {
          setActiveSection((prev) => (prev === id ? prev : id));
          break;
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { activeSection, isScrolled };
}