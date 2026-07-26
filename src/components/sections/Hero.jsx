import { useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue } from 'framer-motion'

const boyImg = '/boy.png'

/* ─── Ambient Canvas: Dark Grid & Red Spark Particles ─── */
function BackgroundCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, frame = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    /* Red spark particles */
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.4,
      vy: -(Math.random() * 0.0004 + 0.00015),
      vx: (Math.random() - 0.5) * 0.0002,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.004,
    }))

    const draw = () => {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      frame++
      const t = frame * 0.006

      /* Dark grid texture */
      const CELL = Math.max(W, H) > 900 ? 75 : 45
      ctx.lineWidth = 0.4
      for (let x = 0; x < W; x += CELL) {
        ctx.strokeStyle = `rgba(255, 255, 255, 0.02)`
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H; y += CELL) {
        ctx.strokeStyle = `rgba(255, 255, 255, 0.02)`
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      /* Red spark particles radiating from center */
      particles.forEach(p => {
        p.y += p.vy
        p.x += p.vx
        if (p.y < -0.02 || p.x < -0.02 || p.x > 1.02) {
          p.y = 1.02
          p.x = 0.3 + Math.random() * 0.4
        }
        const opacity = Math.max(0, Math.sin(t * p.speed * 10 + p.phase) * 0.75)
        ctx.beginPath()
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 35, 35, ${opacity * 0.8})`
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

/* Luxury Motion Animation Presets */
const easeCinematic = [0.16, 1, 0.3, 1]

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
      className="relative overflow-hidden flex flex-col items-center justify-center min-h-fit sm:min-h-screen w-full bg-[#030303] text-white pt-[90px] sm:pt-[125px] pb-6 sm:pb-12"
    >
      {/* ── PURE BLACK BASE BACKGROUND ── */}
      <div className="absolute inset-0 bg-[#030303] pointer-events-none" />

      {/* Intense Red Radial Glow behind the athlete */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: easeCinematic }}
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: '80vw',
          height: '80vw',
          maxWidth: 900,
          maxHeight: 900,
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 30, 30, 0.55) 0%, rgba(255, 0, 0, 0.16) 45%, transparent 70%)',
          filter: 'blur(70px)',
          zIndex: 2
        }}
      />

      {/* Dark Grid Canvas + Red Particles */}
      <BackgroundCanvas />

      {/* ── MAIN HERO COMPOSITION ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-3 sm:px-8 flex flex-col items-center justify-center text-center my-2 sm:my-auto">

        {/* 1. TOP HEADLINE: BEC & OME */}
        <motion.h1
          initial={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.15, ease: easeCinematic }}
          className="text-[44px] xs:text-[52px] sm:text-[110px] lg:text-[170px] font-[900] tracking-tight leading-[0.82] uppercase text-white select-none text-center drop-shadow-lg z-10 flex items-center justify-center gap-5 xs:gap-8 sm:gap-10 lg:gap-14 w-full"
          style={{
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Impact", "Arial Black", sans-serif',
          }}
        >
          <span>BEC</span>
          <span>OME</span>
        </motion.h1>

        {/* 2. CENTER ATHLETE VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: easeCinematic }}
          className="relative z-20 w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[480px] lg:max-w-[580px] flex items-center justify-center -my-4 sm:-my-14 lg:-my-22 pointer-events-none"
        >
          {/* boy.png visual */}
          <img
            src={boyImg}
            alt="KP Fitness Boy Athlete"
            className="w-auto h-full max-h-[280px] xs:max-h-[310px] sm:max-h-[420px] lg:max-h-[530px] object-contain relative z-10"
            style={{
              filter: `
                drop-shadow(-16px 0px 32px rgba(255,30,30,0.85))
                drop-shadow(16px 0px 32px rgba(255,30,30,0.55))
                contrast(1.08)
                brightness(1.03)
              `
            }}
          />
        </motion.div>

        {/* 3. BOTTOM HEADLINE: UNSTOPPABLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.55, ease: easeCinematic }}
          className="text-[40px] xs:text-[45px] sm:text-[95px] md:text-[130px] lg:text-[165px] font-[900] tracking-tight leading-[0.82] uppercase text-[#FF1E1E] select-none text-center z-30 relative -mt-6 xs:-mt-8 sm:-mt-10 lg:-mt-12 w-full max-w-full"
          style={{
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Impact", "Arial Black", sans-serif',
            textShadow: '0 0 35px rgba(255, 30, 30, 0.65), 0 10px 30px rgba(0, 0, 0, 0.9)'
          }}
        >
          UNSTOPPABLE
        </motion.h1>

        {/* 4. SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72, ease: easeCinematic }}
          className="text-[#E0E0E0] text-xs sm:text-base md:text-lg font-medium max-w-xl mx-auto mt-3 sm:mt-5 mb-5 sm:mb-6 tracking-wide drop-shadow-md select-none px-4 z-40 relative"
        >
          Train harder. Become stronger. Live better.
        </motion.p>

        {/* 5. ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.88, ease: easeCinematic }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center items-center z-40 relative"
        >
          {/* Primary Red Pill Button */}
          <motion.button
            whileHover={{ y: -2, scale: 1.03, boxShadow: '0 16px 36px rgba(255,30,30,0.6)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.location.href = 'tel:+919962259269'}
            className="w-full sm:w-auto px-9 py-3.5 bg-[#FF1E1E] hover:bg-[#D61414] text-white font-extrabold rounded-full shadow-[0_6px_24px_rgba(255,30,30,0.45)] text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            JOIN NOW
            <span className="text-base font-bold">→</span>
          </motion.button>

          {/* Secondary Translucent Glass Button */}
          <motion.button
            whileHover={{ y: -2, scale: 1.03, backgroundColor: 'rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-9 py-3.5 bg-[#0A0A0A]/90 text-white border border-white/20 hover:border-white/40 font-extrabold rounded-full text-sm tracking-wider uppercase backdrop-blur-xl transition-all duration-300 cursor-pointer"
          >
            EXPLORE MEMBERSHIP
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}