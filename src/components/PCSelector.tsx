import { usePower } from '../context/PowerContext'
import { PC_MAX_COUNT } from '../types'
import { formatWatts } from '../utils/calculations'

export function PCSelector() {
  const { state, dispatch } = usePower()
  const count = state.activePcCount
  const wattsPerPc = 400

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'SET_PC_COUNT', payload: { count: Number(e.target.value) } })
  }

  return (
    <div className="rounded-xl border border-white/5 bg-arcade-dark p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-base font-bold">PCs Gamer</h3>
          <p className="text-xs text-text-muted">
            i7 + RTX 3060 Ti — {formatWatts(wattsPerPc)} c/u
          </p>
        </div>
        <div className="text-right">
          <span className="font-heading text-3xl font-black text-accent">
            {count}
          </span>
          <span className="text-text-muted">/{PC_MAX_COUNT}</span>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={PC_MAX_COUNT}
        step={1}
        value={count}
        onChange={handleChange}
        className="custom-slider w-full"
      />

      <div className="mt-1 flex justify-between text-[10px] text-text-muted">
        {Array.from({ length: PC_MAX_COUNT + 1 }, (_, i) => (
          <span key={i} className={i === count ? 'text-accent font-bold' : ''}>
            {i}
          </span>
        ))}
      </div>

      {count > 0 && (
        <p className="mt-2 text-right text-sm text-text-secondary font-semibold">
          {formatWatts(count * wattsPerPc)}
        </p>
      )}
    </div>
  )
}
