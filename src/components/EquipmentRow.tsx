import { memo } from 'react'
import { usePower } from '../context/PowerContext'
import { PriorityBadge } from './PriorityBadge'
import { formatWatts } from '../utils/calculations'
import type { Equipment } from '../types'

export const EquipmentRow = memo(function EquipmentRow({ equipment }: { equipment: Equipment }) {
  const { state, dispatch } = usePower()
  const isActive = state.activeEquipment.has(equipment.id)
  const watts = equipment.powerMax * equipment.quantity

  return (
    <div
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
        isActive ? 'bg-white/5' : ''
      }`}
    >
      <button
        type="button"
        role="switch"
        aria-checked={isActive}
        aria-label={`${isActive ? 'Desactivar' : 'Activar'} ${equipment.name}`}
        onClick={() =>
          dispatch({ type: 'TOGGLE_EQUIPMENT', payload: { id: equipment.id } })
        }
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
          {equipment.quantity > 1 && (
            <span className="shrink-0 text-xs text-text-muted">×{equipment.quantity}</span>
          )}
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
  )
})
