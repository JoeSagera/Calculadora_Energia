import type { Area, PowerInfo, PowerLevel, AreaPowerBreakdown } from '../types'
import { PC_GAMER_ID } from '../types'
import { INVERTER_CAPACITY } from '../data/catalog'

export const BATTERY_TOTAL_WH = 30000 // 2 × 15kWh = 30kWh

export function calculateTotalPower(
  activeIds: Set<string>,
  catalog: Area[],
  activePcCount: number = 0,
): { min: number; max: number } {
  let min = 0
  let max = 0

  for (const area of catalog) {
    for (const eq of area.equipment) {
      if (activeIds.has(eq.id)) {
        if (eq.id === PC_GAMER_ID) {
          min += eq.powerMin * activePcCount
          max += eq.powerMax * activePcCount
        } else {
          min += eq.powerMin * eq.quantity
          max += eq.powerMax * eq.quantity
        }
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
  const batteryWh = BATTERY_TOTAL_WH * (batteryPercentage / 100)
  return batteryWh / totalWatts
}

export function getAreaBreakdown(
  activeIds: Set<string>,
  catalog: Area[],
  activePcCount: number = 0,
): AreaPowerBreakdown[] {
  return catalog.map((area) => {
    let watts = 0
    for (const eq of area.equipment) {
      if (activeIds.has(eq.id)) {
        if (eq.id === PC_GAMER_ID) {
          watts += eq.powerMax * activePcCount
        } else {
          watts += eq.powerMax * eq.quantity
        }
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

export function getPowerInfo(activeIds: Set<string>, catalog: Area[], activePcCount: number = 0, batteryPercentage: number = 100): PowerInfo {
  const { max } = calculateTotalPower(activeIds, catalog, activePcCount)
  const percentage = INVERTER_CAPACITY > 0 ? (max / INVERTER_CAPACITY) * 100 : 0
  const level = getPowerLevel(percentage)
  const autonomyHours = estimateAutonomy(max)
  const areaBreakdown = getAreaBreakdown(activeIds, catalog, activePcCount)
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
  if (watts >= 1000) {
    return `${(watts / 1000).toFixed(1)}kW`
  }
  return `${Math.round(watts)}W`
}

export function formatHours(hours: number): string {
  if (!isFinite(hours)) return '∞'
  if (hours >= 24) return `${(hours / 24).toFixed(1)}d`
  if (hours >= 1) return `${hours.toFixed(1)}h`
  return `${Math.round(hours * 60)}min`
}
