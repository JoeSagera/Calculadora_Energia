import { createContext, useContext, useReducer, useMemo, type ReactNode } from 'react'
import type { AppState, AppAction } from '../types'
import { PC_GAMER_ID } from '../types'
import { catalog } from '../data/catalog'
import { getPowerInfo } from '../utils/calculations'
import type { PowerInfo } from '../types'

const initialState: AppState = {
  activeEquipment: new Set<string>(),
  expandedAreas: new Set<string>(),
  activeScenario: null,
  activePcCount: 0,
  batteryPercentage: 100,
}

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'TOGGLE_EQUIPMENT': {
      const { id } = action.payload
      const next = new Set(state.activeEquipment)
      let pcCount = state.activePcCount
      if (next.has(id)) {
        next.delete(id)
        if (id === PC_GAMER_ID) pcCount = 0
      } else {
        next.add(id)
        if (id === PC_GAMER_ID && pcCount === 0) pcCount = 11
      }
      return { ...state, activeEquipment: next, activeScenario: null, activePcCount: pcCount }
    }

    case 'TOGGLE_AREA': {
      const { areaId, activate } = action.payload
      const area = catalog.find((a) => a.id === areaId)
      if (!area) return state

      const next = new Set(state.activeEquipment)
      let pcCount = state.activePcCount
      for (const eq of area.equipment) {
        if (activate) {
          next.add(eq.id)
          if (eq.id === PC_GAMER_ID && pcCount === 0) pcCount = eq.quantity
        } else {
          next.delete(eq.id)
          if (eq.id === PC_GAMER_ID) pcCount = 0
        }
      }
      return { ...state, activeEquipment: next, activeScenario: null, activePcCount: pcCount }
    }

    case 'APPLY_SCENARIO': {
      const { scenarioId, equipmentIds, pcCount } = action.payload
      return {
        ...state,
        activeEquipment: new Set(equipmentIds),
        activeScenario: scenarioId,
        activePcCount: pcCount ?? state.activePcCount,
      }
    }

    case 'SET_PC_COUNT': {
      const { count } = action.payload
      const next = new Set(state.activeEquipment)
      if (count > 0) {
        next.add(PC_GAMER_ID)
      } else {
        next.delete(PC_GAMER_ID)
      }
      return { ...state, activeEquipment: next, activeScenario: null, activePcCount: count }
    }

    case 'SET_BATTERY':
      return { ...state, batteryPercentage: action.payload.percentage }

    case 'RESET':
      return initialState

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

  const powerInfo = useMemo(
    () => getPowerInfo(state.activeEquipment, catalog, state.activePcCount, state.batteryPercentage),
    [state.activeEquipment, state.activePcCount, state.batteryPercentage],
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
