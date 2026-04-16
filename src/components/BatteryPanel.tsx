import { usePower } from '../context/PowerContext'
import { formatHours } from '../utils/calculations'

function getRecommendations(pct: number): string[] {
  if (pct === 0) return ['Batería agotada — sin energía disponible']
  if (pct <= 10) return [
    'Apagá todo lo no esencial AHORA',
    'Solo refrigeración y seguridad',
    'El sistema puede apagarse en cualquier momento',
  ]
  if (pct <= 25) return [
    'Desactivá climatización y cocina',
    'Reducí PCs al mínimo (2-3)',
    'Priorizá refrigeración, red y seguridad',
  ]
  if (pct <= 50) return [
    'Evitá encender todo simultáneamente',
    'Gaming OK pero monitoreá el consumo',
    'Desactivá cocina si no usás',
  ]
  if (pct <= 75) return [
    'Operación normal',
    'Considerá apagar AC para ahorrar',
  ]
  return ['Operación total sin restricciones']
}

function getStatusLevel(pct: number): 'ok' | 'warn' | 'danger' {
  if (pct <= 25) return 'danger'
  if (pct <= 50) return 'warn'
  return 'ok'
}

const statusColor = {
  ok: 'text-status-ok',
  warn: 'text-status-warn',
  danger: 'text-status-danger',
}

const statusBg = {
  ok: 'bg-status-ok',
  warn: 'bg-status-warn',
  danger: 'bg-status-danger',
}

const recBg = {
  ok: 'bg-status-ok/10 text-status-ok',
  warn: 'bg-status-warn/10 text-status-warn',
  danger: 'bg-status-danger/10 text-status-danger',
}

export function BatteryPanel() {
  const { dispatch, powerInfo } = usePower()
  const { batteryPercentage, batteryTimeLeft, totalWatts } = powerInfo
  const status = getStatusLevel(batteryPercentage)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'SET_BATTERY', payload: { percentage: Number(e.target.value) } })
  }

  const recommendations = totalWatts > 0 ? getRecommendations(batteryPercentage) : []

  return (
    <div className="rounded-xl border border-white/5 bg-arcade-dark p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-base font-bold">Batería</h3>
          <p className="text-xs text-text-muted">2 × 15kWh = 30kWh</p>
        </div>
        <span className={`font-heading text-3xl font-black ${statusColor[status]}`}>
          {batteryPercentage}%
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-arcade-darker">
        <div
          className={`h-full rounded-full transition-all duration-500 ${statusBg[status]}`}
          style={{ width: `${batteryPercentage}%` }}
        />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={batteryPercentage}
        onChange={handleChange}
        className="custom-slider w-full"
      />

      <div className="flex justify-between text-[10px] text-text-muted">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>

      {totalWatts > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-arcade-darker px-3 py-2">
          <span className="text-sm text-text-secondary">Tiempo restante</span>
          <span className={`font-heading text-lg font-black ${statusColor[status]}`}>
            {formatHours(batteryTimeLeft)}
          </span>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="space-y-1">
          {recommendations.map((rec, i) => (
            <div key={i} className={`rounded px-3 py-1.5 text-xs ${recBg[status]}`}>
              {rec}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
