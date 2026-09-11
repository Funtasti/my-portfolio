import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Welcome from "./pages/Welcome";
import MainPage from "./components/MainPage";

function App() {

  const [loaded, setLoaded] = useState<boolean>(false);
  const [minElapsed, setMinElapsed] = useState<boolean>(false);

  const minMs = 2000;

  useEffect(() => {
    const onLoad = () => setLoaded(true);
    if(document.readyState === "complete") {
      setLoaded(true);
    } else {
      window.addEventListener("load", onLoad);
    }

    const t = setTimeout(() => setMinElapsed(true), minMs);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(t);
    };
  }, []);

  const showSplash = !(loaded && minElapsed);

  useEffect(() => {
    if(showSplash) return;

    const hash = window.location.hash;

    if(!hash) return;

    const id = hash.substring(1);

    const timer = setTimeout(() => {
      const element = document.getElementById(id);

      if(element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [showSplash]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
          >
            <Welcome />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ visibility: showSplash ? 'hidden' : 'visible' }}>
        <MainPage />
      </div>
    </>
  )
}

export default App
