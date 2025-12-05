import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 game-card max-w-lg w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25 animate-bounce-slow">
            <span className="text-4xl">🧠</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Adivina la Palabra con IA
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full" />
        </div>

        {/* Description */}
        <div className="space-y-4 text-slate-300">
          <p className="text-lg">
            ¡Pon a prueba tu ingenio! 🎯
          </p>
          <p className="text-sm sm:text-base">
            Tienes <span className="text-cyan-400 font-semibold">6 intentos</span> para descubrir 
            la palabra oculta. Si necesitas ayuda, la IA te dará hasta 
            <span className="text-purple-400 font-semibold"> 3 pistas</span>.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-700/30 rounded-xl p-3">
            <div className="text-2xl mb-1">🎲</div>
            <div className="text-xs text-slate-400">Palabras aleatorias</div>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-3">
            <div className="text-2xl mb-1">💡</div>
            <div className="text-xs text-slate-400">Pistas inteligentes</div>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-3">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-xs text-slate-400">Desafío divertido</div>
          </div>
        </div>

        {/* CTA Button */}
        <Link href="/juego" className="block">
          <button className="btn-primary w-full text-lg group">
            <span className="flex items-center justify-center gap-2">
              Empezar a jugar
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </Link>

        {/* Footer note */}
        <p className="text-xs text-slate-500">
          Hecho con Next.js y asistencia de IA 🤖
        </p>
      </div>
    </main>
  )
}

