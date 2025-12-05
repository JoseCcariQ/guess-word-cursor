'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Word, getRandomWord, checkAnswer, normalizeString } from '@/lib/words'

const MAX_ATTEMPTS = 6
const MAX_HINTS = 3

interface HintResponse {
  hint: string
  used: number
  max: number
}

export default function GameBoard() {
  // Estado del juego
  const [currentWord, setCurrentWord] = useState<Word | null>(null)
  const [guess, setGuess] = useState('')
  const [guesses, setGuesses] = useState<{ text: string; correct: boolean }[]>([])
  const [attempts, setAttempts] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [hints, setHints] = useState<string[]>([])
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing')
  const [isLoadingHint, setIsLoadingHint] = useState(false)
  const [showWordAnimation, setShowWordAnimation] = useState(false)

  // Inicializar juego
  const initGame = useCallback(() => {
    const word = getRandomWord()
    setCurrentWord(word)
    setGuess('')
    setGuesses([])
    setAttempts(0)
    setHintsUsed(0)
    setHints([])
    setGameState('playing')
    setShowWordAnimation(false)
  }, [])

  useEffect(() => {
    initGame()
  }, [initGame])

  // Manejar intento de adivinar
  const handleGuess = () => {
    if (!currentWord || gameState !== 'playing' || !guess.trim()) return

    const normalizedGuess = normalizeString(guess)
    const isCorrect = checkAnswer(guess, currentWord.word)

    // Agregar a la lista de intentos
    setGuesses(prev => [...prev, { text: guess.trim(), correct: isCorrect }])
    setAttempts(prev => prev + 1)
    setGuess('')

    if (isCorrect) {
      setGameState('won')
      setShowWordAnimation(true)
    } else if (attempts + 1 >= MAX_ATTEMPTS) {
      setGameState('lost')
      setShowWordAnimation(true)
    }
  }

  // Pedir pista a la API
  const requestHint = async () => {
    if (!currentWord || hintsUsed >= MAX_HINTS || isLoadingHint) return

    setIsLoadingHint(true)
    try {
      const response = await fetch('/api/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: currentWord.word,
          hintsUsed: hintsUsed
        })
      })

      const data: HintResponse = await response.json()
      setHints(prev => [...prev, data.hint])
      setHintsUsed(data.used)
    } catch (error) {
      console.error('Error al obtener pista:', error)
    } finally {
      setIsLoadingHint(false)
    }
  }

  // Renderizar palabra enmascarada
  const renderMaskedWord = () => {
    if (!currentWord) return null

    const word = currentWord.word.toUpperCase()
    
    if (gameState !== 'playing') {
      // Mostrar palabra completa al finalizar
      return (
        <div className="flex flex-wrap justify-center gap-2">
          {word.split('').map((letter, index) => (
            <div
              key={index}
              className={`letter-box ${showWordAnimation ? 'animate-pop' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {letter}
            </div>
          ))}
        </div>
      )
    }

    // Mostrar guiones bajos
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {word.split('').map((_, index) => (
          <div key={index} className="letter-box">
            _
          </div>
        ))}
      </div>
    )
  }

  // Manejar tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && gameState === 'playing') {
      handleGuess()
    }
  }

  if (!currentWord) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header con categoría y contador */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Categoría:</span>
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30">
            {currentWord.category}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Intentos:</span>
            <span className={`font-bold ${attempts >= MAX_ATTEMPTS - 1 ? 'text-red-400' : 'text-white'}`}>
              {attempts}/{MAX_ATTEMPTS}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Pistas:</span>
            <span className="font-bold text-purple-400">
              {hintsUsed}/{MAX_HINTS}
            </span>
          </div>
        </div>
      </div>

      {/* Palabra enmascarada */}
      <div className="py-6">
        {renderMaskedWord()}
      </div>

      {/* Estado del juego - Victoria */}
      {gameState === 'won' && (
        <div className="win-state animate-pop">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-2xl font-bold text-emerald-400 mb-2">¡Felicidades!</h3>
          <p className="text-emerald-200 mb-4">¡Has adivinado la palabra correctamente!</p>
          <div className="bg-slate-800/50 rounded-lg p-4 text-left mb-4">
            <p className="text-sm text-slate-300">{currentWord.description}</p>
          </div>
          <button onClick={initGame} className="btn-success">
            Jugar de nuevo
          </button>
        </div>
      )}

      {/* Estado del juego - Derrota */}
      {gameState === 'lost' && (
        <div className="lose-state animate-pop">
          <div className="text-4xl mb-3">😔</div>
          <h3 className="text-2xl font-bold text-red-400 mb-2">¡Se acabaron los intentos!</h3>
          <p className="text-red-200 mb-2">
            La palabra era: <span className="font-bold text-white">{currentWord.word.toUpperCase()}</span>
          </p>
          <div className="bg-slate-800/50 rounded-lg p-4 text-left mb-4">
            <p className="text-sm text-slate-300">{currentWord.description}</p>
          </div>
          <button onClick={initGame} className="btn-secondary">
            Intentar otra palabra
          </button>
        </div>
      )}

      {/* Área de juego activo */}
      {gameState === 'playing' && (
        <>
          {/* Input para adivinar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu respuesta..."
              className="game-input flex-1"
              maxLength={20}
              autoFocus
            />
            <button
              onClick={handleGuess}
              disabled={!guess.trim()}
              className="btn-primary whitespace-nowrap"
            >
              Adivinar
            </button>
          </div>

          {/* Botón de pista */}
          <div className="flex justify-center">
            <button
              onClick={requestHint}
              disabled={hintsUsed >= MAX_HINTS || isLoadingHint}
              className="btn-secondary flex items-center gap-2"
            >
              {isLoadingHint ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Pensando...
                </>
              ) : (
                <>
                  <span>💡</span>
                  Pedir pista a la IA
                  {hintsUsed < MAX_HINTS && (
                    <span className="text-xs opacity-75">({MAX_HINTS - hintsUsed} restantes)</span>
                  )}
                </>
              )}
            </button>
          </div>
        </>
      )}

      {/* Pistas mostradas */}
      {hints.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <span>🤖</span> Pistas de la IA:
          </h4>
          {hints.map((hint, index) => (
            <div key={index} className="hint-box animate-pop" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold">#{index + 1}</span>
                <p className="text-sm">{hint}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lista de intentos anteriores */}
      {guesses.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-400">Tus intentos:</h4>
          <div className="flex flex-wrap gap-2">
            {guesses.map((g, index) => (
              <span
                key={index}
                className={`guess-badge ${g.correct ? 'correct' : 'incorrect'}`}
              >
                {g.correct ? '✓' : '✗'} {g.text}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Enlace para volver */}
      <div className="pt-4 border-t border-slate-700">
        <Link href="/" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

