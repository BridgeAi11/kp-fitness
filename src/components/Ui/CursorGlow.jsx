import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const dotRef = useRef(null)
  const glowRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const glow = glowRef.current
    const progress = progressRef.current

    let mouseX = 0, mouseY = 0
    let glowX = 0, glowY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const onScroll = () => {
      const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      progress.style.width = `${scrollPct}%`
    }

    const animate = () => {
      glowX += (mouseX - glowX) * 0.08
      glowY += (mouseY - glowY) * 0.08
      glow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('scroll', onScroll)
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-transparent">
        <div
          ref={progressRef}
          className="h-full bg-[#FF2A2A] transition-none"
          style={{ width: '0%', boxShadow: '0 0 8px #FF2A2A' }}
        />
      </div>

      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#FF2A2A] rounded-full z-[999] pointer-events-none"
        style={{ boxShadow: '0 0 6px #FF2A2A' }}
      />

      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[998]"
        style={{
          background: 'radial-gradient(circle, rgba(255,42,42,0.06) 0%, transparent 70%)',
        }}
      />
    </>
  )
}