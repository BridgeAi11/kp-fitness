import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["Home", "About", "Programs", "Membership", "Trainers", "Contact"];

function Logo() {
  return (
    <a
      href="#home"
      className="flex items-center justify-center h-full"
    >
      <img
        src="/logo.png"
        alt="KP Fitness"
        className="h-24 sm:h-28 md:h-32 w-auto object-contain -my-3 sm:-my-4 transition-all duration-300 hover:scale-105"
      />
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.toLowerCase());
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveLink(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleJoinNow = () => {
    window.location.href = "tel:+916374642981";
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        padding: "10px 0",
        background: scrolled
          ? "rgba(7,7,7,0.92)"
          : "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,42,42,0.15)" : "none",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between gap-4">

        {/* Logo */}
        <Logo />

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
          {navLinks.map((link, i) => {
            const id = link.toLowerCase();
            const isActive = activeLink === id;
            return (
              <motion.li
                key={link}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.5 }}
                style={{ listStyle: "none" }}
              >
                <a
                  href={`#${id}`}
                  onClick={() => setActiveLink(id)}
                  className="relative px-5 py-3 text-sm font-semibold transition-all duration-300 group no-underline"
                  style={{
                    color: isActive ? "#FF2A2A" : "rgba(255,255,255,.65)",
                  }}
                >
                  <span className="relative z-10 group-hover:text-white transition-all duration-300">
                    {link}
                  </span>

                  {/* Hover underline */}
                  <span
                    className="absolute bottom-1 left-5 right-5 h-[2px] bg-[#FF2A2A] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"
                    style={{
                      transformOrigin: "left center",
                      backgroundColor: "#FF2A2A",
                    }}
                  />
                </a>
              </motion.li>
            );
          })}
        </ul>

        {/* Right CTA Button (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(255,42,42,0.6)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleJoinNow}
            className="px-6 py-2.5 bg-[#FF2A2A] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-[0_4px_16px_rgba(255,42,42,0.4)] hover:bg-red-600 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.02-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span>Join Now</span>
          </motion.button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-center">
            <span
              className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-[#0A0A0A]/95 border-b border-white/10 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-3">
              {navLinks.map((link) => {
                const id = link.toLowerCase();
                const isActive = activeLink === id;
                return (
                  <a
                    key={link}
                    href={`#${id}`}
                    onClick={() => {
                      setActiveLink(id);
                      setMenuOpen(false);
                    }}
                    className={`block py-3 px-4 rounded-xl text-base font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-[#FF2A2A]/15 text-[#FF2A2A] border border-[#FF2A2A]/30"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link}
                  </a>
                );
              })}

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    handleJoinNow();
                    setMenuOpen(false);
                  }}
                  className="w-full py-3.5 bg-[#FF2A2A] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-[0_4px_20px_rgba(255,42,42,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Join Now</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}