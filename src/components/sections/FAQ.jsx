import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

const faqs = [
  {
    q: 'What are your gym timings?',
    a: 'We are open 7 days a week from 5:00 AM to 11:00 PM. Elite members get 24/7 access with their key card.',
  },
  {
    q: 'Do you offer a free trial?',
    a: 'Yes! We offer a 3-day free trial for all new members. Visit us with a valid ID and experience KP Fitness before committing.',
  },
  {
    q: 'Can I switch between membership plans?',
    a: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect from the next billing cycle.',
  },
  {
    q: 'Is personal training included in all plans?',
    a: 'Personal training is included in our Premium and Elite plans. Basic members can add individual PT sessions at ₹500 per session.',
  },
  {
    q: 'Do you provide nutrition and diet plans?',
    a: 'Yes, our certified nutritionists create customized diet plans for Premium and Elite members based on your goals and body type.',
  },
  {
    q: 'What equipment do you have available?',
    a: 'We have over 200 pieces of premium equipment including free weights, cable machines, smith machines, cardio equipment, and a dedicated CrossFit zone.',
  },
  {
    q: 'Is there parking available?',
    a: 'Yes, we have free covered parking available for all members 24/7 with security surveillance.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2A2A]/40 to-transparent" />

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#FF2A2A]" />
            <span className="text-[#FF2A2A] text-xs uppercase tracking-widest font-medium">
              Got Questions?
            </span>
            <div className="w-8 h-px bg-[#FF2A2A]" />
          </div>
          <h2 className="font-heading text-6xl md:text-7xl text-white">
            FAQs
          </h2>
        </div>

        {/* Accordion */}
        <div ref={ref} className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass rounded-xl overflow-hidden"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${i * 0.08}s`,
                border: open === i
                  ? '1px solid rgba(255,42,42,0.3)'
                  : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Question */}
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`font-medium text-sm transition-colors duration-300 ${
                  open === i ? 'text-[#FF2A2A]' : 'text-white/80 group-hover:text-white'
                }`}>
                  {faq.q}
                </span>

                <span
                  className="w-6 h-6 rounded-full border flex items-center justify-center text-xs flex-shrink-0 ml-4 transition-all duration-300"
                  style={{
                    borderColor: open === i ? '#FF2A2A' : 'rgba(255,255,255,0.2)',
                    color: open === i ? '#FF2A2A' : 'rgba(255,255,255,0.4)',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                  }}
                >
                  +
                </span>
              </button>

              {/* Answer */}
              <div
                style={{
                  maxHeight: open === i ? '200px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                }}
              >
                <p className="px-6 pb-5 text-white/40 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}