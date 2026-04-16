import { createContext, useContext, useReducer, useMemo, useEffect, type ReactNode } from 'react'
import type { AppState, AppAction } from '../types'
import { catalog } from '../data/catalog'
import { getPowerInfo } from '../utils/calculations'
import { saveState, loadState } from '../utils/storage'
import type { PowerInfo } from '../types'

const persisted = loadState()

const initialState: AppState = {
  activeEquipment: persisted.activeEquipment,
  expandedAreas: new Set<string>(),
  activeScenario: null,
  activeCounts: persisted.activeCounts,
  batteryPercentage: persisted.batteryPercentage,
}

const cleanState: AppState = {
  activeEquipment: new Set<string>(),
  expandedAreas: new Set<string>(),
  activeScenario: null,
  activeCounts: {},
  batteryPercentage: 100,
}

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'TOGGLE_EQUIPMENT': {
      const { id, quantity } = action.payload
      const next = new Set(state.activeEquipment)
      const nextCounts = { ...state.activeCounts }
      if (next.has(id)) {
        next.delete(id)
        delete nextCounts[id]
      } else {
        next.add(id)
        nextCounts[id] = quantity
      }
      return { ...state, activeEquipment: next, activeScenario: null, activeCounts: nextCounts }
    }

    case 'TOGGLE_AREA': {
      const { areaId, activate } = action.payload
      const area = catalog.find((a) => a.id === areaId)
      if (!area) return state

      const next = new Set(state.activeEquipment)
      const nextCounts = { ...state.activeCounts }
      for (const eq of area.equipment) {
        if (activate) {
          next.add(eq.id)
          nextCounts[eq.id] = eq.quantity
        } else {
          next.delete(eq.id)
          delete nextCounts[eq.id]
        }
      }
      return { ...state, activeEquipment: next, activeScenario: null, activeCounts: nextCounts }
    }

    case 'APPLY_SCENARIO': {
      const { scenarioId, counts } = action.payload
      return {
        ...state,
        activeEquipment: new Set(Object.keys(counts)),
        activeScenario: scenarioId,
        activeCounts: { ...counts },
      }
    }

    case 'SET_COUNT': {
      const { id, count } = action.payload
      const next = new Set(state.activeEquipment)
      const nextCounts = { ...state.activeCounts }
      if (count > 0) {
        next.add(id)
        nextCounts[id] = count
      } else {
        next.delete(id)
        delete nextCounts[id]
      }
      return { ...state, activeEquipment: next, activeScenario: null, activeCounts: nextCounts }
    }

    case 'SET_BATTERY':
      return { ...state, batteryPercentage: action.payload.percentage }

    case 'RESET':
      return cleanState

    case 'TOGGLE_AREA_EXPAND': {
      const { areaId } = action.payload
      const next = new Set(state.expandedAreas)
      if (next.has(areaId)) {
        next.delete(areaId)
      } else {
        next.add(areaId)
      }
      return { ...state, expandedAreas: next }
    }

    default:
      return state
  }
}

interface PowerContextValue {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  powerInfo: PowerInfo
}

const PowerContext = createContext<PowerContextValue | null>(null)

export function PowerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const powerInfo = useMemo(
    () => getPowerInfo(state.activeEquipment, catalog, state.activeCounts, state.batteryPercentage),
    [state.activeEquipment, state.activeCounts, state.batteryPercentage],
  )

  const value = useMemo(
    () => ({ state, dispatch, powerInfo }),
    [state, dispatch, powerInfo],
  )

  return <PowerContext.Provider value={value}>{children}</PowerContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePower(): PowerContextValue {
  const ctx = useContext(PowerContext)
  if (!ctx) throw new Error('usePower must be used within PowerProvider')
  return ctx
}
