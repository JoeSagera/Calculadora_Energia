import { usePower } from '../context/PowerContext'
import { EquipmentRow } from './EquipmentRow'
import { formatWatts } from '../utils/calculations'
import type { Area } from '../types'

export function AreaCard({ area }: { area: Area }) {
  const { state, dispatch, powerInfo } = usePower()

  const areaPower = powerInfo.areaBreakdown.find((a) => a.areaId === area.id)
  const activeCount = area.equipment.filter((eq) =>
    state.activeEquipment.has(eq.id),
  ).length
  const allActive = activeCount === area.equipment.length && area.equipment.length > 0

  function handleToggleAll() {
    dispatch({ type: 'TOGGLE_AREA', payload: { areaId: area.id, activate: !allActive } })
  }

  return (
    <div className="rounded-xl border border-white/5 bg-arcade-dark">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{area.icon}</span>
          <div>
            <h3 className="font-heading text-base font-bold">{area.name}</h3>
            <p className="text-xs text-text-muted">
              {activeCount}/{area.equipment.length} equipos
              {areaPower && areaPower.watts > 0 && (
                <> · {formatWatts(areaPower.watts)}</>
              )}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleToggleAll}
          className="text-xs font-semibold text-accent hover:text-text-primary transition-colors"
        >
          {allActive ? 'Desactivar todo' : 'Activar todo'}
        </button>
      </div>

      <div className="border-t border-white/5 px-2 py-2">
        <div className="space-y-1">
          {area.equipment.map((eq) => (
            <EquipmentRow key={eq.id} equipment={eq} />
          ))}
        </div>
      </div>
    </div>
  )
}
