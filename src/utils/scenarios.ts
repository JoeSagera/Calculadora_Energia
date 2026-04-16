import type { Scenario, ActiveCounts } from '../types'

function fullCounts(catalog: { equipment: { id: string; quantity: number }[] }[]): ActiveCounts {
  const counts: ActiveCounts = {}
  for (const area of catalog) {
    for (const eq of area.equipment) {
      counts[eq.id] = eq.quantity
    }
  }
  return counts
}

export const scenarios: Scenario[] = [
  {
    id: 'all-on',
    name: 'Todo Encendido',
    icon: '⚡',
    description: 'Todos los equipos al máximo',
    getCounts: (catalog) => fullCounts(catalog),
  },
  {
    id: 'essentials',
    name: 'Solo Esenciales',
    icon: '🛡️',
    description: 'Refrigeración, red y seguridad',
    getCounts: (catalog) => {
      const counts: ActiveCounts = {}
      for (const area of catalog) {
        for (const eq of area.equipment) {
          if (
            eq.priority === 'critical' ||
            eq.category === 'refrigeración' ||
            eq.category === 'red' ||
            eq.category === 'seguridad'
          ) {
            counts[eq.id] = eq.quantity
          }
        }
      }
      return counts
    },
  },
  {
    id: 'gaming',
    name: 'Gaming Activo',
    icon: '🎮',
    description: 'Gaming + refrigeración y red — sin cocina ni AC',
    getCounts: (catalog) => {
      const counts: ActiveCounts = {}
      for (const area of catalog) {
        for (const eq of area.equipment) {
          if (
            eq.category === 'gaming' ||
            eq.category === 'refrigeración' ||
            eq.category === 'red' ||
            eq.category === 'seguridad' ||
            eq.category === 'entretenimiento'
          ) {
            counts[eq.id] = eq.quantity
          }
        }
      }
      return counts
    },
  },
  {
    id: 'extreme-save',
    name: 'Ahorro Extremo',
    icon: '🔋',
    description: 'Refrigeración, red, seguridad + 2 PCs',
    getCounts: (catalog) => {
      const counts: ActiveCounts = {}
      for (const area of catalog) {
        for (const eq of area.equipment) {
          if (
            eq.category === 'refrigeración' ||
            eq.category === 'red' ||
            eq.category === 'seguridad'
          ) {
            counts[eq.id] = eq.quantity
          }
          if (eq.id === 'pc-gamer') {
            counts[eq.id] = 2
          }
        }
      }
      return counts
    },
  },
]
