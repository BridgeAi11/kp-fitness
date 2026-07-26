import { useInView } from 'react-intersection-observer'

const services = [
  { title: 'Strength Training', icon: '🏋️', desc: 'Build muscle and power with guided weight training.' },
  { title: 'Fat Loss', icon: '🔥', desc: 'Workouts designed to burn calories and shed extra fat.' },
  { title: 'CrossFit', icon: '⚔️', desc: 'Fun full-body exercises to build strength and stamina.' },
  { title: 'HIIT', icon: '⚡', desc: 'Quick, high-energy exercises to burn calories fast.' },
  { title: 'Cardio', icon: '🫀', desc: 'Boost your stamina, energy levels, and heart health.' },
  { title: 'Yoga', icon: '🧘', desc: 'Stretching and breathing to relax your mind and body.' },
  { title: 'Bodybuilding', icon: '💪', desc: 'Build and shape your muscles step by step.' },
  { title: 'Functional Training', icon: '🎯', desc: 'Simple daily movements for real-world strength.' },
]

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="programs" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#FF2A2A]/5 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#FF2A2A]" />
            <span className="text-[#FF2A2A] text-xs uppercase tracking-widest font-medium">
              What We Offer
            </span>
            <div className="w-8 h-px bg-[#FF2A2A]" />
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white">
            OUR <span className="text-[#FF2A2A] glow-red-text">SERVICES</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="group relative glass rounded-2xl p-6 cursor-pointer overflow-hidden"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s ease ${i * 0.06}s`,
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
              <p className="relative z-10 text-white/50 text-sm leading-relaxed">
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