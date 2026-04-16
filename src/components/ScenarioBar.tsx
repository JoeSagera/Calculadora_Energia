import { usePower } from '../context/PowerContext'
import { scenarios } from '../utils/scenarios'
import { catalog } from '../data/catalog'

export function ScenarioBar() {
  const { state, dispatch } = usePower()

  function handleApply(scenarioId: string) {
    const scenario = scenarios.find((s) => s.id === scenarioId)
    if (!scenario) return

    if (state.activeScenario === scenarioId) {
      dispatch({ type: 'RESET' })
      return
    }

    const equipmentIds = scenario.getEquipmentIds(catalog)
    dispatch({
      type: 'APPLY_SCENARIO',
      payload: { scenarioId, equipmentIds, pcCount: scenario.pcCount },
    })
  }

  return (
    <div className="flex flex-wrap gap-2">
      {scenarios.map((scenario) => {
        const isActive = state.activeScenario === scenario.id
        return (
          <button
            key={scenario.id}
            type="button"
            onClick={() => handleApply(scenario.id)}
            title={scenario.description}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              isActive
                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                : 'border border-white/10 bg-arcade-dark text-text-muted hover:border-white/20 hover:text-text-secondary'
            }`}
          >
            <span className="mr-1">{scenario.icon}</span>
            {scenario.name}
          </button>
        )
      })}
    </div>
  )
}
