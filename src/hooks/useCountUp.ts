import { useEffect, useRef, useState } from "react";

export function useCountUp(
  target: number,
  duration = 2000,
  isVisible = false
): number {
  const [count, setCount] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible || typeof window === "undefined") return;

    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    startRef.current = null;

    const startValue = 0;
    const finalTarget = Number(target) || 0;

    const animate = (time: number) => {
      if (startRef.current === null) startRef.current = time;
      const elapsed = time - startRef.current;
      const progress = Math.min(elapsed / Math.max(duration, 1), 1);

      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (finalTarget - startValue) * eased);

      setCount(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(finalTarget);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      startRef.current = null;
    };
  }, [target, duration, isVisible]);

  return count;
}
