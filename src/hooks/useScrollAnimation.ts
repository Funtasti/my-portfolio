import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

export function useScrollAnimation<T extends Element = HTMLElement>(
  threshold: number | number[] = 0.1
): [RefObject<T | null>, boolean] {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px 0px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, isVisible];
}
