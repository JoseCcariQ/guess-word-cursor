'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DifficultyLevel, difficultyLevels, difficulties } from '@/lib/difficulty'
import { getStats, getBestStreak } from '@/lib/storage'

export default function Home() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('Medio')
  const [bestStreak, setBestStreak] = useState(0)
  const [totalGames, setTotalGames] = useState(0)

  useEffect(() => {
    const stats = getStats()
    setBestStreak(stats.bestStreak)
    setTotalGames(stats.totalGames)
  }, [])

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
            Descubre la palabra oculta antes de agotar tus intentos. 
            Si necesitas ayuda, la IA te dará pistas.
          </p>
        </div>

        {/* Difficulty Selector */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-400">Selecciona la dificultad:</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {difficultyLevels.map((level) => {
              const config = difficulties[level]
              const isSelected = selectedDifficulty === level
              return (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`
                    px-4 py-2 rounded-xl font-medium transition-all duration-300
                    border-2 transform hover:scale-105
                    ${isSelected 
                      ? `${config.bgColor} ${config.borderColor} ${config.color} shadow-lg` 
                      : 'bg-slate-700/30 border-slate-600 text-slate-400 hover:border-slate-500'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-base">{level}</span>
                    <span className="text-xs opacity-75">{config.description}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Stats preview */}
        {(bestStreak > 0 || totalGames > 0) && (
          <div className="flex justify-center gap-4 text-sm">
            {bestStreak > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <span>🔥</span>
                <span className="text-amber-300">Mejor racha: {bestStreak}</span>
              </div>
            )}
            {totalGames > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/30 border border-slate-600 rounded-lg">
                <span>🎮</span>
                <span className="text-slate-300">{totalGames} partidas</span>
              </div>
            )}
          </div>
        )}

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
            <div className="text-2xl mb-1">🔥</div>
            <div className="text-xs text-slate-400">Modo racha</div>
          </div>
        </div>

        {/* CTA Button */}
        <Link 
          href={`/juego?dificultad=${encodeURIComponent(selectedDifficulty)}`} 
          className="block"
        >
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

        {/* Secondary links */}
        <div className="flex justify-center gap-4">
          <Link 
            href="/ranking" 
            className="text-slate-400 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2"
          >
            <span>🏆</span>
            Ver estadísticas
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-xs text-slate-500">
          Hecho con Next.js y asistencia de IA 🤖
        </p>
      </div>
    </main>
  )
}
