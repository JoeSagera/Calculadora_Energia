import type { Priority } from '../types'

const priorityConfig: Record<
  Priority,
  { label: string; bg: string; text: string }
> = {
  critical: { label: 'CRÍTICO', bg: 'bg-priority-critical/20', text: 'text-priority-critical' },
  high: { label: 'ALTO', bg: 'bg-priority-high/20', text: 'text-priority-high' },
  medium: { label: 'MEDIO', bg: 'bg-priority-medium/20', text: 'text-priority-medium' },
  low: { label: 'BAJO', bg: 'bg-priority-low/20', text: 'text-priority-low' },
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const config = priorityConfig[priority]
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  )
}
