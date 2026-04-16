import type { Priority } from '../types'

const labels: Record<Priority, string> = {
  critical: 'CRIT',
  high: 'ALTO',
  medium: 'MED',
  low: 'BAJO',
}

const styles: Record<Priority, string> = {
  critical: 'bg-status-danger/15 text-status-danger',
  high: 'bg-status-warn/15 text-status-warn',
  medium: 'bg-white/5 text-text-secondary',
  low: 'bg-white/5 text-text-muted',
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider ${styles[priority]}`}
    >
      {labels[priority]}
    </span>
  )
}
