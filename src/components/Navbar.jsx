// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Home", "AI Network", "Features", "Pricing", "Contact"];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${
        scrolled ? "glass shadow-lg py-3" : "bg-transparent py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-6 mx-auto max-w-7xl">
        <motion.div
          className="text-2xl font-bold tracking-tighter"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-white">LOGISTIC</span>
          <span className="text-primary neon-glow">AI</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="items-center hidden space-x-8 md:flex">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "")}`}
              className="text-sm font-medium tracking-wide text-gray-300 transition-colors hover:text-primary"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            className="px-5 py-2 text-sm font-semibold transition border rounded-full bg-primary/10 border-primary/50 text-primary backdrop-blur-sm hover:bg-primary/20"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px #00ff88" }}
          >
            LAUNCH APP
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-2xl text-white md:hidden"
        >
          <i className={`fas fa-${mobileOpen ? "times" : "bars"}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="flex flex-col p-5 mx-4 mt-3 space-y-4 md:hidden glass rounded-2xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "")}`}
                className="py-2 text-center text-gray-200 hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="px-5 py-2 mt-2 border rounded-full bg-primary/20 border-primary text-primary">
              LAUNCH APP
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}