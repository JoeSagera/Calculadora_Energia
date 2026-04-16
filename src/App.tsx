import { PowerProvider } from './context/PowerContext'
import { Header } from './components/Header'
import { PowerGauge } from './components/PowerGauge'
import { AlertBanner } from './components/AlertBanner'
import { BatteryPanel } from './components/BatteryPanel'
import { ScenarioBar } from './components/ScenarioBar'
import { PCSelector } from './components/PCSelector'
import { AreaCard } from './components/AreaCard'
import { catalog } from './data/catalog'

function App() {
  return (
    <PowerProvider>
      <div className="min-h-screen bg-arcade-darker text-arcade-white">
        <Header />

        <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
          <PowerGauge />
          <AlertBanner />

          <div className="grid gap-4 sm:grid-cols-2">
            <BatteryPanel />
            <PCSelector />
          </div>

          <ScenarioBar />

          <div className="grid gap-4 sm:grid-cols-2">
            {catalog.map((area) => (
              <AreaCard key={area.id} area={area} />
            ))}
          </div>
        </main>

        <footer className="border-t border-arcade-blue-gray/10 px-4 py-3 text-center text-xs text-arcade-blue-gray/50">
          Arcade Cuba — Calculadora de Energía v1.0
        </footer>
      </div>
    </PowerProvider>
  )
}

export default App
