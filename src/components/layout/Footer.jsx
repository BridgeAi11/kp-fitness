import { useState } from 'react'

const quickLinks = ['Home', 'About', 'Programs', 'Membership', 'Trainers', 'Gallery', 'Contact']
const programs = ['Strength Training', 'Fat Loss', 'CrossFit', 'HIIT', 'Yoga', 'Bodybuilding']
const socials = [
  { label: 'Instagram', icon: '📸', href: '#' },
  { label: 'Facebook', icon: '👥', href: '#' },
  { label: 'YouTube', icon: '▶️', href: '#' },
  { label: 'Twitter', icon: '🐦', href: '#' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2A2A] to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF2A2A]/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="font-heading text-4xl mb-4">
              <span className="text-white">KP</span>
              <span className="text-[#FF2A2A] glow-red-text"> FITNESS</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Elite fitness training center dedicated to transforming bodies
              and mindsets since 2014. Your journey to greatness starts here.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 glass rounded-full flex items-center justify-center text-sm hover:border-[#FF2A2A]/40 hover:bg-[#FF2A2A]/10 transition-all duration-300"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                    {s.icon}
                </a>
                ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl text-white mb-6 tracking-wide">
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
               <li key={link}>
                <a
                    href={`#${link.toLowerCase()}`}
                    className="text-white/40 text-sm hover:text-[#FF2A2A] transition-colors duration-300 flex items-center gap-2 group"
                >
                    <span className="w-0 h-px bg-[#FF2A2A] group-hover:w-3 transition-all duration-300" />
                    {link}
                </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-heading text-xl text-white mb-6 tracking-wide">
              PROGRAMS
            </h4>
            <ul className="space-y-3">
              {programs.map((p) => (
              <li key={p}>
                <a
                    href="#programs"
                    className="text-white/40 text-sm hover:text-[#FF2A2A] transition-colors duration-300 flex items-center gap-2 group"
                >
                    <span className="w-0 h-px bg-[#FF2A2A] group-hover:w-3 transition-all duration-300" />
                    {p}
                </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading text-xl text-white mb-6 tracking-wide">
              NEWSLETTER
            </h4>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Subscribe for fitness tips, offers, and updates delivered to your inbox.
            </p>

            {subscribed ? (
              <div className="px-4 py-3 rounded-xl bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 text-[#FF2A2A] text-sm text-center">
                ✓ Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#FF2A2A]/50 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#FF2A2A] text-white text-sm font-semibold rounded-xl glow-red hover:bg-red-600 transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            )}

            {/* Contact quick info */}
            <div className="mt-6 space-y-2">
              <p className="text-white/30 text-xs flex items-center gap-2">
                <span>📞</span> +91 99622 59269
              </p>
              <p className="text-white/30 text-xs flex items-center gap-2">
                <span>✉️</span> info@kpfitness.com
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} KP Fitness. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-white/20 text-xs hover:text-[#FF2A2A] transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-white/20 text-xs hover:text-[#FF2A2A] transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-white/20 text-xs hover:text-[#FF2A2A] transition-colors duration-300">
              Refund Policy
            </a>
          </div>

          <p className="text-white/20 text-xs">
            Designed with ❤️ for fitness lovers
          </p>
        </div>
      </div>
    </footer>
  )
}