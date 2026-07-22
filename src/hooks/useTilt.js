import { useRef } from 'react'

export function useTilt() {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const tiltX = ((y - cy) / cy) * 8
    const tiltY = ((cx - x) / cx) * 8
    el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`
    el.style.transition = 'transform 0.1s ease'
  }

  const onMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
      ref.current.style.transition = 'transform 0.5s ease'
    }
  }

  return { ref, onMouseMove, onMouseLeave }
}