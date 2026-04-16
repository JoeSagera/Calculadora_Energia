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
                ? 'bg-gradient-arcade text-white shadow-lg shadow-arcade-neon-magenta/20'
                : 'border border-arcade-blue-gray/30 bg-arcade-dark text-arcade-blue-gray hover:border-arcade-neon-magenta/50 hover:text-arcade-white'
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
