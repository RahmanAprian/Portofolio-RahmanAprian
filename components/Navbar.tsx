"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = links.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMobileLink = (href: string) => {
    setMenuOpen(false);
    // Delay sedikit biar menu tutup dulu sebelum scroll
    setTimeout(() => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="font-mono font-medium text-lg">
          <span style={{ color: '#00e6ff', textShadow: '0 0 10px rgba(0,230,255,0.85)' }} className="font-bold">
            RahmanAprian
          </span>
        </a>

        {/* Desktop links — tidak diubah */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                  active === link.href ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-primary/15 rounded-lg border border-primary/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-light text-white rounded-lg transition-colors duration-200"
        >
          Hire Me
        </a>

        {/* Mobile burger — area tap diperbesar */}
        <button
          className="md:hidden p-3 -mr-2 text-muted hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface/95 backdrop-blur-md border-b border-white/5"
          >
            <ul className="flex flex-col px-4 py-3 gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  {/* Area tap diperbesar, pakai button agar lebih reliable di HP */}
                  <button
                    onClick={() => handleMobileLink(link.href)}
                    className={`w-full text-left px-4 py-4 rounded-xl text-base font-medium transition-colors ${
                      active === link.href
                        ? "bg-primary/15 text-white border border-primary/30"
                        : "text-muted hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}

              {/* Hire Me button di mobile */}
              <li className="mt-2 pt-2 border-t border-white/8">
                <button
                  onClick={() => handleMobileLink("#contact")}
                  className="w-full px-4 py-4 bg-primary hover:bg-primary-light text-white font-medium rounded-xl transition-colors text-base"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}