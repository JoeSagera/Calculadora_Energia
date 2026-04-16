// ===== Domain Types =====

export type Priority = 'critical' | 'high' | 'medium' | 'low'

export type EquipmentCategory =
  | 'refrigeración'
  | 'climatización'
  | 'gaming'
  | 'cocina'
  | 'red'
  | 'seguridad'
  | 'entretenimiento'
  | 'ventilación'

export interface Equipment {
  id: string
  name: string
  brand: string
  model: string
  quantity: number
  powerMin: number
  powerMax: number
  priority: Priority
  category: EquipmentCategory
  voltage: string
}

export interface Area {
  id: string
  name: string
  icon: string
  equipment: Equipment[]
}

// ===== State Types =====

export type ActiveCounts = Record<string, number>

export interface AppState {
  activeEquipment: Set<string>
  expandedAreas: Set<string>
  activeScenario: string | null
  activeCounts: ActiveCounts
  batteryPercentage: number
}

export type AppAction =
  | { type: 'TOGGLE_EQUIPMENT'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_AREA'; payload: { areaId: string; activate: boolean } }
  | { type: 'APPLY_SCENARIO'; payload: { scenarioId: string; equipmentIds: Set<string>; counts: ActiveCounts } }
  | { type: 'RESET' }
  | { type: 'TOGGLE_AREA_EXPAND'; payload: { areaId: string } }
  | { type: 'SET_COUNT'; payload: { id: string; count: number } }
  | { type: 'SET_BATTERY'; payload: { percentage: number } }

// ===== Scenario Types =====

export interface Scenario {
  id: string
  name: string
  icon: string
  description: string
  getCounts: (catalog: Area[]) => ActiveCounts
}

// ===== Derived Types =====

export type PowerLevel = 'safe' | 'warning' | 'danger' | 'critical'

export interface PowerInfo {
  totalWatts: number
  maxCapacity: number
  percentage: number
  level: PowerLevel
  autonomyHours: number
  areaBreakdown: AreaPowerBreakdown[]
  batteryPercentage: number
  batteryTimeLeft: number
}

export interface AreaPowerBreakdown {
  areaId: string
  areaName: string
  watts: number
  percentage: number
}
