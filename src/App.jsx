import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

function Section({ title, children }) {
  return (
    <div className="bg-white/70 backdrop-blur rounded-xl p-5 shadow border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
      {children}
    </div>
  )
}

function App() {
  const [status, setStatus] = useState(null)
  const [rs, setRs] = useState(null)

  useEffect(() => {
    fetch(`${API}/test`).then(r=>r.json()).then(setStatus).catch(()=>setStatus({backend:'Error'}))
  }, [])

  function calcRS(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    const one_rm_kg = parseFloat(fd.get('oneRM') || '0')
    const bodyweight_kg = parseFloat(fd.get('bw') || '0')
    fetch(`${API}/relative-strength`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ one_rm_kg, bodyweight_kg })
    }).then(r=>r.json()).then(setRs)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            MIND X MUSCLE — Coach Toolkit
          </h1>
          <p className="text-slate-600">Quick demo: backend status, relative strength calculator, consent signing preview.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Section title="Backend Status">
            <pre className="text-xs text-slate-700 bg-slate-50 p-3 rounded overflow-auto max-h-48">{status ? JSON.stringify(status, null, 2) : 'Loading...'}</pre>
          </Section>

          <Section title="Relative Strength (1RM / BW)">
            <form onSubmit={calcRS} className="space-y-3">
              <div className="flex items-center gap-2">
                <input name="oneRM" type="number" step="0.1" placeholder="1RM (kg)" className="input input-bordered w-full p-2 rounded border" />
              </div>
              <div className="flex items-center gap-2">
                <input name="bw" type="number" step="0.1" placeholder="Bodyweight (kg)" className="input input-bordered w-full p-2 rounded border" />
              </div>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">Calculate</button>
            </form>
            {rs && (
              <div className="mt-3 text-sm text-slate-800">
                Relative Strength: <span className="font-semibold">{rs.relative_strength}</span>
              </div>
            )}
          </Section>

          <Section title="Digital Consent (Preview)">
            <div className="space-y-2 text-sm text-slate-700">
              <p>Auto-filename: Consent_AswajithSS_ClientName_Date.pdf</p>
              <p>Use the backend to upload a template and sign. This demo stores records in the database.</p>
            </div>
          </Section>
        </div>

        <Section title="What’s included now">
          <ul className="list-disc ml-5 text-slate-700 text-sm">
            <li>Profiles, measurements, sessions, workouts, nutrition, payments, and consent endpoints.</li>
            <li>Relative strength calculator.</li>
            <li>Database-ready using MongoDB collections.</li>
          </ul>
        </Section>
      </div>
    </div>
  )
}

export default App
