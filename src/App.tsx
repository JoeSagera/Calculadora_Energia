function App() {
  return (
    <div className="min-h-screen bg-arcade-darker text-arcade-white">
      <header className="bg-arcade-dark border-b border-arcade-blue-gray/30 px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-arcade-white">
              ARCADE <span className="text-arcade-neon-magenta">CUBA</span>
            </h1>
            <p className="text-sm text-arcade-blue-gray">
              Calculadora de Consumo Energético — Inversor 30kW
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-arcade-blue-gray">Capacidad del inversor</p>
            <p className="text-2xl font-heading font-black text-arcade-neon-yellow">
              30,000W
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <h2 className="text-4xl font-heading font-black uppercase text-arcade-neon-magenta">
            Proyecto inicializado
          </h2>
          <p className="text-arcade-blue-gray text-lg">
            SDD workflow en proceso — la calculadora viene en camino
          </p>
          <div className="mt-4 h-1 w-32 rounded-full bg-gradient-arcade" />
        </div>
      </main>
    </div>
  )
}

export default App
