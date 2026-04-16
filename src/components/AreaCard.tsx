import { usePower } from '../context/PowerContext'
import { EquipmentRow } from './EquipmentRow'
import { formatWatts } from '../utils/calculations'
import type { Area } from '../types'

export function AreaCard({ area }: { area: Area }) {
  const { state, dispatch, powerInfo } = usePower()
  const isExpanded = state.expandedAreas.has(area.id)

  const areaPower = powerInfo.areaBreakdown.find((a) => a.areaId === area.id)
  const activeCount = area.equipment.filter((eq) =>
    state.activeEquipment.has(eq.id),
  ).length
  const allActive = activeCount === area.equipment.length && area.equipment.length > 0

  function handleToggleAll() {
    dispatch({ type: 'TOGGLE_AREA', payload: { areaId: area.id, activate: !allActive } })
  }

  function handleExpand() {
    dispatch({ type: 'TOGGLE_AREA_EXPAND', payload: { areaId: area.id } })
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/5 bg-arcade-dark">
      <button
        type="button"
        onClick={handleExpand}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5"
      >
        <span className="text-2xl">{area.icon}</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-base font-bold">
            {area.name}
          </h3>
          <p className="text-xs text-text-muted">
            {activeCount}/{area.equipment.length} equipos
            {areaPower && areaPower.watts > 0 && (
              <> · {formatWatts(areaPower.watts)}</>
            )}
          </p>
        </div>
        <span
          className={`text-text-muted transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        >
          ▾
        </span>
      </button>

      {isExpanded && (
        <div className="border-t border-white/5 px-2 py-2">
          <div className="mb-2 flex justify-end px-3">
            <button
              type="button"
              onClick={handleToggleAll}
              className="text-xs font-semibold text-accent hover:text-text-primary transition-colors"
            >
              {allActive ? 'Desactivar todo' : 'Activar todo'}
            </button>
          </div>
          <div className="space-y-1">
            {area.equipment.map((eq) => (
              <EquipmentRow key={eq.id} equipment={eq} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
