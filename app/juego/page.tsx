import { Suspense } from 'react'
import GameBoard from '@/components/GameBoard'

function GameLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full" />
    </div>
  )
}

export default function JuegoPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 game-card max-w-2xl w-full">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            🧠 Adivina la Palabra
          </h1>
          <p className="text-slate-400 text-sm">
            ¿Podrás descubrir la palabra oculta?
          </p>
        </div>

        {/* Game Board with Suspense for useSearchParams */}
        <Suspense fallback={<GameLoading />}>
          <GameBoard />
        </Suspense>
      </div>
    </main>
  )
}
