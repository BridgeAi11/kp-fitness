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
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2A2A]/40 to-transparent" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#FF2A2A]/4 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#FF2A2A]" />
            <span className="text-[#FF2A2A] text-xs uppercase tracking-widest font-medium">
              Nutrition Tool
            </span>
            <div className="w-8 h-px bg-[#FF2A2A]" />
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white">
            CALORIE <span className="text-[#FF2A2A] glow-red-text">CALCULATOR</span>
          </h2>
          <p className="text-white/50 mt-4 text-sm px-2">
            Calculate your daily calorie needs and macro breakdown.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Left — Inputs */}
            <div className="space-y-5">
              {/* Gender */}
              <div>
                <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['male', 'female'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setForm({ ...form, gender: g })}
                      className={`py-3 rounded-xl text-xs uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                        form.gender === g
                          ? 'bg-[#FF2A2A] text-white shadow-[0_4px_16px_rgba(255,42,42,0.3)]'
                          : 'bg-white/5 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age, Weight, Height */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Age', key: 'age', placeholder: '25' },
                  { label: 'Weight (kg)', key: 'weight', placeholder: '70' },
                  { label: 'Height (cm)', key: 'height', placeholder: '175' },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-white/50 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1.5 truncate">
                      {f.label}
                    </label>
                    <input
                      type="number"
                      value={form[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF2A2A]"
                    />
                  </div>
                ))}
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
                  Activity Level
                </label>
                <select
                  value={form.activity}
                  onChange={(e) => setForm({ ...form, activity: e.target.value })}
                  className="w-full bg-[#12141C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF2A2A] cursor-pointer"
                >
                  {activityLevels.map((a) => (
                    <option key={a.value} value={a.value} className="bg-[#12141C] text-white">
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
                  Primary Goal
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {goals.map((g) => (
                    <button
                      key={g.value}
                      onClick={() => setForm({ ...form, goal: g.value })}
                      className={`py-2.5 px-2 rounded-xl text-[11px] font-semibold transition-all duration-300 cursor-pointer text-center ${
                        form.goal === g.value
                          ? 'bg-[#FF2A2A] text-white'
                          : 'bg-white/5 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={calculate}
                className="w-full py-3.5 bg-[#FF2A2A] hover:bg-red-600 text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(255,42,42,0.3)] hover:scale-[1.02] cursor-pointer mt-4"
              >
                Calculate Calories
              </button>
            </div>

            {/* Right — Macro Output */}
            <div className="flex flex-col justify-center bg-white/3 rounded-xl p-6 border border-white/5">
              {result ? (
                <div className="space-y-6">
                  <div className="text-center pb-4 border-b border-white/10">
                    <span className="text-white/40 text-xs uppercase tracking-wider font-semibold">Daily Requirement</span>
                    <div className="text-5xl font-extrabold text-[#FF2A2A] mt-1 glow-red-text">
                      {result.calories} <span className="text-xl font-normal text-white/60">kcal</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {macros.slice(1).map((m) => (
                      <div key={m.label}>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-white/70">{m.label}</span>
                          <span style={{ color: m.color }}>{m.value} {m.unit}</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${m.pct}%`, backgroundColor: m.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-white/30 text-sm">
                  Fill in your details and hit calculate to view your personalized daily calorie and macro breakdown.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}