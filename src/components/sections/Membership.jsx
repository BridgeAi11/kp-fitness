import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Monthly Plan',
    price: '600',
    period: '/month',
    badge: null,
    features: [
      'Full Gym & Cardio Zone Access',
      'Locker & Shower Facility',
      'Free Fitness Assessment',
      'Basic Trainer Assistance',
      'Member Community Access',
    ],
    cta: 'Join Monthly →',
    highlighted: false,
  },
  {
    name: 'Yearly Membership',
    price: '4000',
    period: '/year',
    badge: 'Most Popular',
    features: [
      'Full 12-Month Gym Access',
      'Save Big with 2 Months Free',
      'Free Personal Trainer Intro',
      'VIP Locker & Steam Access',
      'Free KP Fitness Gym Bag',
      'Monthly Progress Review',
    ],
    cta: 'Claim Yearly Pass →',
    highlighted: true,
  },
  {
    name: 'Personal Training',
    price: '3000',
    period: '/month',
    badge: 'Best Value',
    features: [
      'Everything in Gym Access',
      'Dedicated 1-on-1 Certified Coach',
      'Custom Diet & Meal Plan',
      'Daily Workout & Form Checks',
      'Weekly Body Composition Track',
      'Priority Equipment Access',
    ],
    cta: 'Get Personal Coach →',
    highlighted: false,
  },
]

const easeCinematic = [0.16, 1, 0.3, 1]

export default function Membership() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="membership" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF2A2A]/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2A2A]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2A2A]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: easeCinematic }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#FF2A2A]" />
            <span className="text-[#FF2A2A] text-xs uppercase tracking-widest font-semibold">
              Pricing Plans
            </span>
            <div className="w-8 h-px bg-[#FF2A2A]" />
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white tracking-tight">
            MEMBERSHIP <span className="text-[#FF2A2A] glow-red-text">PLANS</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto text-sm sm:text-base px-2">
            Choose the plan that fits your transformation goals. No hidden fees.
          </p>
        </motion.div>

        {/* Cards Grid: Monthly -> Yearly (Most Popular) -> Personal Training */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: easeCinematic }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group flex flex-col"
            >
              {/* Glowing Outline for Highlighted Card (Yearly) */}
              {plan.highlighted && (
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#FF2A2A] via-[#FF2A2A]/40 to-transparent pointer-events-none shadow-[0_0_35px_rgba(255,42,42,0.35)]" />
              )}

              <div
                className={`relative rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-between transition-all duration-500 hover:border-[#FF2A2A]/50 ${plan.highlighted
                    ? 'bg-gradient-to-b from-[#180202] to-[#0A0202]'
                    : 'glass hover:bg-white/[0.04]'
                  }`}
                style={{
                  border: plan.highlighted ? '1px solid rgba(255,42,42,0.55)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Top Badge */}
                {plan.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-white text-[11px] font-extrabold rounded-full uppercase tracking-wider ${plan.highlighted
                      ? 'bg-[#FF2A2A] shadow-[0_4px_16px_rgba(255,42,42,0.6)]'
                      : 'bg-white/10 border border-white/20 backdrop-blur-md'
                    }`}>
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Plan Header */}
                  <div className="mb-6 pt-2">
                    <h3 className={`font-heading text-2xl sm:text-3xl tracking-wide mb-1 ${plan.highlighted ? 'text-white' : 'text-white'
                      }`}>
                      {plan.name}
                    </h3>
                    <div className="w-10 h-0.5 bg-[#FF2A2A]" />
                  </div>

                  {/* Pricing Display */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-end gap-1">
                      <span className="text-[#FF2A2A] text-2xl font-bold">₹</span>
                      <span className={`font-heading text-5xl sm:text-6xl leading-none font-black ${plan.highlighted ? 'text-white glow-red-text' : 'text-white'
                        }`}>
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-white/40 text-xs sm:text-sm mt-1.5 font-medium">{plan.period}</p>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/10 mb-6" />

                  {/* Features Checklist */}
                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${plan.highlighted
                            ? 'bg-[#FF2A2A] text-white shadow-[0_0_10px_rgba(255,42,42,0.6)]'
                            : 'bg-[#FF2A2A]/20 text-[#FF2A2A]'
                          }`}>
                          ✓
                        </div>
                        <span className="text-white/80 text-xs sm:text-sm leading-tight">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action Button */}
                <button
                  onClick={() => window.location.href = 'tel:+919962259269'}
                  className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2 ${plan.highlighted
                      ? 'bg-[#FF2A2A] text-white shadow-[0_6px_24px_rgba(255,42,42,0.45)] hover:bg-red-600'
                      : 'border border-[#FF2A2A]/50 text-white hover:bg-[#FF2A2A] hover:border-[#FF2A2A]'
                    }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}