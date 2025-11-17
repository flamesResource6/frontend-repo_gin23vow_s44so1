export default function ProgramCard({ item, onPlay }) {
  return (
    <div className="group rounded-xl overflow-hidden bg-slate-800/60 border border-white/5 hover:border-blue-400/30 transition-colors">
      <div className="aspect-video bg-slate-900/40 overflow-hidden">
        {item.thumbnail_url ? (
          <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
        ) : (
          <div className="w-full h-full grid place-items-center text-blue-200/50 text-sm">No thumbnail</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-white font-semibold tracking-tight">{item.title}</h3>
          {item.duration_seconds && (
            <span className="text-xs text-blue-200/70 px-2 py-1 rounded bg-white/5">
              {Math.round(item.duration_seconds / 60)}m
            </span>
          )}
        </div>
        {item.description && (
          <p className="text-blue-200/80 text-sm mt-1 line-clamp-2">{item.description}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags?.slice(0, 3).map((t) => (
            <span key={t} className="text-[11px] text-blue-200/70 bg-white/5 px-2 py-0.5 rounded">#{t}</span>
          ))}
        </div>
        <button
          onClick={() => onPlay(item)}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded-lg transition-colors"
        >
          Spela
        </button>
      </div>
    </div>
  )
}
