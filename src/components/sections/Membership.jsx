import { useInView } from 'react-intersection-observer'

const plans = [
  {
    name: 'Basic',
    price: '999',
    period: '/month',
    badge: null,
    features: [
      'Gym Access',
      'Locker Facility',
      'Cardio Zone',
      'Basic Equipment',
      'Community Support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '1999',
    period: '/month',
    badge: 'Most Popular',
    features: [
      'Everything in Basic',
      'Personal Trainer',
      'Custom Diet Plan',
      'Unlimited Classes',
      'Progress Tracking',
      'Priority Booking',
    ],
    cta: 'Join Premium',
    highlighted: true,
  },
  {
    name: 'Elite',
    price: '3999',
    period: '/month',
    badge: 'Best Value',
    features: [
      'VIP Gym Access',
      'Dedicated Coach',
      'Monthly Assessment',
      'Supplement Consultation',
      'Exclusive Workshops',
      'Recovery Sessions',
      '24/7 Coach Access',
    ],
    cta: 'Go Elite',
    highlighted: false,
  },
]

export default function Membership() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="membership" className="py-32 relative overflow-hidden">
      {/* Bg glow */}
      <div className="absolute inset-0 bg-[#FF2A2A]/3" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2A2A]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2A2A]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#FF2A2A]" />
            <span className="text-[#FF2A2A] text-xs uppercase tracking-widest font-medium">
              Pricing Plans
            </span>
            <div className="w-8 h-px bg-[#FF2A2A]" />
          </div>
          <h2 className="font-heading text-6xl md:text-7xl text-white">
            MEMBERSHIP <span className="text-[#FF2A2A] glow-red-text">PLANS</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto text-sm">
            Choose the plan that fits your goals. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="relative group"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView
                  ? plan.highlighted ? 'translateY(-16px)' : 'translateY(0)'
                  : 'translateY(60px)',
                transition: `all 0.8s ease ${i * 0.15}s`,
              }}
            >
              {/* Highlighted card gets special treatment */}
              {plan.highlighted && (
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#FF2A2A] to-[#FF2A2A]/20" />
              )}

              <div
                className={`relative rounded-2xl p-8 h-full flex flex-col ${
                  plan.highlighted
                    ? 'bg-[#0f0000]'
                    : 'glass'
                }`}
                style={{
                  border: plan.highlighted ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF2A2A] text-white text-xs font-bold rounded-full uppercase tracking-wider glow-red">
                    {plan.badge}
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-6">
                  <h3 className={`font-heading text-3xl tracking-wide mb-1 ${
                    plan.highlighted ? 'text-[#FF2A2A]' : 'text-white'
                  }`}>
                    {plan.name}
                  </h3>
                  <div className="w-8 h-px bg-[#FF2A2A]" />
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span className="text-white/40 text-lg">₹</span>
                    <span className={`font-heading text-6xl leading-none ${
                      plan.highlighted ? 'text-white glow-red-text' : 'text-white'
                    }`}>
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-white/30 text-sm mt-1">{plan.period}</p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 mb-6" />

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                        plan.highlighted
                          ? 'bg-[#FF2A2A] text-white'
                          : 'bg-[#FF2A2A]/20 text-[#FF2A2A]'
                      }`}>
                        ✓
                      </div>
                      <span className="text-white/60 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                    plan.highlighted
                      ? 'bg-[#FF2A2A] text-white glow-red hover:bg-red-500'
                      : 'border border-[#FF2A2A]/40 text-[#FF2A2A] hover:bg-[#FF2A2A] hover:text-white hover:border-[#FF2A2A]'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}