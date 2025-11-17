import { useEffect } from 'react'

export default function PlayerModal({ open, onClose, item }) {
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [open, onClose])

  if (!open || !item) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 max-w-4xl mx-auto mt-16 bg-slate-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div>
            <h3 className="text-white font-semibold leading-tight">{item.title}</h3>
            {item.category && (
              <p className="text-xs text-blue-200/70">{item.category}</p>
            )}
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white text-sm">Stäng</button>
        </div>
        <div className="bg-black">
          {/* Prefer native video tag for MP4/HLS URLs */}
          <video
            src={item.video_url}
            controls
            controlsList="nodownload"
            className="w-full h-full"
            poster={item.thumbnail_url || undefined}
          />
        </div>
      </div>
    </div>
  )
}
