import { usePower } from '../context/PowerContext'
import { formatWatts } from '../utils/calculations'

export function AlertBanner() {
  const { powerInfo } = usePower()
  const { level, totalWatts, maxCapacity } = powerInfo

  if (level === 'safe') return null

  if (level === 'critical') {
    return (
      <div className="rounded-lg border border-power-critical/50 bg-power-critical/10 px-4 py-3 text-center">
        <p className="font-bold text-power-critical">
          🚨 EXCEDE LA CAPACIDAD DEL INVERSOR
        </p>
        <p className="text-sm text-power-critical/80">
          Consumo actual: {formatWatts(totalWatts)} — Límite: {formatWatts(maxCapacity)}.
          Desactivá equipos para evitar daños.
        </p>
      </div>
    )
  }

  if (level === 'danger') {
    return (
      <div className="rounded-lg border border-power-danger/50 bg-power-danger/10 px-4 py-3 text-center">
        <p className="font-bold text-power-danger">
          ⚡ Zona de peligro ({((totalWatts / maxCapacity) * 100).toFixed(0)}% del límite)
        </p>
        <p className="text-sm text-power-danger/80">
          Estás muy cerca del límite. Considerá desactivar equipos de baja prioridad.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-power-warning/50 bg-power-warning/10 px-4 py-3 text-center">
      <p className="font-bold text-power-warning">
        ⚠ Consumo elevado ({((totalWatts / maxCapacity) * 100).toFixed(0)}% del límite)
      </p>
      <p className="text-sm text-power-warning/80">
        Monitoreá los equipos activos para no superar los 12kW.
      </p>
    </div>
  )
}
