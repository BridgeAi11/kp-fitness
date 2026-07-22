import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function CalorieCalculator() {
  const [form, setForm] = useState({
    age: '', weight: '', height: '', gender: 'male', activity: '1.375', goal: 'maintenance',
  })
  const [result, setResult] = useState(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const activityLevels = [
    { label: 'Sedentary', value: '1.2' },
    { label: 'Light Exercise', value: '1.375' },
    { label: 'Moderate', value: '1.55' },
    { label: 'Very Active', value: '1.725' },
    { label: 'Athlete', value: '1.9' },
  ]

  const goals = [
    { label: 'Weight Loss', value: 'loss', adjust: -500 },
    { label: 'Maintenance', value: 'maintenance', adjust: 0 },
    { label: 'Muscle Gain', value: 'gain', adjust: 300 },
  ]

  const calculate = () => {
    const { age, weight, height, gender, activity, goal } = form
    if (!age || !weight || !height) return

    // Mifflin-St Jeor formula
    let bmr
    if (gender === 'male') {
      bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) + 5
    } else {
      bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) - 161
    }

    const tdee = bmr * parseFloat(activity)
    const goalObj = goals.find((g) => g.value === goal)
    const calories = Math.round(tdee + goalObj.adjust)
    const protein = Math.round((calories * 0.3) / 4)
    const carbs = Math.round((calories * 0.4) / 4)
    const fat = Math.round((calories * 0.3) / 9)

    setResult({ calories, protein, carbs, fat, goal })
  }

  const macros = result
    ? [
        { label: 'Calories', value: result.calories, unit: 'kcal', color: '#FF2A2A', pct: 100 },
        { label: 'Protein', value: result.protein, unit: 'g', color: '#3B8BD4', pct: 30 },
        { label: 'Carbs', value: result.carbs, unit: 'g', color: '#f59e0b', pct: 40 },
        { label: 'Fat', value: result.fat, unit: 'g', color: '#22c55e', pct: 30 },
      ]
    : []

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2A2A]/40 to-transparent" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#FF2A2A]/4 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#FF2A2A]" />
            <span className="text-[#FF2A2A] text-xs uppercase tracking-widest font-medium">
              Nutrition Tool
            </span>
            <div className="w-8 h-px bg-[#FF2A2A]" />
          </div>
          <h2 className="font-heading text-6xl md:text-7xl text-white">
            CALORIE <span className="text-[#FF2A2A] glow-red-text">CALCULATOR</span>
          </h2>
          <p className="text-white/40 mt-4 text-sm">
            Calculate your daily calorie needs and macro breakdown.
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
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left — Inputs */}
            <div className="space-y-5">
              {/* Gender */}
              <div>
                <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['male', 'female'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setForm({ ...form, gender: g })}
                      className="py-3 rounded-xl text-sm font-medium capitalize transition-all duration-300"
                      style={{
                        background: form.gender === g ? '#FF2A2A' : 'rgba(255,255,255,0.03)',
                        border: form.gender === g ? '1px solid #FF2A2A' : '1px solid rgba(255,255,255,0.1)',
                        color: form.gender === g ? '#fff' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {g === 'male' ? '♂ Male' : '♀ Female'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number inputs */}
              {[
                { label: 'Age', key: 'age', unit: 'yrs', placeholder: '25' },
                { label: 'Weight', key: 'weight', unit: 'kg', placeholder: '70' },
                { label: 'Height', key: 'height', unit: 'cm', placeholder: '175' },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                    {f.label}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={form[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#FF2A2A]/50 transition-all pr-14"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs uppercase">
                      {f.unit}
                    </span>
                  </div>
                </div>
              ))}

              {/* Activity */}
              <div>
                <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                  Activity Level
                </label>
                <select
                  value={form.activity}
                  onChange={(e) => setForm({ ...form, activity: e.target.value })}
                  className="w-full border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF2A2A]/50 transition-all"
                  style={{ background: '#0d0d0d' }}
                >
                  {activityLevels.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                  Goal
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {goals.map((g) => (
                    <button
                      key={g.value}
                      onClick={() => setForm({ ...form, goal: g.value })}
                      className="py-3 rounded-xl text-xs font-medium transition-all duration-300"
                      style={{
                        background: form.goal === g.value ? '#FF2A2A' : 'rgba(255,255,255,0.03)',
                        border: form.goal === g.value ? '1px solid #FF2A2A' : '1px solid rgba(255,255,255,0.1)',
                        color: form.goal === g.value ? '#fff' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={calculate}
                className="w-full py-4 bg-[#FF2A2A] text-white font-semibold rounded-xl glow-red hover:bg-red-600 transition-all duration-300 hover:scale-[1.02]"
              >
                Calculate Macros
              </button>
            </div>

            {/* Right — Results */}
            <div className="flex flex-col justify-center">
              {result ? (
                <div style={{ animation: 'fadeIn 0.5s ease' }}>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-6 text-center">
                    Your Daily Targets
                  </p>

                  <div className="space-y-4">
                    {macros.map((m) => (
                      <div key={m.label}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white/60 text-sm">{m.label}</span>
                          <span className="font-heading text-xl" style={{ color: m.color }}>
                            {m.value}
                            <span className="text-xs ml-1 font-sans text-white/30">
                              {m.unit}
                            </span>
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${m.pct}%`,
                              background: m.color,
                              boxShadow: `0 0 8px ${m.color}60`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Goal badge */}
                  <div className="mt-8 p-4 rounded-xl text-center"
                    style={{ background: 'rgba(255,42,42,0.05)', border: '1px solid rgba(255,42,42,0.15)' }}
                  >
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                      Optimized for
                    </p>
                    <p className="text-[#FF2A2A] font-heading text-2xl">
                      {goals.find((g) => g.value === result.goal)?.label}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-40 h-40 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mx-auto mb-4">
                    <div className="text-4xl">🥗</div>
                  </div>
                  <p className="text-white/20 text-sm">
                    Fill in your details to see your macro targets
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