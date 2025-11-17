import { Menu } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-slate-900/70 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="Flames" className="w-8 h-8" />
          <div>
            <p className="text-white font-semibold leading-none">Free TV</p>
            <p className="text-xs text-blue-200/70">Open, legal programs</p>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-white/5 text-blue-100">
          <Menu size={20} />
        </button>
      </div>
    </header>
  )
}
