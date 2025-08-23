import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 up to `target` using an ease-out animation.
 * @param target final numeric value to count up to
 * @param duration animation duration in milliseconds (default 2000)
 * @param isVisible whether the animation should run (default false)
 * @returns current animated count (integer)
 */
export function useCountUp(
  target: number,
  duration = 2000,
  isVisible = false
): number {
  const [count, setCount] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // guard invalid inputs
    if (!isVisible || typeof window === "undefined") return;

    // reset any previous animation
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

      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (finalTarget - startValue) * eased);

      setCount(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // ensure exact final value
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
