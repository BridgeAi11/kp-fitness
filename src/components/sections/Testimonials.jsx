import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const testimonials = [
  {
    name: 'Karthik Raja',
    role: 'Lost 15kg in 3 months',
    text: 'KP Fitness changed my life! The trainers guided me step-by-step with simple workouts and a great diet plan. I feel so active and healthy now.',
    rating: 5,
    avatar: '👨',
  },
  {
    name: 'Surya Prakash',
    role: 'Gained fitness & lean muscle',
    text: 'Awesome gym experience! The coaches are very friendly and motivate you in every single session. Best decision I made for my health.',
    rating: 5,
    avatar: '👨',
  },
  {
    name: 'Saravanan',
    role: 'Completed CrossFit training',
    text: 'Great equipment and friendly trainers! I went from a complete beginner to lifting heavy with full confidence in just 8 weeks.',
    rating: 5,
    avatar: '🧔',
  },
  {
    name: 'Vijay Kumar',
    role: 'Strength & weight loss transformation',
    text: 'The fitness trainers are super helpful. My strength improved and I feel energetic and stress-free every single day. Highly recommended!',
    rating: 5,
    avatar: '👨',
  },
  {
    name: 'Kamesh Kumar',
    role: 'Member for 1 year',
    text: 'Joining KP Fitness was my best decision. Excellent personal coaching, clean gym facilities, and a very supportive community.',
    rating: 5,
    avatar: '👨',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2A2A]/40 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF2A2A]/4 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#FF2A2A]" />
            <span className="text-[#FF2A2A] text-xs uppercase tracking-widest font-medium">
              Success Stories
            </span>
            <div className="w-8 h-px bg-[#FF2A2A]" />
          </div>
          <h2 className="font-heading text-6xl md:text-7xl text-white">
            CLIENT <span className="text-[#FF2A2A] glow-red-text">REVIEWS</span>
          </h2>
        </div>

        {/* Carousel */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease',
          }}
        >
          {/* Main card */}
          <div className="glass rounded-2xl p-10 text-center relative overflow-hidden"
            style={{ border: '1px solid rgba(255,42,42,0.15)' }}
          >
            {/* Quote mark */}
            <div className="absolute top-6 left-8 text-8xl font-heading text-[#FF2A2A]/10 leading-none select-none">
              "
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <span key={i} className="text-[#FF2A2A] text-xl">★</span>
              ))}
            </div>

            {/* Text */}
            <p
              key={current}
              className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
              style={{ animation: 'fadeIn 0.5s ease' }}
            >
              "{testimonials[current].text}"
            </p>

            {/* Avatar + Name */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-[#FF2A2A]/10 border-2 border-[#FF2A2A]/30 flex items-center justify-center text-3xl">
                {testimonials[current].avatar}
              </div>
              <div>
                <p className="text-white font-semibold">{testimonials[current].name}</p>
                <p className="text-[#FF2A2A] text-xs uppercase tracking-wider">
                  {testimonials[current].role}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:border-[#FF2A2A] hover:text-[#FF2A2A] transition-all duration-300"
            >
              &#8592;
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    background: i === current ? '#FF2A2A' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:border-[#FF2A2A] hover:text-[#FF2A2A] transition-all duration-300"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}