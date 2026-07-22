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

  // Gauge arc calculation
  const radius = 80
  const circumference = Math.PI * radius
  const strokeDashoffset = result
    ? circumference - (result.gauge / 100) * circumference
    : circumference

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2A2A]/40 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF2A2A]/4 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#FF2A2A]" />
            <span className="text-[#FF2A2A] text-xs uppercase tracking-widest font-medium">
              Health Tools
            </span>
            <div className="w-8 h-px bg-[#FF2A2A]" />
          </div>
          <h2 className="font-heading text-6xl md:text-7xl text-white">
            BMI <span className="text-[#FF2A2A] glow-red-text">CALCULATOR</span>
          </h2>
          <p className="text-white/40 mt-4 text-sm">
            Know your Body Mass Index and get personalized recommendations.
          </p>
        </div>

        <div
          ref={ref}
          className="glass rounded-2xl p-8 md:p-12"
          style={{
            border: '1px solid rgba(255,42,42,0.15)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease',
          }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Inputs */}
            <div className="space-y-6">
              {[
                { label: 'Height', name: 'height', unit: 'cm', value: height, set: setHeight, placeholder: 'e.g. 175' },
                { label: 'Weight', name: 'weight', unit: 'kg', value: weight, set: setWeight, placeholder: 'e.g. 70' },
                { label: 'Age', name: 'age', unit: 'yrs', value: age, set: setAge, placeholder: 'e.g. 25' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#FF2A2A]/50 transition-all duration-300 pr-14"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs uppercase">
                      {field.unit}
                    </span>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={calculate}
                  className="flex-1 py-4 bg-[#FF2A2A] text-white font-semibold rounded-xl glow-red hover:bg-red-600 transition-all duration-300 hover:scale-[1.02]"
                >
                  Calculate BMI
                </button>
                {result && (
                  <button
                    onClick={reset}
                    className="px-6 py-4 glass border border-white/10 text-white/50 rounded-xl hover:border-white/30 hover:text-white transition-all duration-300 text-sm"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col items-center">
              {result ? (
                <div
                  className="text-center w-full"
                  style={{ animation: 'fadeIn 0.5s ease' }}
                >
                  {/* Gauge */}
                  <div className="relative flex justify-center mb-6">
                    <svg width="200" height="110" viewBox="0 0 200 110">
                      {/* Background arc */}
                      <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      {/* Colored arc */}
                      <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke={result.color}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{
                          transition: 'stroke-dashoffset 1s ease',
                          filter: `drop-shadow(0 0 8px ${result.color})`,
                        }}
                      />
                      {/* BMI value in center */}
                      <text
                        x="100"
                        y="85"
                        textAnchor="middle"
                        fill="white"
                        fontSize="28"
                        fontWeight="700"
                        fontFamily="'Bebas Neue', cursive"
                      >
                        {result.bmi}
                      </text>
                      <text
                        x="100"
                        y="102"
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.4)"
                        fontSize="10"
                        fontFamily="Inter, sans-serif"
                      >
                        BMI Score
                      </text>
                    </svg>
                  </div>

                  {/* Status badge */}
                  <div
                    className="inline-block px-6 py-2 rounded-full text-sm font-semibold mb-4"
                    style={{
                      background: `${result.color}20`,
                      border: `1px solid ${result.color}50`,
                      color: result.color,
                    }}
                  >
                    {result.status}
                  </div>

                  {/* BMI scale */}
                  <div className="grid grid-cols-4 gap-1 mb-6 text-xs">
                    {[
                      { label: 'Under', range: '< 18.5', color: '#3B8BD4' },
                      { label: 'Normal', range: '18.5–24.9', color: '#22c55e' },
                      { label: 'Over', range: '25–29.9', color: '#f59e0b' },
                      { label: 'Obese', range: '30+', color: '#FF2A2A' },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <div
                          className="h-1 rounded-full mb-1"
                          style={{ background: s.color }}
                        />
                        <div className="text-white/30" style={{ fontSize: '9px' }}>
                          {s.range}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendation */}
                  <div
                    className="p-4 rounded-xl text-left"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-2">
                      Recommendation
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {result.recommendation}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-40 h-40 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mb-4 mx-auto">
                    <div className="text-center">
                      <div className="text-4xl mb-2">⚖️</div>
                      <div className="text-white/20 text-xs">Enter details</div>
                    </div>
                  </div>
                  <p className="text-white/20 text-sm">
                    Fill in your details and click Calculate
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  )
}