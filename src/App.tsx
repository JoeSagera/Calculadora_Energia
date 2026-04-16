import { PowerProvider } from './context/PowerContext'
import { Header } from './components/Header'
import { PowerGauge } from './components/PowerGauge'
import { AlertBanner } from './components/AlertBanner'
import { BatteryPanel } from './components/BatteryPanel'
import { ScenarioBar } from './components/ScenarioBar'
import { AreaCard } from './components/AreaCard'
import { catalog } from './data/catalog'

function App() {
  return (
    <PowerProvider>
      <div className="min-h-screen bg-arcade-darker text-text-primary">
        <Header />

        <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
          <PowerGauge />
          <AlertBanner />

          <BatteryPanel />

          <ScenarioBar />

          <div className="grid gap-4 sm:grid-cols-2">
            {catalog.map((area) => (
              <AreaCard key={area.id} area={area} />
            ))}
          </div>
        </main>

        <footer className="border-t border-white/5 px-4 py-3 text-center text-xs text-text-muted">
          Arcade Cuba — Calculadora de Energía v1.0
        </footer>
      </div>
    </PowerProvider>
  )
}

export default App
