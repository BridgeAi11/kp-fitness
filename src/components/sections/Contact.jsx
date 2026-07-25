import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

const contactInfo = [
  {
    icon: '📍',
    label: 'Address',
    value: 'KP Fitness Club, Main Road, Coimbatore, Tamil Nadu 641001',
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+91 63746 42981',
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'info@kpfitness.com',
  },
  {
    icon: '🕐',
    label: 'Working Hours',
    value: 'Mon–Sat: 5AM–11PM\nSunday: 6AM–9PM',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)

    /* Format WhatsApp pre-filled message text */
    const waMessage =
      `*New Contact Inquiry from KP Fitness Website*%0A%0A` +
      `*Name:* ${encodeURIComponent(form.name)}%0A` +
      `*Email:* ${encodeURIComponent(form.email)}%0A` +
      `*Phone:* ${encodeURIComponent(form.phone || 'Not provided')}%0A` +
      `*Message:* ${encodeURIComponent(form.message)}`

    const waUrl = `https://wa.me/916374642981?text=${waMessage}`

    setTimeout(() => {
      window.open(waUrl, '_blank')
      setSent(false)
      setForm({ name: '', email: '', phone: '', message: '' })
    }, 400)
  }

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2A2A]/40 to-transparent" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#FF2A2A]/5 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#FF2A2A]" />
            <span className="text-[#FF2A2A] text-xs uppercase tracking-widest font-medium">
              Get In Touch
            </span>
            <div className="w-8 h-px bg-[#FF2A2A]" />
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white">
            CONTACT <span className="text-[#FF2A2A] glow-red-text">US</span>
          </h2>
          <p className="text-white/50 mt-4 text-sm max-w-xl mx-auto px-2">
            Ready to start your transformation? Reach out via form or WhatsApp and our team will respond right away.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease',
          }}
        >
          {/* Left — Info + Map */}
          <div className="space-y-5 sm:space-y-6">
            {/* Contact info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className="glass rounded-xl p-5 flex items-start gap-4 group hover:border-[#FF2A2A]/30 transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#FF2A2A]/10 border border-[#FF2A2A]/20 flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-[#FF2A2A]/20 transition-all duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-white/50 text-[11px] uppercase tracking-wider mb-1 font-semibold">
                      {info.label}
                    </p>
                    <p className="text-white/85 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map embed */}
            <div
              className="rounded-2xl overflow-hidden h-64 sm:h-72"
              style={{ border: '1px solid rgba(255,42,42,0.2)' }}
            >
              <iframe
                title="KP Fitness Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.47444747754!2d76.901614!3d11.016844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Right — Form */}
          <div className="glass rounded-2xl p-6 sm:p-8 md:p-10" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="text-white font-semibold text-xl mb-6">Send Us a Message</h3>

            {sent && (
              <div className="mb-6 p-4 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-sm flex items-center gap-2">
                <span>✓</span>
                <span>Opening WhatsApp with your message...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 font-semibold">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF2A2A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 font-semibold">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF2A2A]"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 font-semibold">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 63746 42981"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF2A2A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 font-semibold">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your fitness goals..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF2A2A] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#FF2A2A] hover:bg-red-600 text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(255,42,42,0.3)] hover:scale-[1.02] cursor-pointer mt-2 flex items-center justify-center gap-2"
              >
                <span>Send via WhatsApp</span>
                <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}