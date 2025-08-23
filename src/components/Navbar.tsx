import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useScrollNavigation } from "../hooks/useScrollNavigation";
import { smoothScrollTo } from "../utils/smoothScroll";

interface NavItem {
  id: string;
  label: string;
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { activeSection, isScrolled } = useScrollNavigation();

  const navItems: NavItem[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string): void => {
    smoothScrollTo(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={clsx(
        "fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-custom",
        isScrolled
          ? "bg-[rgba(11,11,11,0.90)] shadow-[0_2px_20px_rgba(124,58,237,0.2)]"
          : "bg-[rgba(11,11,11,0.90)]"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-full px-5 flex justify-between items-center h-[70px]">
        <div className="nav-brand">
          <h2 className="text-gradient text-[1.8rem] font-bold">Sumit</h2>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 ml-auto">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={clsx(
                "relative text-white/80 font-medium transition-all duration-300 hover:text-purple-500",
                activeSection === item.id && "text-purple-500"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                  layoutId="activeTab"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col cursor-pointer items-center"
          onClick={() => setIsMobileMenuOpen(o => !o)}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <motion.span
            className="w-6 h-0.5 bg-white mb-1.5 transition-all duration-300"
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              y: isMobileMenuOpen ? 8 : 0,
            }}
            aria-hidden
          ></motion.span>
          <motion.span
            className="w-6 h-0.5 bg-white mb-1.5 transition-all duration-300"
            animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
            aria-hidden
          ></motion.span>
          <motion.span
            className="w-6 h-0.5 bg-white transition-all duration-300"
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              y: isMobileMenuOpen ? -8 : 0,
            }}
            aria-hidden
          ></motion.span>
        </button>

        {/* Mobile Menu */}
        <motion.div
          className={clsx(
            "fixed inset-x-0 top-[70px] bg-[rgba(11,11,11,0.95)] backdrop-blur-custom md:hidden overflow-y-auto",
            isMobileMenuOpen ? "flex" : "hidden"
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center py-8 gap-4 w-full">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={clsx(
                  "text-white/90 font-medium transition-all duration-300 hover:text-purple-500",
                  activeSection === item.id && "text-purple-500"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
