'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getStats, calculateDerivedStats, GameStats, GameRecord, resetStats } from '@/lib/storage'

export default function RankingPage() {
  const [stats, setStats] = useState<GameStats | null>(null)
  const [derivedStats, setDerivedStats] = useState({ winPercentage: 0, avgAttempts: '0', avgHints: '0' })
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  useEffect(() => {
    const loadedStats = getStats()
    setStats(loadedStats)
    setDerivedStats(calculateDerivedStats(loadedStats))
  }, [])

  const handleReset = () => {
    resetStats()
    const newStats = getStats()
    setStats(newStats)
    setDerivedStats(calculateDerivedStats(newStats))
    setShowResetConfirm(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 py-8">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 game-card max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
            🏆 Estadísticas
          </h1>
          <p className="text-slate-400 text-sm">
            Tu rendimiento en Adivina la Palabra
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Total de partidas */}
          <div className="bg-slate-700/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white mb-1">{stats.totalGames}</div>
            <div className="text-xs text-slate-400">Partidas jugadas</div>
          </div>

          {/* Victorias */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-1">{stats.wins}</div>
            <div className="text-xs text-emerald-300/70">Victorias</div>
          </div>

          {/* Derrotas */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">{stats.losses}</div>
            <div className="text-xs text-red-300/70">Derrotas</div>
          </div>

          {/* Porcentaje de victoria */}
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-1">{derivedStats.winPercentage}%</div>
            <div className="text-xs text-cyan-300/70">Tasa de victoria</div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Mejor racha */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-xl">🔥</span>
              <span className="text-2xl font-bold text-amber-400">{stats.bestStreak}</span>
            </div>
            <div className="text-xs text-amber-300/70">Mejor racha</div>
          </div>

          {/* Racha actual */}
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-400 mb-1">{stats.currentStreak}</div>
            <div className="text-xs text-orange-300/70">Racha actual</div>
          </div>

          {/* Promedio de intentos */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">{derivedStats.avgAttempts}</div>
            <div className="text-xs text-purple-300/70">Intentos promedio</div>
          </div>

          {/* Promedio de pistas */}
          <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pink-400 mb-1">{derivedStats.avgHints}</div>
            <div className="text-xs text-pink-300/70">Pistas promedio</div>
          </div>
        </div>

        {/* Best Streak Highlight */}
        {stats.bestStreak > 0 && (
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-6 text-center">
            <div className="text-4xl mb-2">🔥</div>
            <h3 className="text-xl font-bold text-amber-300 mb-1">
              Mejor racha: {stats.bestStreak} {stats.bestStreak === 1 ? 'palabra' : 'palabras'} seguidas
            </h3>
            <p className="text-sm text-slate-400">
              ¡{stats.bestStreak >= 5 ? 'Impresionante!' : stats.bestStreak >= 3 ? 'Muy bien!' : 'Sigue así!'}
            </p>
          </div>
        )}

        {/* No games yet message */}
        {stats.totalGames === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-lg font-medium text-slate-300 mb-2">
              ¡Aún no has jugado ninguna partida!
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Comienza a jugar para ver tus estadísticas aquí.
            </p>
            <Link href="/">
              <button className="btn-primary">
                Empezar a jugar
              </button>
            </Link>
          </div>
        )}

        {/* Recent Games History */}
        {stats.gamesHistory.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-300 flex items-center gap-2">
              <span>📋</span> Últimas partidas
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="py-2 px-3 text-left text-slate-400 font-medium">Fecha</th>
                    <th className="py-2 px-3 text-left text-slate-400 font-medium">Palabra</th>
                    <th className="py-2 px-3 text-center text-slate-400 font-medium">Resultado</th>
                    <th className="py-2 px-3 text-center text-slate-400 font-medium">Intentos</th>
                    <th className="py-2 px-3 text-center text-slate-400 font-medium">Pistas</th>
                    <th className="py-2 px-3 text-center text-slate-400 font-medium">Dificultad</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.gamesHistory.slice(0, 10).map((game, index) => (
                    <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                      <td className="py-2 px-3 text-slate-300 text-xs">
                        {formatDate(game.date)}
                      </td>
                      <td className="py-2 px-3 text-white font-medium uppercase">
                        {game.word}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {game.won ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">
                            ✓ Ganada
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full text-xs">
                            ✗ Perdida
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-center text-slate-300">{game.attempts}</td>
                      <td className="py-2 px-3 text-center text-slate-300">{game.hintsUsed}</td>
                      <td className="py-2 px-3 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          game.difficulty === 'Fácil' ? 'bg-emerald-500/20 text-emerald-400' :
                          game.difficulty === 'Medio' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {game.difficulty}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {stats.gamesHistory.length > 10 && (
              <p className="text-xs text-slate-500 text-center">
                Mostrando las últimas 10 de {stats.gamesHistory.length} partidas
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>

          {stats.totalGames > 0 && (
            <>
              {!showResetConfirm ? (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="text-red-400 hover:text-red-300 text-sm transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Borrar estadísticas
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">¿Seguro?</span>
                  <button
                    onClick={handleReset}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                  >
                    Sí, borrar
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1 bg-slate-700/50 text-slate-400 rounded-lg text-sm hover:bg-slate-700 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}

