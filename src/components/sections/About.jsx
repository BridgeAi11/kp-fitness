import { useInView } from 'react-intersection-observer'
import { useTilt } from '../../hooks/useTilt'
import { lazy, Suspense } from 'react'
const KettlebellScene = lazy(() => import('../3d/KettlebellScene'))


const features = [
  {
    icon: '⚡',
    title: 'Customized For You',
    desc: 'Personalized workout plans based on your body goals and fitness level.',
  },
  {
    icon: '🕐',
    title: '24/7 Support',
    desc: 'Our trainers are always available whenever you need guidance.',
  },
  {
    icon: '📱',
    title: 'Workout Anywhere',
    desc: 'Mobile-friendly workouts available anytime, anywhere you go.',
  },
  {
    icon: '💎',
    title: 'Affordable Membership',
    desc: 'Premium fitness experience at highly competitive pricing.',
  },
]

function TiltCard({ f, i, inView }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt();

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="glass rounded-2xl p-6 group cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`,
        border: "1px solid rgba(255,255,255,0.06)",
        willChange: "transform",
      }}
    >
      <div className="w-12 h-12 rounded-full bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 flex items-center justify-center text-xl mb-4 group-hover:rotate-12 group-hover:bg-[#FF2A2A]/20 transition-all duration-500">
        {f.icon}
      </div>

      <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#FF2A2A] transition-colors duration-300">
        {f.title}
      </h3>

      <p className="text-white/40 text-sm leading-relaxed">
        {f.desc}
      </p>

      <div className="mt-4 w-0 h-px bg-[#FF2A2A] group-hover:w-full transition-all duration-500" />
    </div>
  );
}

export default function About() {
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const { ref: cardsRef, inView: cardsInView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FF2A2A]/5 rounded-full blur-[100px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left — Text Content */}
          <div ref={titleRef}>
            {/* Label */}
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{
                opacity: titleInView ? 1 : 0,
                transform: titleInView ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.6s ease',
              }}
            >
              <div className="w-8 h-px bg-[#FF2A2A]" />
              <span className="text-[#FF2A2A] text-xs uppercase tracking-widest font-medium">
                About Us
              </span>
            </div>

            {/* Heading */}
            <h2
              className="font-heading text-6xl md:text-7xl leading-none mb-8"
              style={{
                opacity: titleInView ? 1 : 0,
                transform: titleInView ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s ease 0.2s',
              }}
            >
              <span className="text-white block">TRAIN</span>
              <span className="text-white block">SMARTER.</span>
              <span className="text-[#FF2A2A] glow-red-text block">BECOME</span>
              <span className="text-[#FF2A2A] glow-red-text block">STRONGER.</span>
            </h2>

            {/* Body text */}
            <p
              className="text-white/50 text-base leading-relaxed mb-10 max-w-lg"
              style={{
                opacity: titleInView ? 1 : 0,
                transform: titleInView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease 0.4s',
              }}
            >
              We combine science-backed training methods, certified coaches,
              premium equipment, and personalized nutrition plans to deliver
              measurable fitness transformations that last.
            </p>

            {/* CTA */}
            <div
              style={{
                opacity: titleInView ? 1 : 0,
                transform: titleInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s ease 0.6s',
              }}
            >
              <button className="px-8 py-4 bg-[#FF2A2A] text-white font-semibold rounded-full glow-red hover:bg-red-600 transition-all duration-300 hover:scale-105">
                Discover More
              </button>
            </div>
          </div>

          {/* Right — 3D Kettlebell */}
<div className="relative flex items-center justify-center">
  {/* Glow behind 3D */}
  <div className="absolute inset-0 bg-[#FF2A2A]/5 rounded-full blur-[80px]" />

  {/* 3D Scene */}
  <div className="relative z-10 w-full h-[500px]">
    <Suspense fallback={
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-2 border-[#FF2A2A]/30 border-t-[#FF2A2A] animate-spin" />
      </div>
    }>
      <KettlebellScene />
    </Suspense>
  </div>

  {/* Floating badges */}
  <div
    className="absolute top-8 right-8 glass rounded-xl px-4 py-3 text-center z-20"
    style={{ animation: 'float 3s ease-in-out infinite 0.5s' }}
  >
    <div className="text-2xl font-heading text-[#FF2A2A]">98%</div>
    <div className="text-white/50 text-xs">Satisfaction</div>
  </div>

  <div
    className="absolute bottom-8 left-8 glass rounded-xl px-4 py-3 text-center z-20"
    style={{ animation: 'float 3.5s ease-in-out infinite 1s' }}
  >
    <div className="text-2xl font-heading text-[#FF2A2A]">25+</div>
    <div className="text-white/50 text-xs">Programs</div>
  </div>

  <div
    className="absolute top-1/2 -translate-y-1/2 left-0 glass rounded-xl px-4 py-3 text-center z-20"
    style={{ animation: 'float 4s ease-in-out infinite' }}
  >
    <div className="text-2xl font-heading text-[#FF2A2A]">10+</div>
    <div className="text-white/50 text-xs">Years</div>
  </div>
</div>
        </div>

        {/* Why Choose Us Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          {features.map((f, i) => (
            <TiltCard
                key={i}
                f={f}
                i={i}
                inView={cardsInView}
            />
            ))}
        </div>
      </div>

      {/* CSS for float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}