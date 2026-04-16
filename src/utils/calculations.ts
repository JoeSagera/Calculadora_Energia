import type { Area, PowerInfo, PowerLevel, AreaPowerBreakdown, ActiveCounts } from '../types'
import { INVERTER_CAPACITY } from '../data/catalog'

export const BATTERY_TOTAL_WH = 30000

export function calculateTotalPower(
  activeIds: Set<string>,
  catalog: Area[],
  activeCounts: ActiveCounts,
): { min: number; max: number } {
  let min = 0
  let max = 0

  for (const area of catalog) {
    for (const eq of area.equipment) {
      if (activeIds.has(eq.id)) {
        const count = activeCounts[eq.id] ?? eq.quantity
        min += eq.powerMin * count
        max += eq.powerMax * count
      }
    }
  }

  return { min, max }
}

export function getPowerLevel(percentage: number): PowerLevel {
  if (percentage >= 100) return 'critical'
  if (percentage >= 85) return 'danger'
  if (percentage >= 70) return 'warning'
  return 'safe'
}

export function estimateAutonomy(totalWatts: number): number {
  if (totalWatts === 0) return Infinity
  return BATTERY_TOTAL_WH / totalWatts
}

export function estimateBatteryTime(totalWatts: number, batteryPercentage: number): number {
  if (totalWatts === 0) return Infinity
  return (BATTERY_TOTAL_WH * (batteryPercentage / 100)) / totalWatts
}

export function getAreaBreakdown(
  activeIds: Set<string>,
  catalog: Area[],
  activeCounts: ActiveCounts,
): AreaPowerBreakdown[] {
  return catalog.map((area) => {
    let watts = 0
    for (const eq of area.equipment) {
      if (activeIds.has(eq.id)) {
        const count = activeCounts[eq.id] ?? eq.quantity
        watts += eq.powerMax * count
      }
    }
    return {
      areaId: area.id,
      areaName: area.name,
      watts,
      percentage: INVERTER_CAPACITY > 0 ? (watts / INVERTER_CAPACITY) * 100 : 0,
    }
  })
}

export function getPowerInfo(
  activeIds: Set<string>,
  catalog: Area[],
  activeCounts: ActiveCounts,
  batteryPercentage: number = 100,
): PowerInfo {
  const { max } = calculateTotalPower(activeIds, catalog, activeCounts)
  const percentage = INVERTER_CAPACITY > 0 ? (max / INVERTER_CAPACITY) * 100 : 0
  const level = getPowerLevel(percentage)
  const autonomyHours = estimateAutonomy(max)
  const areaBreakdown = getAreaBreakdown(activeIds, catalog, activeCounts)
  const batteryTimeLeft = estimateBatteryTime(max, batteryPercentage)

  return {
    totalWatts: max,
    maxCapacity: INVERTER_CAPACITY,
    percentage,
    level,
    autonomyHours,
    areaBreakdown,
    batteryPercentage,
    batteryTimeLeft,
  }
}

export function formatWatts(watts: number): string {
  if (watts >= 1000) return `${(watts / 1000).toFixed(1)}kW`
  return `${Math.round(watts)}W`
}

export function formatHours(hours: number): string {
  if (!isFinite(hours)) return '∞'
  if (hours >= 24) return `${(hours / 24).toFixed(1)}d`
  if (hours >= 1) return `${hours.toFixed(1)}h`
  return `${Math.round(hours * 60)}min`
}
