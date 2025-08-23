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

    const sectionIds: { id: string }[] = [
      { id: "home" },
      { id: "about" },
      { id: "portfolio" },
      { id: "contact" }
    ];

    const handleScroll = (): void => {
      const scrollY = window.scrollY ?? window.pageYOffset ?? 0;

      setIsScrolled(scrollY > 100);

      const scrollPos = scrollY + 100;

      for (const s of sectionIds) {
        const el = document.getElementById(s.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        const height = rect.height;

        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection((prev) => (prev === s.id ? prev : s.id));
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
