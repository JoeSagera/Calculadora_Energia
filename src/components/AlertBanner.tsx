import { usePower } from '../context/PowerContext'
import { formatWatts } from '../utils/calculations'

const levelText: Record<string, string> = {
  critical: 'text-status-danger',
  danger: 'text-status-danger',
  warning: 'text-status-warn',
}

const levelBorder: Record<string, string> = {
  critical: 'border-status-danger/40 bg-status-danger/10',
  danger: 'border-status-danger/40 bg-status-danger/10',
  warning: 'border-status-warn/40 bg-status-warn/10',
}

export function AlertBanner() {
  const { powerInfo } = usePower()
  const { level, totalWatts, maxCapacity } = powerInfo

  if (level === 'safe') return null

  const pct = ((totalWatts / maxCapacity) * 100).toFixed(0)

  return (
    <div className={`rounded-lg border px-4 py-3 text-center ${levelBorder[level]}`}>
      <p className={`font-bold ${levelText[level]}`}>
        {level === 'critical' && `EXCEDE LA CAPACIDAD DEL INVERSOR (${pct}%)`}
        {level === 'danger' && `Zona de peligro — ${pct}% del límite`}
        {level === 'warning' && `Consumo elevado — ${pct}% del límite`}
      </p>
      <p className={`text-sm ${levelText[level]} opacity-80`}>
        {level === 'critical' && `${formatWatts(totalWatts)} supera los ${formatWatts(maxCapacity)} — desactivá equipos para evitar daños.`}
        {level === 'danger' && 'Desactivá equipos de baja prioridad para reducir consumo.'}
        {level === 'warning' && 'Monitoreá los equipos activos para no superar los 12kW.'}
      </p>
    </div>
  )
}
