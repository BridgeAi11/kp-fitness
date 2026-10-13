import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion'
import { ChevronDown, Dumbbell, Flame } from 'lucide-react'

const boyImg = '/boy.png'

/* ─── Custom GPU-Friendly Animated Ember Canvas ─── */
function ParticleEmbers() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let frame = 0

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const particleCount = isMobile ? 18 : 42

    const resize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth || window.innerWidth
      canvas.height = canvas.offsetHeight || window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * (isMobile ? 1.5 : 2.2) + 0.5,
      vy: -(Math.random() * 0.0006 + 0.0002),
      vx: (Math.random() - 0.5) * 0.0003,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.01 + 0.005,
      alpha: Math.random() * 0.6 + 0.2,
    }))

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      if (W === 0 || H === 0) {
        animId = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, W, H)
      frame++
      const t = frame * 0.008

      // Subtle tech grid lines
      const gridStep = isMobile ? 60 : 80
      ctx.lineWidth = 0.5
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)'
      for (let x = 0; x < W; x += gridStep) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
        ctx.stroke()
      }
      for (let y = 0; y < H; y += gridStep) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }

      // Draw embers
      particles.forEach((p) => {
        p.y += p.vy
        p.x += p.vx + Math.sin(t + p.phase) * 0.00015
        if (p.y < -0.05 || p.x < -0.05 || p.x > 1.05) {
          p.y = 1.05
          p.x = Math.random()
        }
        const flicker = 0.5 + 0.5 * Math.sin(t * 12 * p.speed + p.phase)
        const currentAlpha = p.alpha * flicker

        const px = p.x * W
        const py = p.y * H

        const radius = Math.max(0.1, p.r * 2)
        const grad = ctx.createRadialGradient(px, py, 0, px, py, radius)
        grad.addColorStop(0, `rgba(255, 31, 31, ${currentAlpha})`)
        grad.addColorStop(0.5, `rgba(225, 6, 0, ${currentAlpha * 0.5})`)
        grad.addColorStop(1, 'rgba(255, 31, 31, 0)')

        ctx.beginPath()
        ctx.arc(px, py, radius, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}

/* ─── Count-Up Stat Component ─── */
function StatCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    let startTime = null
    let animFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeProgress * end))
      if (progress < 1) {
        animFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrame)
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

/* ─── Staggered Entrance Variants (150ms stagger step) ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Hero() {
  const heroRef = useRef(null)

  // Mouse parallax motion values (Desktop only)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 120 }
  const parallaxX = useSpring(mouseX, springConfig)
  const parallaxY = useSpring(mouseY, springConfig)

  const handleMouseMove = useCallback(
    (e) => {
      if (!heroRef.current || (typeof window !== 'undefined' && window.innerWidth < 1024)) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x * 30)
      mouseY.set(y * 30)
    },
    [mouseX, mouseY]
  )

  const scrollToAbout = () => {
    const el = document.getElementById('about')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = 'tel:+919962259269'
    }
  }

  const scrollToPrograms = () => {
    const el = document.getElementById('services') || document.getElementById('membership')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={heroRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen lg:h-[100dvh] bg-[#0A0A0A] text-white flex flex-col justify-center items-center overflow-hidden pt-[85px] lg:pt-[70px] pb-10 lg:pb-0 select-none"
    >
      {/* Dynamic keyframe styles */}
      <style>{`
        @keyframes textFlickerGlow {
          0% {
            opacity: 0.3;
            text-shadow: 0 0 5px rgba(255, 31, 31, 0.3);
          }
          20% {
            opacity: 1;
            text-shadow: 0 0 30px rgba(255, 31, 31, 0.9), 0 0 50px rgba(255, 31, 31, 0.6);
          }
          35% {
            opacity: 0.6;
            text-shadow: 0 0 10px rgba(255, 31, 31, 0.4);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 40px rgba(255, 31, 31, 1), 0 0 70px rgba(255, 31, 31, 0.7);
          }
          100% {
            opacity: 1;
            text-shadow: 0 0 25px rgba(255, 31, 31, 0.8), 0 0 50px rgba(255, 31, 31, 0.5);
          }
        }

        @keyframes pillGlowPulse {
          0%, 100% {
            box-shadow: 0 0 12px rgba(255, 31, 31, 0.4), inset 0 0 8px rgba(255, 31, 31, 0.2);
            border-color: rgba(255, 31, 31, 0.6);
          }
          50% {
            box-shadow: 0 0 24px rgba(255, 31, 31, 0.9), inset 0 0 14px rgba(255, 31, 31, 0.4);
            border-color: rgba(255, 31, 31, 1);
          }
        }

        @keyframes radialPulseGlow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.75;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 0.95;
          }
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spinReverseSlow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .flicker-glow {
          animation: textFlickerGlow 1.4s ease-out forwards;
        }

        .pill-badge {
          animation: pillGlowPulse 2.5s infinite ease-in-out;
        }

        .radial-glow-anim {
          animation: radialPulseGlow 4s infinite ease-in-out;
        }
      `}</style>

      {/* GPU Particle Embers Background */}
      <ParticleEmbers />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full h-full my-auto">
          
          {/* ── LEFT 55% TEXT CONTENT ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left pt-2 lg:pt-0"
          >
            {/* 1. Eyebrow Tag */}
            <motion.div variants={itemVariants} className="mb-4 sm:mb-5">
              <div className="pill-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF1F1F]/15 border border-[#FF1F1F]/60 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#FF1F1F] animate-ping" />
                <span className="text-[#FF1F1F] text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase">
                  ELITE TRAINING STARTS HERE
                </span>
              </div>
            </motion.div>

            {/* 2. Headline */}
            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
              <h1
                className="font-black uppercase tracking-tight leading-[0.92] text-[#FFFFFF]"
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw + 0.5rem, 5.5rem)',
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Impact", "Arial Black", sans-serif',
                }}
              >
                <span className="block text-white drop-shadow-md">
                  FORGE YOUR
                </span>
                <span className="block text-[#FF1F1F] flicker-glow">
                  STRENGTH.
                </span>
              </h1>
            </motion.div>

            {/* 3. Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-sm sm:text-base md:text-lg font-normal max-w-xl mb-6 sm:mb-8 leading-relaxed text-balance"
            >
              Where discipline meets results. Personalized coaching, elite equipment, real transformation.
            </motion.p>

            {/* 4. Two CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center lg:justify-start mb-8 sm:mb-10"
            >
              {/* Solid Red CTA */}
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(255, 31, 31, 0.75)' }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToContact}
                className="w-full sm:w-auto px-8 py-4 bg-[#FF1F1F] hover:bg-[#E10600] text-white font-black text-xs sm:text-sm tracking-widest uppercase rounded-xl shadow-[0_0_20px_rgba(255,31,31,0.5)] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>START YOUR JOURNEY</span>
                <span className="text-base group-hover:translate-x-1 transition-transform duration-300">→</span>
              </motion.button>

              {/* Outlined CTA */}
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,31,31,0.12)', boxShadow: '0 0 25px rgba(255,31,31,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToPrograms}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/25 hover:border-[#FF1F1F] text-white font-black text-xs sm:text-sm tracking-widest uppercase rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                VIEW PROGRAMS
              </motion.button>
            </motion.div>

            {/* 5. Small Trust Strip (Stats) */}
            <motion.div
              variants={itemVariants}
              className="w-full max-w-xl pt-6 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-6 text-center lg:text-left"
            >
              <div className="flex flex-col">
                <span className="text-[#FF1F1F] font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                  <StatCounter end={500} suffix="+" duration={2200} />
                </span>
                <span className="text-gray-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mt-0.5">
                  Members Trained
                </span>
              </div>

              <div className="flex flex-col border-x border-white/10 px-2 sm:px-4">
                <span className="text-[#FF1F1F] font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                  <StatCounter end={10} suffix="+" duration={1800} />
                </span>
                <span className="text-gray-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mt-0.5">
                  Certified Coaches
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[#FF1F1F] font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight flex items-center justify-center lg:justify-start gap-1">
                  <StatCounter end={5} suffix="★" duration={1500} />
                </span>
                <span className="text-gray-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mt-0.5">
                  Rated Gym
                </span>
              </div>
            </motion.div>

          </motion.div>

          {/* ── RIGHT 45% DYNAMIC VISUAL ELEMENT ── */}
          <div className="w-full lg:w-[45%] flex items-center justify-center relative mt-2 lg:mt-0">
            {/* Parallax Wrapper (desktop mouse parallax) */}
            <motion.div
              style={{
                x: parallaxX,
                y: parallaxY,
              }}
              className="relative w-full max-w-[340px] xs:max-w-[390px] sm:max-w-[480px] lg:max-w-[540px] aspect-square flex items-center justify-center"
            >
              {/* Soft Radial Red Glow Pulsing Behind Subject */}
              <div
                className="radial-glow-anim absolute top-1/2 left-1/2 w-[85%] h-[85%] rounded-full pointer-events-none z-0"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 31, 31, 0.45) 0%, rgba(225, 6, 0, 0.18) 45%, transparent 70%)',
                  filter: 'blur(55px)',
                }}
              />

              {/* Abstract Energy Ring Graphic 1 (Outer Slow Rotating) */}
              <div
                className="absolute inset-2 sm:inset-4 rounded-full border border-dashed border-[#FF1F1F]/40 pointer-events-none z-0"
                style={{ animation: 'spinSlow 35s linear infinite' }}
              />

              {/* Abstract Energy Ring Graphic 2 (Inner Reverse Rotating) */}
              <div
                className="absolute inset-8 sm:inset-12 rounded-full border border-[#FF1F1F]/25 border-t-[#FF1F1F] pointer-events-none z-0"
                style={{ animation: 'spinReverseSlow 20s linear infinite' }}
              />

              {/* Tech Accent Energy Nodes */}
              <div className="absolute top-6 right-8 w-3 h-3 rounded-full bg-[#FF1F1F] shadow-[0_0_12px_#FF1F1F] animate-pulse z-10 hidden sm:block" />
              <div className="absolute bottom-12 left-6 w-2.5 h-2.5 rounded-full bg-[#FF1F1F] shadow-[0_0_10px_#FF1F1F] animate-ping z-10 hidden sm:block" />

              {/* Dynamic Athlete Silhouette / Visual Graphic */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img
                  src={boyImg}
                  alt="KP FITNESS Athlete Silhouette"
                  className="w-auto h-full max-h-[300px] xs:max-h-[350px] sm:max-h-[440px] lg:max-h-[520px] object-contain relative z-10 drop-shadow-[0_0_35px_rgba(255,31,31,0.65)]"
                  style={{
                    filter: `
                      drop-shadow(-12px 0px 25px rgba(255, 31, 31, 0.8))
                      drop-shadow(12px 0px 25px rgba(255, 31, 31, 0.5))
                      contrast(1.1)
                      brightness(1.02)
                    `,
                  }}
                />
              </div>

              {/* Floating Aesthetic Badges around athlete */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute top-8 left-2 sm:left-4 z-20 bg-[#0A0A0A]/90 border border-[#FF1F1F]/40 backdrop-blur-md rounded-xl px-3 py-2 flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
              >
                <div className="p-1.5 rounded-lg bg-[#FF1F1F]/20 text-[#FF1F1F]">
                  <Flame className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">INTENSITY</span>
                  <span className="text-xs font-black text-white">MAXIMUM</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.95, duration: 0.6 }}
                className="absolute bottom-8 right-2 sm:right-4 z-20 bg-[#0A0A0A]/90 border border-[#FF1F1F]/40 backdrop-blur-md rounded-xl px-3 py-2 flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
              >
                <div className="p-1.5 rounded-lg bg-[#FF1F1F]/20 text-[#FF1F1F]">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">EQUIPMENT</span>
                  <span className="text-xs font-black text-white">PRO GRADE</span>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* ── SCROLL-DOWN INDICATOR ── */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.1, duration: 0.6 },
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
        }}
        className="absolute bottom-3 lg:bottom-5 left-1/2 -translate-x-1/2 z-20 p-2 rounded-full text-gray-400 hover:text-[#FF1F1F] transition-colors cursor-pointer group flex flex-col items-center gap-1"
        aria-label="Scroll to next section"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 group-hover:text-[#FF1F1F] transition-colors hidden sm:block">
          SCROLL
        </span>
        <ChevronDown className="w-5 h-5 text-[#FF1F1F] drop-shadow-[0_0_8px_rgba(255,31,31,0.8)]" />
      </motion.button>
    </section>
  )
}