import type { Scenario } from '../types'

export const scenarios: Scenario[] = [
  {
    id: 'all-on',
    name: 'Todo Encendido',
    icon: '⚡',
    description: 'Todos los equipos activos — consumo máximo estimado',
    pcCount: 11,
    getEquipmentIds: (catalog) => {
      const ids = new Set<string>()
      for (const area of catalog) {
        for (const eq of area.equipment) {
          ids.add(eq.id)
        }
      }
      return ids
    },
  },
  {
    id: 'essentials',
    name: 'Solo Esenciales',
    icon: '🛡️',
    description: 'Refrigeración, red y seguridad — lo mínimo para operar',
    pcCount: 0,
    getEquipmentIds: (catalog) => {
      const ids = new Set<string>()
      for (const area of catalog) {
        for (const eq of area.equipment) {
          if (
            eq.priority === 'critical' ||
            eq.category === 'refrigeración' ||
            eq.category === 'red' ||
            eq.category === 'seguridad'
          ) {
            ids.add(eq.id)
          }
        }
      }
      return ids
    },
  },
  {
    id: 'gaming',
    name: 'Gaming Activo',
    icon: '🎮',
    description: 'PCs, PS5, VR + refrigeración y red — sin cocina ni AC',
    pcCount: 11,
    getEquipmentIds: (catalog) => {
      const ids = new Set<string>()
      for (const area of catalog) {
        for (const eq of area.equipment) {
          if (
            eq.category === 'gaming' ||
            eq.category === 'refrigeración' ||
            eq.category === 'red' ||
            eq.category === 'seguridad' ||
            eq.category === 'entretenimiento'
          ) {
            ids.add(eq.id)
          }
        }
      }
      return ids
    },
  },
  {
    id: 'extreme-save',
    name: 'Ahorro Extremo',
    icon: '🔋',
    description: 'Solo refrigeración, red, seguridad + 2 PCs — mínimo consumo',
    pcCount: 2,
    getEquipmentIds: (catalog) => {
      const ids = new Set<string>()
      for (const area of catalog) {
        for (const eq of area.equipment) {
          if (
            eq.category === 'refrigeración' ||
            eq.category === 'red' ||
            eq.category === 'seguridad'
          ) {
            ids.add(eq.id)
          }
          if (eq.id === 'pc-gamer') {
            ids.add(eq.id)
          }
        }
      }
      return ids
    },
  },
]
