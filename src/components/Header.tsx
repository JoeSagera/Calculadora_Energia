import { usePower } from '../context/PowerContext'
import { formatWatts, formatHours } from '../utils/calculations'
import arcadeLogo from '../assets/arcade-logo.png'

export function Header() {
  const { powerInfo, dispatch } = usePower()
  const { totalWatts, batteryTimeLeft } = powerInfo

  return (
    <header className="border-b border-white/5 bg-arcade-dark px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img src={arcadeLogo} alt="Arcade Cuba" className="h-8 w-auto sm:h-10" />
          <p className="text-xs text-text-muted sm:text-sm">
            Calculadora de Energía — Inversor 12kW
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-text-muted">Consumo</p>
            <p className="font-heading text-xl font-black text-text-primary sm:text-2xl">
              {formatWatts(totalWatts)}
            </p>
          </div>
          <div className="h-8 w-px bg-white/5" />
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-text-muted">Restante</p>
            <p className="font-heading text-xl font-black text-text-primary sm:text-2xl">
              {formatHours(batteryTimeLeft)}
            </p>
          </div>
          <div className="h-8 w-px bg-white/5" />
          <button
            type="button"
            onClick={() => dispatch({ type: 'RESET' })}
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-text-muted transition-colors hover:border-status-danger hover:text-status-danger"
          >
            RESET
          </button>
        </div>
      </div>
    </header>
  )
}
