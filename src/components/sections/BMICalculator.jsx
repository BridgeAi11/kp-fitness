import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function BMICalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [age, setAge] = useState('')
  const [result, setResult] = useState(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const calculate = () => {
    if (!height || !weight) return
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    const bmi = (w / (h * h)).toFixed(1)

    let status = ''
    let color = ''
    let recommendation = ''
    let gauge = 0

    if (bmi < 18.5) {
      status = 'Underweight'
      color = '#3B8BD4'
      recommendation = 'Focus on strength training and a calorie surplus diet to build healthy mass.'
      gauge = 15
    } else if (bmi < 25) {
      status = 'Normal Weight'
      color = '#22c55e'
      recommendation = 'Great shape! Maintain with balanced training and nutrition.'
      gauge = 40
    } else if (bmi < 30) {
      status = 'Overweight'
      color = '#f59e0b'
      recommendation = 'Combine cardio and strength training with a calorie deficit diet.'
      gauge = 65
    } else {
      status = 'Obese'
      color = '#FF2A2A'
      recommendation = 'Start with low-impact cardio and consult our nutrition team immediately.'
      gauge = 88
    }

    setResult({ bmi, status, color, recommendation, gauge })
  }

  const reset = () => {
    setResult(null)
    setHeight('')
    setWeight('')
    setAge('')
  }

  const radius = 80
  const circumference = Math.PI * radius
  const strokeDashoffset = result
    ? circumference - (result.gauge / 100) * circumference
    : circumference

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2A2A]/40 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-125 h-96 sm:h-125 bg-[#FF2A2A]/4 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#FF2A2A]" />
            <span className="text-[#FF2A2A] text-xs uppercase tracking-widest font-medium">
              Health Tools
            </span>
            <div className="w-8 h-px bg-[#FF2A2A]" />
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white">
            BMI <span className="text-[#FF2A2A] glow-red-text">CALCULATOR</span>
          </h2>
          <p className="text-white/50 mt-4 text-sm px-2">
            Know your Body Mass Index and get personalized recommendations.
          </p>
        </div>

        <div
          ref={ref}
          className="glass rounded-2xl p-6 sm:p-10 md:p-12"
          style={{
            border: '1px solid rgba(255,42,42,0.15)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Inputs */}
            <div className="space-y-5 sm:space-y-6">
              {[
                { label: 'Height', name: 'height', unit: 'cm', value: height, set: setHeight, placeholder: 'e.g. 175' },
                { label: 'Weight', name: 'weight', unit: 'kg', value: weight, set: setWeight, placeholder: 'e.g. 70' },
                { label: 'Age', name: 'age', unit: 'yrs', value: age, set: setAge, placeholder: 'e.g. 25' },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                    {f.label} ({f.unit})
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={f.value}
                      onChange={(e) => f.set(e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#FF2A2A] transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs uppercase font-medium">
                      {f.unit}
                    </span>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={calculate}
                  className="flex-1 py-3.5 bg-[#FF2A2A] hover:bg-red-600 text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(255,42,42,0.3)] hover:scale-[1.02] cursor-pointer"
                >
                  Calculate BMI
                </button>
                {result && (
                  <button
                    onClick={reset}
                    className="px-5 py-3.5 border border-white/10 hover:border-white/20 text-white/60 hover:text-white rounded-xl text-sm transition-all duration-300 cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Gauge & Result Display */}
            <div className="flex flex-col items-center justify-center p-6 bg-white/3 rounded-xl border border-white/5">
              <div className="relative w-52 h-28 flex items-end justify-center overflow-hidden">
                <svg className="w-52 h-52 transform -rotate-180">
                  <circle
                    cx="104"
                    cy="104"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="14"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="104"
                    cy="104"
                    r={radius}
                    fill="none"
                    stroke={result ? result.color : '#FF2A2A'}
                    strokeWidth="14"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                  />
                </svg>

                <div className="absolute bottom-2 text-center">
                  <div className="text-3xl font-bold text-white">
                    {result ? result.bmi : '--'}
                  </div>
                  <div className="text-xs uppercase font-medium tracking-wider mt-1" style={{ color: result ? result.color : 'rgba(255,255,255,0.3)' }}>
                    {result ? result.status : 'Enter Details'}
                  </div>
                </div>
              </div>

              {result && (
                <div className="mt-6 text-center space-y-2 max-w-xs">
                  <p className="text-white/70 text-xs leading-relaxed">
                    {result.recommendation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}