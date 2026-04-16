import { usePower } from '../context/PowerContext'
import { formatHours } from '../utils/calculations'

function getRecommendations(percentage: number): string[] {
  if (percentage === 0) return ['Batería agotada — no hay energía disponible']
  if (percentage <= 10) return [
    'Batería CRÍTICA — apagá todos los equipos no esenciales AHORA',
    'Mantené solo refrigeración y seguridad',
    'El sistema puede apagarse en cualquier momento',
  ]
  if (percentage <= 25) return [
    'Batería baja — desactivá climatización y cocina',
    'Reducí PCs al mínimo necesario (2-3)',
    'Priorizá refrigeración, red y seguridad',
  ]
  if (percentage <= 50) return [
    'Batería moderada — evitá encender todo simultáneamente',
    'Podés mantener gaming pero monitoreá el consumo',
    'Desactivá equipos de cocina que no uses',
  ]
  if (percentage <= 75) return [
    'Batería buena — operación normal',
    'Podés activar la mayoría de los equipos',
    'Considerá apagar AC si no es necesario para ahorrar',
  ]
  return [
    'Batería completa — operación total sin restricciones',
    'Todos los equipos pueden estar activos',
  ]
}

function getBatteryColor(percentage: number): string {
  if (percentage <= 10) return 'text-power-critical'
  if (percentage <= 25) return 'text-power-danger'
  if (percentage <= 50) return 'text-power-warning'
  return 'text-power-safe'
}

function getBatteryBg(percentage: number): string {
  if (percentage <= 10) return 'bg-power-critical'
  if (percentage <= 25) return 'bg-power-danger'
  if (percentage <= 50) return 'bg-power-warning'
  return 'bg-power-safe'
}

export function BatteryPanel() {
  const { dispatch, powerInfo } = usePower()
  const { batteryPercentage, batteryTimeLeft, totalWatts } = powerInfo

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'SET_BATTERY', payload: { percentage: Number(e.target.value) } })
  }

  const recommendations = totalWatts > 0 ? getRecommendations(batteryPercentage) : []

  return (
    <div className="rounded-xl border border-arcade-blue-gray/20 bg-arcade-dark p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔋</span>
          <div>
            <h3 className="font-heading text-lg font-bold text-arcade-white">
              Batería del Inversor
            </h3>
            <p className="text-xs text-arcade-blue-gray">
              2× 15kWh = 30kWh — Indicá el % actual
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className={`font-heading text-3xl font-black ${getBatteryColor(batteryPercentage)}`}>
            {batteryPercentage}%
          </span>
        </div>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-arcade-darker">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getBatteryBg(batteryPercentage)}`}
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
        className="battery-slider w-full"
      />

      <div className="flex items-center justify-between text-xs text-arcade-blue-gray">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>

      {totalWatts > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-arcade-darker px-3 py-2">
          <span className="text-sm text-arcade-blue-gray">Tiempo estimado restante</span>
          <span className={`font-heading text-lg font-black ${getBatteryColor(batteryPercentage)}`}>
            {formatHours(batteryTimeLeft)}
          </span>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-wider text-arcade-blue-gray font-semibold">
            Recomendaciones
          </p>
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className={`rounded-lg px-3 py-1.5 text-xs ${
                batteryPercentage <= 25
                  ? 'bg-power-danger/10 text-power-danger'
                  : batteryPercentage <= 50
                    ? 'bg-power-warning/10 text-power-warning'
                    : 'bg-power-safe/10 text-power-safe'
              }`}
            >
              {rec}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
