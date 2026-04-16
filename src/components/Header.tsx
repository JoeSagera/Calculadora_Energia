import { usePower } from '../context/PowerContext'
import { formatWatts, formatHours } from '../utils/calculations'
import arcadeLogo from '../assets/arcade-logo.png'

export function Header() {
  const { powerInfo, dispatch } = usePower()
  const { totalWatts, batteryTimeLeft } = powerInfo

  return (
    <header className="border-b border-arcade-blue-gray/20 bg-arcade-dark px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img
            src={arcadeLogo}
            alt="Arcade Cuba"
            className="h-8 w-auto sm:h-10"
          />
          <div>
            <p className="text-xs text-arcade-blue-gray sm:text-sm">
              Calculadora de Consumo Energético — Inversor 12kW
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-arcade-blue-gray">
              Consumo activo
            </p>
            <p className="font-heading text-xl font-black text-arcade-neon-yellow sm:text-2xl">
              {formatWatts(totalWatts)}
            </p>
          </div>
          <div className="h-8 w-px bg-arcade-blue-gray/20" />
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-arcade-blue-gray">
              Tiempo restante
            </p>
            <p className="font-heading text-xl font-black text-arcade-blue sm:text-2xl">
              {formatHours(batteryTimeLeft)}
            </p>
          </div>
          <div className="h-8 w-px bg-arcade-blue-gray/20" />
          <button
            type="button"
            onClick={() => dispatch({ type: 'RESET' })}
            className="rounded-full border border-arcade-blue-gray/30 px-3 py-1.5 text-xs font-semibold text-arcade-blue-gray transition-colors hover:border-power-danger hover:text-power-danger"
          >
            RESET
          </button>
        </div>
      </div>
    </header>
  )
}
