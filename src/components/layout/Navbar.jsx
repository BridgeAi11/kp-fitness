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
        className="h-24 md:h-28 w-auto object-contain -my-4"    />
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
    window.location.href = "tel:+919962259269";
  };

  return (
    <motion.nav
      
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
  padding: "8px 0",
  background: scrolled
    ? "rgba(7,7,7,0.85)"
    : "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
  backdropFilter: scrolled ? "blur(16px)" : "none",
  WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
  borderBottom: "none",
}}

    >
      <div className="max-w-350 mx-auto px-4 md:px-6 flex items-center justify-between gap-4">

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
  className="
    relative
    px-5
    py-3
    text-sm
    font-semibold
    transition-all
    duration-300
    group
    no-underline
  "
  style={{
    color: isActive ? "#FF2A2A" : "rgba(255,255,255,.65)",
  }}
>
  <span className="relative z-10 group-hover:text-white transition-all duration-300">
    {link}
  </span>

  {/* Hover underline */}
  <span className="
      absolute
      left-4
      right-4
      bottom-0
      h-0.5
      bg-[#FF2A2A]
      scale-x-0
      group-hover:scale-x-100
      origin-left
      transition-transform
      duration-300
  "/>

 {/* Hover glow */}
<span
  className="
    absolute
    inset-0
    rounded-xl
    opacity-0
    group-hover:opacity-100
    transition-all
    duration-300
  "
/>
</a>
            </motion.li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* Join Now — calls on click */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleJoinNow}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold text-sm transition-all duration-300 relative overflow-hidden group border-none cursor-pointer"
            style={{
              background: "#FF2A2A",
              boxShadow: "0 0 20px rgba(255,42,42,0.4)",
            }}
          >
            {/* Phone icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.18 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span className="relative z-10">Join Now</span>
            <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg gap-1.5 border-none cursor-pointer"
            style={{ background: "rgba(255,255,255,0.06)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-5 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-5 h-0.5 bg-white rounded-full"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden mt-3"
            style={{
              background: "rgba(7,7,7,0.97)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => {
                const id = link.toLowerCase();
                return (
                  <motion.a
                    key={link}
                    href={`#${id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => {
                      setMenuOpen(false);
                      setActiveLink(id);
                    }}
                    className="flex items-center justify-between py-3 px-3 rounded-xl text-white/70 hover:text-white transition-all duration-300 no-underline"
                    style={{}}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <span className="font-medium text-sm">{link}</span>
                    <span className="text-[#FF2A2A] text-xs font-bold">+</span>
                  </motion.a>
                );
              })}

              {/* Mobile Join Now */}
              <div className="pt-4 border-t border-white/6 mt-2">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    window.location.href = "tel:+919962259269";
                  }}
                  className="w-full py-4 rounded-xl text-white font-bold text-sm border-none cursor-pointer flex items-center justify-center gap-3"
                  style={{
                    background: "#FF2A2A",
                    boxShadow: "0 0 24px rgba(255,42,42,0.35)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.18 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Join Now — Call Us
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}