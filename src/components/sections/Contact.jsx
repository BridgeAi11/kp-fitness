import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

const contactInfo = [
  {
    icon: '📍',
    label: 'Address',
    value: '123 Fitness Street, Coimbatore, Tamil Nadu 641001',
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+91 98765 43210',
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
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2A2A]/40 to-transparent" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#FF2A2A]/5 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#FF2A2A]" />
            <span className="text-[#FF2A2A] text-xs uppercase tracking-widest font-medium">
              Get In Touch
            </span>
            <div className="w-8 h-px bg-[#FF2A2A]" />
          </div>
          <h2 className="font-heading text-6xl md:text-7xl text-white">
            CONTACT <span className="text-[#FF2A2A] glow-red-text">US</span>
          </h2>
          <p className="text-white/40 mt-4 text-sm max-w-xl mx-auto">
            Ready to start your transformation? Reach out and our team will
            get back to you within 24 hours.
          </p>
        </div>

        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease',
          }}
        >
          {/* Left — Info + Map */}
          <div className="space-y-6">
            {/* Contact info cards */}
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
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                    {info.label}
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Map embed */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,42,42,0.2)' }}
            >
              <iframe
                title="KP Fitness Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62617.76646851944!2d76.9355!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="220"
                style={{ filter: 'invert(90%) hue-rotate(180deg)', border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right — Contact Form */}
          <div
            className="glass rounded-2xl p-8"
            style={{ border: '1px solid rgba(255,42,42,0.15)' }}
          >
            <h3 className="font-heading text-3xl text-white mb-6">
              SEND A <span className="text-[#FF2A2A]">MESSAGE</span>
            </h3>

            {sent && (
              <div className="mb-6 px-4 py-3 rounded-xl bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 text-[#FF2A2A] text-sm text-center">
                ✓ Message sent! We will get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#FF2A2A]/50 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#FF2A2A]/50 transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className="w-full border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#FF2A2A]/50 transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your fitness goals..."
                  rows={5}
                  className="w-full border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#FF2A2A]/50 transition-all duration-300 resize-none"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-[#FF2A2A] text-white font-semibold rounded-xl glow-red hover:bg-red-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}