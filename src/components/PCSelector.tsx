import { usePower } from '../context/PowerContext'
import { PC_MAX_COUNT } from '../types'
import { formatWatts } from '../utils/calculations'

export function PCSelector() {
  const { state, dispatch } = usePower()
  const count = state.activePcCount

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'SET_PC_COUNT', payload: { count: Number(e.target.value) } })
  }

  const wattsPerPc = 400

  return (
    <div className="rounded-xl border border-arcade-blue-gray/20 bg-arcade-dark p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🖥️</span>
          <div>
            <h3 className="font-heading text-lg font-bold text-arcade-white">
              PCs Gamer
            </h3>
            <p className="text-xs text-arcade-blue-gray">
              i7 + RTX 3060 Ti — {formatWatts(wattsPerPc)} c/u
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-heading text-3xl font-black text-arcade-neon-magenta">
            {count}
          </span>
          <span className="text-arcade-blue-gray">/{PC_MAX_COUNT}</span>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={PC_MAX_COUNT}
        step={1}
        value={count}
        onChange={handleChange}
        className="pc-slider w-full"
      />

      <div className="mt-1 flex justify-between text-[10px] text-arcade-blue-gray/50">
        {Array.from({ length: PC_MAX_COUNT + 1 }, (_, i) => (
          <span key={i} className={i === count ? 'text-arcade-neon-magenta font-bold' : ''}>
            {i}
          </span>
        ))}
      </div>

      {count > 0 && (
        <p className="mt-2 text-right text-sm text-arcade-neon-yellow font-semibold">
          {formatWatts(count * wattsPerPc)}
        </p>
      )}
    </div>
  )
}
