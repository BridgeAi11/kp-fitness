import { useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* ─── Animated canvas: grid + orbs + particles ─── */
function BackgroundCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId, frame = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    /* particles */
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.2,
      vy: -(Math.random() * 0.0006 + 0.0002),
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.012 + 0.006,
    }))

    /* orbs */
    const orbs = [
      { cx: 0.72, cy: 0.42, r: 0.28, color: 'rgba(255,42,42,0.09)', phase: 0 },
      { cx: 0.18, cy: 0.60, r: 0.20, color: 'rgba(255,80,10,0.06)', phase: 2.1 },
      { cx: 0.50, cy: 0.90, r: 0.22, color: 'rgba(255,42,42,0.05)', phase: 4.2 },
    ]

    const draw = () => {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      frame++
      const t = frame * 0.008

      /* grid */
      const CELL = Math.max(W, H) > 900 ? 72 : 48
      ctx.lineWidth = 0.5
      for (let x = 0; x < W; x += CELL) {
        ctx.strokeStyle = `rgba(255,42,42,${0.025 + 0.012 * Math.sin(t + x * 0.01)})`
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H; y += CELL) {
        ctx.strokeStyle = `rgba(255,42,42,${0.025 + 0.012 * Math.sin(t + y * 0.01)})`
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      /* grid intersection dots */
      for (let x = 0; x < W; x += CELL) {
        for (let y = 0; y < H; y += CELL) {
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + x * 0.02 + y * 0.02)
          ctx.beginPath()
          ctx.arc(x, y, 1.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,42,42,${0.08 * pulse})`
          ctx.fill()
        }
      }

      /* scanning line */
      const scanY = (H * ((t * 0.15) % 1))
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60)
      scanGrad.addColorStop(0, 'rgba(255,42,42,0)')
      scanGrad.addColorStop(0.5, 'rgba(255,42,42,0.06)')
      scanGrad.addColorStop(1, 'rgba(255,42,42,0)')
      ctx.fillStyle = scanGrad
      ctx.fillRect(0, scanY - 60, W, 120)

      /* orbs */
      orbs.forEach(o => {
        const ox = W * (o.cx + 0.04 * Math.sin(t * 0.5 + o.phase))
        const oy = H * (o.cy + 0.04 * Math.cos(t * 0.4 + o.phase))
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, Math.min(W, H) * o.r)
        grad.addColorStop(0, o.color)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.beginPath(); ctx.arc(ox, oy, Math.min(W, H) * o.r, 0, Math.PI * 2)
        ctx.fill()
      })

      /* particles */
      particles.forEach(p => {
        p.y += p.vy
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random() }
        const opacity = Math.max(0, Math.sin(t * p.speed * 12 + p.phase) * 0.7)
        ctx.beginPath()
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,42,42,${opacity})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}




const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const heroRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

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
      className="relative overflow-hidden"
      style={{ minHeight: '100svh', background: '#060608' }}
    >
      <style>{`
        @keyframes badgePulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,42,42,.4); }
          60% { box-shadow: 0 0 0 10px rgba(255,42,42,0); }
        }
        @keyframes glowPulse {
          0%,100% { opacity: .55; }
          50% { opacity: 1; }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes revealWidth {
          from { width: 0; }
          to { width: 100%; }
        }
        .red-glow { animation: glowPulse 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-dumbbell, .red-glow { animation: none; }
        }
      `}</style>

      {/* ── Background layers ── */}
      <BackgroundCanvas />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(6,6,8,.85) 100%)' }} />

      {/* Red accent glows */}
      <div className="absolute pointer-events-none red-glow" style={{ zIndex: 2, top: '10%', right: '-5%', width: '55vw', height: '55vw', maxWidth: 700, maxHeight: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,42,42,.12) 0%, transparent 65%)' }} />
      <div className="absolute pointer-events-none" style={{ zIndex: 2, bottom: '-10%', left: '-10%', width: '45vw', height: '45vw', maxWidth: 550, maxHeight: 550, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,42,42,.07) 0%, transparent 65%)' }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 180, background: 'linear-gradient(transparent, rgba(6,6,8,.99))', zIndex: 3 }} />

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6" style={{
  minHeight: '100svh',
  paddingTop: 'clamp(55px, 8vh, 80px)',
  paddingBottom: 'clamp(25px, 5vh, 50px)',
  maxWidth: '1200px',
  margin: '0 auto',
}}>

        {/* Badge */}
        <motion.div {...fadeUp(0.08)} className="mb-5 sm:mb-6">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 100, background: 'rgba(255,42,42,.1)', border: '1px solid rgba(255,42,42,.3)', animation: 'badgePulse 2.6s ease-in-out 1.5s infinite' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF2A2A', flexShrink: 0, display: 'inline-block' }} />
            <span style={{ fontSize: 'clamp(9px,2vw,11px)', color: 'rgba(255,255,255,.65)', textTransform: 'uppercase', letterSpacing: '.14em', fontWeight: 700 }}>
              Trusted by 1,000+ Fitness Enthusiasts
            </span>
          </div>
        </motion.div>

        {/* H1 */}
        <motion.div {...fadeUp(0.26)} style={{ marginBottom: 'clamp(16px,3vw,28px)' }}>
          <h1
            style={{
    fontSize: 'clamp(1.8rem, 5.5vw, 6rem)',
    lineHeight: 1,
    letterSpacing: '-0.03em',
    fontWeight: 900,
    margin: 0,
    whiteSpace: 'nowrap',
  }}
          >
            <span style={{ color: '#fff' }}>Unlock Your </span>
            <span style={{ color: '#FF2A2A', position: 'relative', display: 'inline-block' }}>
              True Strength
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: '-6px',
                  width: '100%',
                  height: 3,
                  background: 'linear-gradient(90deg, transparent, #FF2A2A, transparent)',
                  borderRadius: 2,
                  transformOrigin: 'left',
                  display: 'block',
                }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          {...fadeUp(0.44)}
          style={{
            fontSize: 'clamp(13px, 1.5vw, 15px)',
            color: 'rgba(255,255,255,.44)',
            lineHeight: 1.8,
            maxWidth: 560,
            margin: '0 auto',
            marginBottom: 'clamp(18px, 3vw, 24px)',
          }}
        >
          World-class fitness with certified trainers, cutting-edge equipment, and personalized programs crafted to turn your goals into results that last.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.58)} className="flex flex-col sm:flex-row gap-3 justify-center" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 'clamp(48px, 8vw, 70px)' }}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 18px 48px rgba(255,42,42,.55)' }}  
            whileTap={{ scale: 0.95 }}
            onClick={() => { window.location.href = 'tel:+919962259269' }}
            style={{
              background: 'linear-gradient(135deg, #FF2A2A 0%, #cc1111 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 100,
              padding: '0 clamp(20px,4vw,30px)',
              height: 'clamp(46px, 6vw, 54px)',
              fontSize: 'clamp(13px,1.5vw,14px)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              letterSpacing: '.3px',
              boxShadow: '0 0 36px rgba(255,42,42,.35)',
              whiteSpace: 'nowrap',
            }}
          >
            Start your journey
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04, background: 'rgba(255,255,255,.09)', borderColor: 'rgba(255,42,42,.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'rgba(255,255,255,.05)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,.15)',
              borderRadius: 100,
              padding: '0 clamp(20px,4vw,30px)',
              height: 'clamp(46px, 6vw, 54px)',
              fontSize: 'clamp(13px,1.5vw,14px)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              backdropFilter: 'blur(14px)',
              letterSpacing: '.3px',
              whiteSpace: 'nowrap',
            }}
          >
            View membership
          </motion.button>
        </motion.div>

        
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,.2)', textTransform: 'uppercase', letterSpacing: '.4em' }}>Scroll</span>
        <div style={{ width: 1, height: 36, position: 'relative', overflow: 'hidden', background: 'rgba(255,42,42,.1)' }}>
          <motion.div
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: 0, left: 0, width: 1, height: '100%', background: 'linear-gradient(to bottom, transparent, #FF2A2A)', transformOrigin: 'top' }}
          />
        </div>
      </motion.div>
    </section>
  )
}