import type { AppState, ActiveCounts } from '../types'
import { catalog } from '../data/catalog'

const STORAGE_KEY = 'arcade-energy-state'

interface SerializedState {
  activeEquipment: string[]
  activeCounts: ActiveCounts
  batteryPercentage: number
}

const validIds = new Set<string>()
for (const area of catalog) {
  for (const eq of area.equipment) {
    validIds.add(eq.id)
  }
}

export function saveState(state: AppState): void {
  try {
    const data: SerializedState = {
      activeEquipment: [...state.activeEquipment],
      activeCounts: state.activeCounts,
      batteryPercentage: state.batteryPercentage,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

export function loadState(): Pick<AppState, 'activeEquipment' | 'activeCounts' | 'batteryPercentage'> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { activeEquipment: new Set(), activeCounts: {}, batteryPercentage: 100 }

    const data: SerializedState = JSON.parse(raw)

    const activeEquipment = new Set<string>(
      (data.activeEquipment ?? []).filter((id) => validIds.has(id)),
    )

    const activeCounts: ActiveCounts = {}
    for (const [id, count] of Object.entries(data.activeCounts ?? {})) {
      if (validIds.has(id) && typeof count === 'number' && count > 0) {
        activeCounts[id] = count
      }
    }

    const batteryPercentage = typeof data.batteryPercentage === 'number'
      ? Math.max(0, Math.min(100, data.batteryPercentage))
      : 100

    return { activeEquipment, activeCounts, batteryPercentage }
  } catch {
    return { activeEquipment: new Set(), activeCounts: {}, batteryPercentage: 100 }
  }
}
