import { usePower } from '../context/PowerContext'
import { formatWatts, formatHours } from '../utils/calculations'

const levelStyles = {
  safe: 'bg-power-safe',
  warning: 'bg-power-warning',
  danger: 'bg-power-danger',
  critical: 'bg-power-critical animate-pulse',
}

export function PowerGauge() {
  const { powerInfo } = usePower()
  const { totalWatts, maxCapacity, percentage, level, autonomyHours } = powerInfo

  const clampedPercentage = Math.min(percentage, 100)
  const overflow = percentage > 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-arcade-blue-gray">
          {formatWatts(totalWatts)} / {formatWatts(maxCapacity)}
        </span>
        <span
          className={`font-bold ${overflow ? 'text-power-critical animate-pulse' : 'text-arcade-white'}`}
        >
          {percentage.toFixed(1)}%
        </span>
      </div>

      <div className="h-4 w-full overflow-hidden rounded-full bg-arcade-dark">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${levelStyles[level]}`}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-arcade-blue-gray">
        <span>
          Autonomía estimada:{' '}
          <span className="text-arcade-neon-yellow font-semibold">
            {formatHours(autonomyHours)}
          </span>
        </span>
        {overflow && (
          <span className="font-bold text-power-critical">
            ⚠ EXCEDE {formatWatts(totalWatts - maxCapacity)}
          </span>
        )}
      </div>
    </div>
  )
}
