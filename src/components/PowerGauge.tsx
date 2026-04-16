import { usePower } from '../context/PowerContext'
import { formatWatts, formatHours } from '../utils/calculations'

const levelStyles = {
  safe: 'bg-status-ok',
  warning: 'bg-status-warn',
  danger: 'bg-status-danger',
  critical: 'bg-status-danger animate-pulse',
}

const levelText = {
  safe: 'text-status-ok',
  warning: 'text-status-warn',
  danger: 'text-status-danger',
  critical: 'text-status-danger',
}

export function PowerGauge() {
  const { powerInfo } = usePower()
  const { totalWatts, maxCapacity, percentage, level } = powerInfo

  const clampedPercentage = Math.min(percentage, 100)
  const overflow = percentage > 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-secondary">
          {formatWatts(totalWatts)} / {formatWatts(maxCapacity)}
        </span>
        <span className={`font-bold ${overflow ? 'text-status-danger animate-pulse' : levelText[level]}`}>
          {percentage.toFixed(1)}%
        </span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-arcade-dark">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${levelStyles[level]}`}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>
          Autonomía: <span className="text-text-primary font-semibold">{formatHours(powerInfo.autonomyHours)}</span>
        </span>
        {overflow && (
          <span className="font-bold text-status-danger">
            EXCEDE {formatWatts(totalWatts - maxCapacity)}
          </span>
        )}
      </div>
    </div>
  )
}
