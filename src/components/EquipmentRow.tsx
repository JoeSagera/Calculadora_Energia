import { memo } from 'react'
import { usePower } from '../context/PowerContext'
import { PriorityBadge } from './PriorityBadge'
import { formatWatts } from '../utils/calculations'
import type { Equipment } from '../types'

export const EquipmentRow = memo(function EquipmentRow({ equipment }: { equipment: Equipment }) {
  const { state, dispatch } = usePower()
  const isActive = state.activeEquipment.has(equipment.id)
  const count = state.activeCounts[equipment.id] ?? 0
  const effectiveCount = isActive ? count : 0
  const watts = equipment.powerMax * effectiveCount

  function handleToggle() {
    dispatch({ type: 'TOGGLE_EQUIPMENT', payload: { id: equipment.id, quantity: equipment.quantity } })
  }

  function handleCountChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'SET_COUNT', payload: { id: equipment.id, count: Number(e.target.value) } })
  }

  return (
    <div className={`rounded-lg px-3 py-2 transition-colors ${isActive ? 'bg-white/5' : ''}`}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={isActive}
          aria-label={`${isActive ? 'Desactivar' : 'Activar'} ${equipment.name}`}
          onClick={handleToggle}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
            isActive ? 'bg-accent' : 'bg-white/10'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ${
              isActive ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className={`truncate text-sm font-medium ${isActive ? 'text-text-primary' : 'text-text-secondary'}`}>
              {equipment.name}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <span>{equipment.brand}</span>
            <span>·</span>
            <span>{formatWatts(watts)}</span>
            <span>·</span>
            <span>{equipment.voltage}</span>
          </div>
        </div>

        <PriorityBadge priority={equipment.priority} />
      </div>

      {equipment.quantity > 1 && isActive && (
        <div className="mt-2 pl-14">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={equipment.quantity}
              step={1}
              value={count}
              onChange={handleCountChange}
              className="custom-slider flex-1"
            />
            <span className="shrink-0 text-xs font-mono font-bold text-accent w-8 text-right">
              {count}/{equipment.quantity}
            </span>
          </div>
        </div>
      )}
    </div>
  )
})
