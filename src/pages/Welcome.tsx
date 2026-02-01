import { useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react";

export default function Welcome() {
    const reduce = useReducedMotion();
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const DURATION = 900;

        if (reduce) {
            setPercent(100);
            return;
        }

        let raf: number;
        const start = performance.now();

        const step = (now: number) => {
            const elapsed = now - start;
            const t = Math.min(elapsed / DURATION, 1);
            const p = Math.floor(t * 100);
            setPercent(p);
            if (t < 1) raf = requestAnimationFrame(step);
            else setPercent(100);
        };

        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [reduce]);

    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed inset-0 z-[10000] flex items-center justify-center animated-bg text-white"
        >
            <div className="w-full max-w-4xl px-6">
                <div className="flex flex-col items-center gap-8 py-20">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
                        WELCOME
                    </h1>

                    <p className="text-sm md:text-base text-white/90">
                        Preparing your experience... 
                    </p>

                    <div className="w-full max-w-3xl">
                        <div
                            className="w-full h-3 md:h-4 bg-white/12 rounded-full overflow-hidden relative"
                            role="progressbar"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={percent}
                            aria-label="Loading progress"
                        >
                            <div
                                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400"
                                style={{ width: `${percent}%`, transition: reduce ? "none" : "width 120ms linear" }}
                            />
                        </div>

                        <div className="mt-3 flex items-center justify-between text-xs md:text-sm text-white/90">
                            <span className="sr-only">Loading progress</span>
                            <span>Loading</span>
                            <span aria-hidden>{percent}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}