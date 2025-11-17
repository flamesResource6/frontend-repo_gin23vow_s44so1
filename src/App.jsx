import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ProgramCard from './components/ProgramCard'
import PlayerModal from './components/PlayerModal'

function App() {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [selected, setSelected] = useState(null)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true)
      setError('')
      try {
        const params = new URLSearchParams()
        if (query) params.set('q', query)
        if (category) params.set('category', category)
        const res = await fetch(`${backend}/api/programs?${params.toString()}`)
        if (!res.ok) throw new Error('Fel vid hämtning')
        const data = await res.json()
        setPrograms(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPrograms()
  }, [backend, query, category])

  const cats = useMemo(() => {
    const set = new Set()
    programs.forEach(p => p.category && set.add(p.category))
    return ['Alla', ...Array.from(set)]
  }, [programs])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 pb-16">
        <section className="pt-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Titta på gratis TV-program</h1>
          <p className="text-blue-200/80 mt-1">Endast öppna, lagliga källor</p>

          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto] items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Sök efter titel, kategori eller tagg..."
              className="w-full bg-slate-800/60 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <div className="flex gap-2 overflow-x-auto">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c === 'Alla' ? '' : c)}
                  className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                    (c === 'Alla' && !category) || c === category
                      ? 'bg-blue-500 text-white border-blue-400'
                      : 'bg-slate-800/60 text-blue-200 border-white/10 hover:border-blue-400/30'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8">
          {loading && (
            <p className="text-blue-200">Laddar...</p>
          )}
          {error && (
            <p className="text-red-300">{error}</p>
          )}
          {!loading && !error && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((item) => (
                <ProgramCard key={`${item.id}-${item.title}`} item={item} onPlay={setSelected} />
              ))}
            </div>
          )}
        </section>
      </main>

      <PlayerModal open={!!selected} item={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default App
