import { useInView } from 'react-intersection-observer'
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const trainers = [
  {
    name: 'Arjun Sharma',
    role: 'Head Strength Coach',
    exp: '8 Years Experience',
    specialization: 'Powerlifting, Hypertrophy & Muscle Building',
    emoji: '💪',
    color: '#FF2A2A',
  },
  {
    name: 'Priya Nair',
    role: 'Nutrition & Yoga Expert',
    exp: '6 Years Experience',
    specialization: 'Yoga, Flexibility & Customized Diet Planning',
    emoji: '🧘',
    color: '#FF2A2A',
  },
]

export default function Trainers() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="trainers" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF2A2A]/4 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#FF2A2A]" />
            <span className="text-[#FF2A2A] text-xs uppercase tracking-widest font-medium">
              Expert Team
            </span>
            <div className="w-8 h-px bg-[#FF2A2A]" />
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white">
            MEET OUR <span className="text-[#FF2A2A] glow-red-text">TRAINERS</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto text-sm px-2">
            World-class certified coaches dedicated to your transformation.
          </p>
        </div>

        {/* Cards (2 Trainer Centered Grid) */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6 sm:gap-8">
          {trainers.map((t, i) => (
            <div
              key={i}
              className="group relative glass rounded-2xl overflow-hidden cursor-pointer"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s ease ${i * 0.15}s`,
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Photo background */}
              <div className="relative h-64 sm:h-72 bg-gradient-to-br from-[#1a0000] to-[#0a0000] flex items-center justify-center overflow-hidden">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF2A2A]/15 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Avatar circle */}
                <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#FF2A2A]/10 border-2 border-[#FF2A2A]/40 flex items-center justify-center text-6xl sm:text-7xl group-hover:scale-110 group-hover:border-[#FF2A2A] transition-all duration-500 shadow-[0_0_24px_rgba(255,42,42,0.2)]">
                  {t.emoji}
                </div>

                {/* Social icons on hover */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#FF2A2A] hover:border-[#FF2A2A] transition-all duration-300"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#FF2A2A] hover:border-[#FF2A2A] transition-all duration-300"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 sm:p-8">
                <h3 className="text-white font-semibold text-xl group-hover:text-[#FF2A2A] transition-colors duration-300">
                  {t.name}
                </h3>
                <p className="text-[#FF2A2A] text-sm font-medium mt-1">{t.role}</p>
                <p className="text-white/40 text-xs mt-1">{t.exp}</p>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{t.specialization}</p>
                </div>

                {/* Bottom line */}
                <div className="mt-4 w-0 h-px bg-[#FF2A2A] group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}