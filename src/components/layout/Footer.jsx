const quickLinks = ['Home', 'About', 'Programs', 'Membership', 'Trainers', 'Gallery', 'Contact']
const programs = ['Strength Training', 'Fat Loss', 'CrossFit', 'HIIT', 'Yoga', 'Bodybuilding']

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2A2A] to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF2A2A]/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-8">
        {/* Main grid: 3 clean columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 mb-16">

          {/* Brand column */}
          <div>
            <div className="font-heading text-4xl mb-4">
              <span className="text-white">KP</span>
              <span className="text-[#FF2A2A] glow-red-text"> FITNESS</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-sm">
              Elite fitness training center dedicated to transforming bodies
              and mindsets since 2014. Your journey to greatness starts here.
            </p>

            <div className="space-y-2">
              <a
                href="tel:+919962259269"
                className="text-white/40 hover:text-[#FF2A2A] text-xs block transition-colors duration-300"
              >
                +91 99622 59269
              </a>
              <a
                href="mailto:info@kpfitness.com"
                className="text-white/40 hover:text-[#FF2A2A] text-xs block transition-colors duration-300"
              >
                info@kpfitness.com
              </a>
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
        </div>
      </div>
    </footer>
  )
}