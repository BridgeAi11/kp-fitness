import { useInView } from 'react-intersection-observer'

const services = [
  { title: 'Strength Training', icon: '🏋️', desc: 'Build raw power with progressive overload techniques.' },
  { title: 'Fat Loss', icon: '🔥', desc: 'Targeted programs to burn fat and reveal lean muscle.' },
  { title: 'CrossFit', icon: '⚔️', desc: 'High-intensity functional movements for total fitness.' },
  { title: 'HIIT', icon: '⚡', desc: 'Maximize calorie burn in minimum time with interval training.' },
  { title: 'Cardio', icon: '🫀', desc: 'Improve endurance, heart health and stamina.' },
  { title: 'Yoga', icon: '🧘', desc: 'Flexibility, balance and mindfulness combined.' },
  { title: 'Bodybuilding', icon: '💪', desc: 'Sculpt and define every muscle group with precision.' },
  { title: 'Functional Training', icon: '🎯', desc: 'Real-world movement patterns for everyday strength.' },
]

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="programs" className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#FF2A2A]/5 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#FF2A2A]" />
            <span className="text-[#FF2A2A] text-xs uppercase tracking-widest font-medium">
              What We Offer
            </span>
            <div className="w-8 h-px bg-[#FF2A2A]" />
          </div>
          <h2 className="font-heading text-6xl md:text-7xl text-white">
            OUR <span className="text-[#FF2A2A] glow-red-text">SERVICES</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="group relative glass rounded-2xl p-6 cursor-pointer overflow-hidden"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(60px)',
                transition: `all 0.7s ease ${i * 0.08}s`,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Hover background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF2A2A]/0 to-[#FF2A2A]/0 group-hover:from-[#FF2A2A]/10 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

              {/* Glow border on hover */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#FF2A2A]/40 transition-all duration-500" />

              {/* Icon */}
              <div className="relative z-10 text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {s.icon}
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-white font-semibold text-lg mb-2 group-hover:text-[#FF2A2A] transition-colors duration-300">
                {s.title}
              </h3>

              {/* Desc */}
              <p className="relative z-10 text-white/40 text-sm leading-relaxed">
                {s.desc}
              </p>

              {/* Bottom red line */}
              <div className="relative z-10 mt-4 w-0 h-px bg-[#FF2A2A] group-hover:w-full transition-all duration-500" />

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF2A2A]/0 group-hover:bg-[#FF2A2A]/5 rounded-bl-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}