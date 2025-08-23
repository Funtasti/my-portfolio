// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// const KEY = "portfolio-welcome-seen";
// const DURATION = 2000;
// const FADE = 300;

// export default function Welcome() {
//     const nav = useNavigate();
//     const [mounted, setMounted] = useState(false);
//     const [visible, setVisible] = useState(false);

//     useEffect(() => {
//         if(typeof window === "undefined") return;

//         try {
//             if(sessionStorage.getItem(KEY) === "seen") {
//                 nav("/home", { replace: true });
//                 return;
//             }
//             sessionStorage.setItem(KEY, "seen");
//         }
//         catch { /* empty */ }
//         setMounted(true);
//         setVisible(true);

//         const hideTimeout = window.setTimeout(() => setVisible(false), DURATION - FADE);
//         const navTimeout = window.setTimeout(() => nav("/home", { replace: true }), DURATION);

//         return () => {
//             clearTimeout(hideTimeout);
//             clearTimeout(navTimeout);
//         }
//     }, [nav]);

//     if (!mounted) return null;

//     return (
//         <>
//             <div className={
//                     "fixed inset-0 grid place-items-center z-[9999]" +
//                     "backdrop-blur-sm" +
//                     "transition-[opacity,transform] duration-300 ease-out" +
//                     (visible ? "opacity-100 scale-100" : "opacity-0 scale-95")
//                 }
//                 style={{ transitionDuration: `${FADE}ms`, background:
//                     "radial-gradient(circle at 20% 20%, rgba(124,58,237,0.12), transparent), " +
//                     "radial-gradient(circle at 80% 40%, rgba(59,130,246,0.12), transparent), " +
//                     "rgba(10,11,13,0.6)"
//                 }}
//                 aria-hidden={!visible}
//             >
//                 <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-900/40 via-purple-900/30 to-blue-900/30">
//                     <div className="container text-center">
//                         <p className="text-violet-300 mb-3">
//                             Welcome To My
//                         </p>
//                         <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
//                             className="gradient-text text-5xl md:text-7xl font-extrabold"
//                         >
//                             PortFolio Website
//                         </motion.h1>
//                         <p className="text-white/70 mt-4">Loading experience...</p>
//                     </div>
//                 </main>
//             </div>
//         </>
//     );
// }

export default function Welcome({ onFinish } : { onFinish? : () => void }) {
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        const minDisplayTime = 2500;
        const maxDisplayTime = 5000;

        let pageLoaded = false;
        let minTimeReached = false;

        const handleLoad = () => {
            pageLoaded = true;
            checkIfShouldHide();
        }

        const minTimer = setTimeout(() => {
            minTimeReached = true;
            checkIfShouldHide();
        }, minDisplayTime);

        const maxTimer = setTimeout(() => {
            setShowWelcome(false);
            if (onFinish) onFinish();
        }, maxDisplayTime);

        const checkIfShouldHide = () => {
            if (pageLoaded && minTimeReached) {
                setTimeout(() => {
                    setShowWelcome(false);
                    if (onFinish) onFinish();
                }, 300);
            }
        }

        if(document.readyState === 'complete') {
            pageLoaded = true;
            checkIfShouldHide();
        } else {
            window.addEventListener('load', handleLoad);
        }
        return () => {
            clearTimeout(minTimer);
            clearTimeout(maxTimer);
            window.removeEventListener('load', handleLoad);
        }
    }, [onFinish]);

    return (
        <AnimatePresence>
            {showWelcome && (
                <motion.div key="welcome" 
                    className="fixed inset-0 bg-gradient-to-br from-violet-900/40 via-purple-900/30 to-blue-900/30 z-[100]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1 } }}
                >
                    <div className="min-h-screen flex flex-col items-center justify-center">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-5xl md:text-7xl font-extrabold gradient-text mb-4 text-center"
                        >
                            Welcome to My Portfolio
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.7 }}
                            className="text-white/70 text-lg md:text-xl mb-12 text-center"
                        >
                            Explore mt work and projects.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay:0.7, duration: 0.6 }}
                            className="flex items-center justify-center"
                        >
                            <span className="relative w-12 h-12 block">
                                <span className="absolute inset-0 rounded-full border-violet-400 animate-spin"></span>
                                <span className="absolute inset-2 rounded-full border-violet-400 animate-spin-slower"></span>
                                <span className="absolute inset-4 rounded-full border-violet-400 animate-spin-slowest"></span>
                            </span>
                            <style>
                                {`.animate-spin-slower { animation: spin 2s linear infinite; }
                                .animate-spin-slowest { animation: spin 3.5s linear infinite; }
                                @keyframes spin {
                                    to { transform: rotate(360deg); }
                                }`}
                            </style>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}