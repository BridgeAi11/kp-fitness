import { useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let frame = 0
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      vy: -(Math.random() * 0.5 + 0.15),
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.008,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++
      particles.forEach((p) => {
        p.y += p.vy
        if (p.y < -10) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width }
        const opacity = Math.max(0, Math.sin(frame * p.speed + p.phase) * 0.65)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,42,42,${opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />
}

function DumbbellSVG() {
  return (
    <svg width="100%" viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="plateL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3a3a"/><stop offset="40%" stopColor="#1a1a1a"/><stop offset="100%" stopColor="#0d0d0d"/>
        </linearGradient>
        <linearGradient id="plateR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2e2e2e"/><stop offset="40%" stopColor="#161616"/><stop offset="100%" stopColor="#0d0d0d"/>
        </linearGradient>
        <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#555"/><stop offset="50%" stopColor="#888"/><stop offset="100%" stopColor="#333"/>
        </linearGradient>
        <linearGradient id="redAccent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF4444"/><stop offset="100%" stopColor="#CC1111"/>
        </linearGradient>
        <linearGradient id="collarG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#444"/><stop offset="100%" stopColor="#1a1a1a"/>
        </linearGradient>
      </defs>
      <rect x="88" y="68" width="144" height="24" rx="5" fill="url(#barG)"/>
      <rect x="88" y="68" width="144" height="6" rx="3" fill="rgba(255,255,255,.06)"/>
      <rect x="142" y="64" width="36" height="32" rx="4" fill="url(#collarG)" stroke="rgba(255,42,42,.6)" strokeWidth="1.2"/>
      <rect x="147" y="70" width="6" height="20" rx="2" fill="rgba(255,42,42,.4)"/>
      <rect x="157" y="70" width="6" height="20" rx="2" fill="rgba(255,42,42,.4)"/>
      <rect x="167" y="70" width="6" height="20" rx="2" fill="rgba(255,42,42,.4)"/>
      <rect x="48" y="44" width="40" height="72" rx="7" fill="url(#plateL)" stroke="rgba(255,255,255,.04)" strokeWidth=".8"/>
      <rect x="58" y="44" width="6" height="72" rx="3" fill="url(#redAccent)" opacity=".85"/>
      <rect x="48" y="44" width="40" height="10" rx="5" fill="rgba(255,255,255,.06)"/>
      <rect x="20" y="52" width="28" height="56" rx="6" fill="url(#plateL)" stroke="rgba(255,255,255,.03)" strokeWidth=".8"/>
      <rect x="28" y="52" width="4" height="56" rx="2" fill="url(#redAccent)" opacity=".7"/>
      <rect x="20" y="52" width="28" height="8" rx="4" fill="rgba(255,255,255,.05)"/>
      <rect x="0" y="60" width="20" height="40" rx="5" fill="url(#plateL)"/>
      <rect x="6" y="60" width="3" height="40" rx="1.5" fill="rgba(255,42,42,.5)"/>
      <rect x="232" y="44" width="40" height="72" rx="7" fill="url(#plateR)" stroke="rgba(255,255,255,.04)" strokeWidth=".8"/>
      <rect x="256" y="44" width="6" height="72" rx="3" fill="url(#redAccent)" opacity=".85"/>
      <rect x="232" y="44" width="40" height="10" rx="5" fill="rgba(255,255,255,.05)"/>
      <rect x="272" y="52" width="28" height="56" rx="6" fill="url(#plateR)" stroke="rgba(255,255,255,.03)" strokeWidth=".8"/>
      <rect x="288" y="52" width="4" height="56" rx="2" fill="url(#redAccent)" opacity=".7"/>
      <rect x="272" y="52" width="28" height="8" rx="4" fill="rgba(255,255,255,.04)"/>
      <rect x="300" y="60" width="20" height="40" rx="5" fill="url(#plateR)"/>
      <rect x="311" y="60" width="3" height="40" rx="1.5" fill="rgba(255,42,42,.45)"/>
      <ellipse cx="160" cy="148" rx="80" ry="8" fill="rgba(255,42,42,.07)"/>
    </svg>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] },
})

const RING_STYLE = (size, border, duration, reverse = false) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  border,
  animation: `${reverse ? 'spinRev' : 'spin'} ${duration}s linear infinite`,
})

export default function Hero() {
  const heroRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springY = useSpring(mouseY, { stiffness: 60, damping: 22 })

  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [mouseX, mouseY])

  return (
    <section
      ref={heroRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
      className="relative overflow-hidden bg-[#070707]"
      style={{ minHeight: '100svh' }}
    >
      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes spinRev { from { transform: rotate(0deg) } to { transform: rotate(-360deg) } }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,42,42,.35); }
          70% { box-shadow: 0 0 0 8px rgba(255,42,42,0); }
        }
      `}</style>

      <ParticleCanvas />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 65% at 72% 52%, rgba(255,42,42,.11) 0%, transparent 68%)', zIndex: 2 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 50% at 22% 50%, rgba(255,42,42,.06) 0%, transparent 65%)', zIndex: 2 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,42,42,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,42,42,.035) 1px, transparent 1px)', backgroundSize: '72px 72px', zIndex: 2 }} />
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 160, background: 'linear-gradient(transparent, rgba(7,7,7,.98))', zIndex: 3 }} />

      {/* ── DESKTOP ── */}
      <div className="hidden md:grid relative z-10 max-w-[1200px] mx-auto px-8 grid-cols-2 gap-6 items-center min-h-screen">

        {/* Left copy — left-aligned */}
        <div className="pt-32 pb-24 flex flex-col items-start">

          {/* Trust badge */}
          <motion.div {...fadeUp(0.08)} className="mb-8">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 100, background: 'rgba(255,42,42,.1)', border: '1px solid rgba(255,42,42,.28)', animation: 'badgePulse 2.4s ease-in-out 1.8s infinite' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF2A2A', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', letterSpacing: '.13em', fontWeight: 600 }}>
                Trusted by 1,000+ Fitness Enthusiasts
              </span>
            </div>
          </motion.div>

          {/* H1 */}
          <motion.div {...fadeUp(0.22)} className="mb-6">
            <h1 className="font-black text-white text-left" style={{ fontSize: 'clamp(40px, 5.2vw, 68px)', lineHeight: .96, letterSpacing: '-2.5px' }}>
              Unlock Your<br />
              <span style={{ color: '#FF2A2A', position: 'relative', display: 'inline-block' }}>
                True Strength
                <span style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #FF2A2A, transparent)' }} />
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p {...fadeUp(0.4)} style={{ fontSize: 15, color: 'rgba(255,255,255,.42)', lineHeight: 1.78, maxWidth: 400, marginBottom: 36, textAlign: 'left' }}>
            World-class fitness with certified trainers, cutting-edge equipment, and personalized programs crafted to turn your goals into results that last.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.55)} className="flex gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 16px 40px rgba(255,42,42,.5)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { window.location.href = 'tel:+919962259269' }}
              style={{ background: '#FF2A2A', color: '#fff', border: 'none', borderRadius: 100, padding: '0 28px', height: 52, fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, letterSpacing: '.3px', boxShadow: '0 0 32px rgba(255,42,42,.3)' }}
            >
              Start your journey
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, background: 'rgba(255,255,255,.08)', borderColor: 'rgba(255,42,42,.5)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'rgba(255,255,255,.04)', color: '#fff', border: '1px solid rgba(255,255,255,.14)', borderRadius: 100, padding: '0 28px', height: 52, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', backdropFilter: 'blur(12px)', letterSpacing: '.3px' }}
            >
              View membership
            </motion.button>
          </motion.div>
        </div>

        {/* Right: dumbbell */}
        <div className="relative flex items-center justify-center" style={{ height: 520 }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div animate={{ opacity: [.18, .38, .18] }} transition={{ duration: 3.5, repeat: Infinity }} style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,42,42,.22) 0%, transparent 65%)' }} />
            <div style={{ ...RING_STYLE(320, '1.5px dashed rgba(255,42,42,.3)', 12), position: 'absolute' }} />
            <div style={{ ...RING_STYLE(240, '1px solid rgba(255,42,42,.18)', 18, true), position: 'absolute' }} />
            <div style={{ ...RING_STYLE(390, '1px solid rgba(255,42,42,.07)', 30), position: 'absolute' }} />
          </div>

          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 w-[85%] max-w-[360px]"
            style={{ filter: 'drop-shadow(0 0 40px rgba(255,42,42,.32)) drop-shadow(0 24px 56px rgba(0,0,0,.75))' }}
          >
            <DumbbellSVG />
          </motion.div>

          {/* Floating: Today's goal */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.6 }} style={{ position: 'absolute', top: 44, right: 16, background: 'rgba(255,42,42,.1)', border: '1px solid rgba(255,42,42,.25)', borderRadius: 12, padding: '12px 16px', backdropFilter: 'blur(12px)' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 4 }}>Today's goal</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>2,400 <span style={{ color: '#FF2A2A' }}>kcal</span></div>
          </motion.div>

          {/* Floating: members */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.6 }} style={{ position: 'absolute', bottom: 72, left: 16, background: 'rgba(10,10,10,.85)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: '10px 14px', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,42,42,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <circle cx="7.5" cy="5.5" r="2.5" stroke="#FF2A2A" strokeWidth="1.5"/>
                <path d="M2 14c0-3.04 2.46-5.5 5.5-5.5S13 10.96 13 14" stroke="#FF2A2A" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>+50 members</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)' }}>joined this week</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="md:hidden relative z-10 flex flex-col items-center text-center px-5 pt-28 pb-14 gap-0">

        {/* Trust badge — no logo, starts directly here */}
        <motion.div {...fadeUp(0.1)} className="mb-6">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 100, background: 'rgba(255,42,42,.1)', border: '1px solid rgba(255,42,42,.28)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF2A2A', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', letterSpacing: '.12em', fontWeight: 600 }}>Trusted by 1,000+ Members</span>
          </div>
        </motion.div>

        {/* H1 */}
        <motion.div {...fadeUp(0.22)} className="mb-7">
          <h1 className="font-black text-white" style={{ fontSize: 'clamp(36px, 10.5vw, 54px)', lineHeight: .95, letterSpacing: '-2px' }}>
            Unlock Your<br/>
            <span style={{ color: '#FF2A2A' }}>True Strength</span>
          </h1>
        </motion.div>

        {/* Dumbbell image */}
        <motion.div
          initial={{ opacity: 0, scale: .88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .9, delay: .35, ease: [.22, 1, .36, 1] }}
          className="relative w-full mb-7"
          style={{ maxWidth: 290 }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{ ...RING_STYLE(220, '1.5px dashed rgba(255,42,42,.28)', 10), position: 'absolute' }} />
            <div style={{ ...RING_STYLE(170, '1px solid rgba(255,42,42,.15)', 16, true), position: 'absolute' }} />
          </div>
          <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ filter: 'drop-shadow(0 0 30px rgba(255,42,42,.3)) drop-shadow(0 16px 40px rgba(0,0,0,.7))' }}>
            <DumbbellSVG />
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.p {...fadeUp(0.5)} style={{ fontSize: 14, color: 'rgba(255,255,255,.42)', lineHeight: 1.78, maxWidth: 290, marginBottom: 32 }}>
          Certified trainers, modern equipment, and personalized programs to help you achieve lasting results.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.62)} className="flex flex-col gap-3 w-full" style={{ maxWidth: 290 }}>
          <motion.button
            whileTap={{ scale: .96 }}
            onClick={() => { window.location.href = 'tel:+919962259269' }}
            style={{ background: '#FF2A2A', color: '#fff', border: 'none', borderRadius: 100, height: 52, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 0 28px rgba(255,42,42,.35)', width: '100%' }}
          >
            Start your journey →
          </motion.button>
          <motion.button
            whileTap={{ scale: .96 }}
            onClick={() => document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'rgba(255,255,255,.04)', color: '#fff', border: '1px solid rgba(255,255,255,.14)', borderRadius: 100, height: 52, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
          >
            View membership
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="hidden md:flex absolute bottom-7 left-1/2 -translate-x-1/2 flex-col items-center gap-2 pointer-events-none z-10">
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,.2)', textTransform: 'uppercase', letterSpacing: '.4em' }}>Scroll</span>
        <div style={{ width: 1, height: 36, position: 'relative', overflow: 'hidden', background: 'rgba(255,42,42,.12)' }}>
          <motion.div animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: 0, left: 0, width: 1, height: '100%', background: 'linear-gradient(to bottom, transparent, #FF2A2A)', transformOrigin: 'top' }} />
        </div>
      </motion.div>
    </section>
  )
}