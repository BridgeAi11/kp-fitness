import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import aboutGymImg from '../../assets/about-gym.png'

const features = [
  {
    icon: '⚡',
    title: 'Customized For You',
    desc: 'Personalized workout plans tailored specifically to your body goals and fitness level.',
  },
  {
    icon: '🕐',
    title: '24/7 Trainer Support',
    desc: 'Certified elite coaches available whenever you need guidance, form checks, or motivation.',
  },
  {
    icon: '📊',
    title: 'Real-Time Progress Analytics',
    desc: 'Track your strength gains, body composition shifts, and performance metrics in real time.',
  },
  {
    icon: '💎',
    title: 'Premium Facility',
    desc: 'State-of-the-art training gear, luxury amenities, and competitive membership options.',
  },
]

const highlights = [
  'Certified Elite Trainers & Coaches',
  'State-of-the-Art Training Equipment',
  'Personalized Workout & Nutrition Plans',
  'Flexible 24/7 Member Access',
]

export default function About() {
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: cardsRef, inView: cardsInView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden bg-[#090A0E]">
      {/* Subtle red ambient glow backdrop */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[#FF2A2A]/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column — Text Content */}
          <div ref={titleRef} className="lg:col-span-6 flex flex-col items-start">
            {/* Section Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181A26] border border-white/15 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#FF2A2A] shadow-[0_0_8px_#FF2A2A]" />
                <span className="text-white text-xs uppercase tracking-widest font-bold">
                  ABOUT KP FITNESS
                </span>
              </div>
            </motion.div>

            {/* Clean Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6"
            >
              TRAIN SMARTER. <br />
              <span className="text-[#FF2A2A]">BECOME STRONGER.</span>
            </motion.h2>

            {/* Body paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
            >
              At KP Fitness, we combine science-backed training programs, elite certified coaches, state-of-the-art facilities, and customized nutrition plans to help you achieve lasting physical and mental transformation.
            </motion.p>

            {/* Key Highlights Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 w-full max-w-xl"
            >
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FF2A2A]/20 border border-[#FF2A2A]/50 flex items-center justify-center text-[#FF2A2A] text-xs font-bold shrink-0">
                    ✓
                  </div>
                  <span className="text-white/90 text-sm font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column — Luxury Gym Image Frame with Clean Glass Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center mt-8 lg:mt-0">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[#FF2A2A]/10 rounded-3xl blur-[60px] pointer-events-none" />

            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={titleInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#141622]"
            >
              <img
                src={aboutGymImg}
                alt="KP Fitness Luxury Gym Facility"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0E] via-transparent to-transparent opacity-70 pointer-events-none" />
            </motion.div>

            {/* Floating Glass Badge 1: Top Right */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-4 right-4 sm:-top-4 sm:-right-4 bg-[#181A26]/90 border border-white/20 backdrop-blur-xl rounded-xl px-5 py-3 shadow-xl z-20 text-center"
            >
              <div className="text-xl sm:text-2xl font-extrabold text-[#FF2A2A]">98%</div>
              <div className="text-white/80 text-xs font-medium uppercase tracking-wider">Member Satisfaction</div>
            </motion.div>

            {/* Floating Glass Badge 2: Bottom Left */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-4 left-4 sm:-bottom-4 sm:-left-4 bg-[#181A26]/90 border border-red-500/30 backdrop-blur-xl rounded-xl px-5 py-3 shadow-xl z-20 text-center"
            >
              <div className="text-xl sm:text-2xl font-extrabold text-white">10+ Years</div>
              <div className="text-[#FF2A2A] text-xs font-semibold uppercase tracking-wider">Excellence</div>
            </motion.div>
          </div>

        </div>

        {/* Why Choose Us Feature Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 sm:mt-24">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.25)' }}
              className="bg-gradient-to-b from-[#181A26] to-[#10121C] border border-white/12 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FF2A2A]/15 border border-[#FF2A2A]/30 flex items-center justify-center text-xl mb-4 group-hover:bg-[#FF2A2A] group-hover:text-white transition-all duration-300">
                {f.icon}
              </div>

              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#FF2A2A] transition-colors duration-300">
                {f.title}
              </h3>

              <p className="text-white/70 text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}