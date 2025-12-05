'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Word, getRandomWord, checkAnswer } from '@/lib/words'
import { getDifficultyConfig, DifficultyLevel } from '@/lib/difficulty'
import { recordGame, getStats, GameStats } from '@/lib/storage'
import { playSuccessSound, playErrorSound } from '@/lib/sounds'

interface HintResponse {
  hint: string
  used: number
  max: number
}

export default function GameBoard() {
  const searchParams = useSearchParams()
  const difficultyParam = searchParams.get('dificultad') || 'Medio'
  const difficultyConfig = getDifficultyConfig(difficultyParam)
  
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
  
  // Streak y estadísticas
  const [currentStreak, setCurrentStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [wordsGuessed, setWordsGuessed] = useState(0)
  
  // Animación de shake
  const [isShaking, setIsShaking] = useState(false)
  
  // Referencias
  const inputRef = useRef<HTMLInputElement>(null)
  const wordAreaRef = useRef<HTMLDivElement>(null)

  // Cargar estadísticas iniciales
  useEffect(() => {
    const stats = getStats()
    setCurrentStreak(stats.currentStreak)
    setBestStreak(stats.bestStreak)
  }, [])

  // Inicializar juego
  const initGame = useCallback((preserveStreak = false) => {
    const word = getRandomWord()
    setCurrentWord(word)
    setGuess('')
    setGuesses([])
    setAttempts(0)
    setHintsUsed(0)
    setHints([])
    setGameState('playing')
    setShowWordAnimation(false)
    setIsShaking(false)
    
    if (!preserveStreak) {
      const stats = getStats()
      setCurrentStreak(stats.currentStreak)
      setBestStreak(stats.bestStreak)
    }
    
    // Focus en el input
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  useEffect(() => {
    initGame()
  }, [initGame])

  // Trigger shake animation
  const triggerShake = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 300)
  }

  // Manejar intento de adivinar
  const handleGuess = () => {
    if (!currentWord || gameState !== 'playing' || !guess.trim()) return

    const isCorrect = checkAnswer(guess, currentWord.word)

    // Agregar a la lista de intentos
    setGuesses(prev => [...prev, { text: guess.trim(), correct: isCorrect }])
    setAttempts(prev => prev + 1)
    setGuess('')

    if (isCorrect) {
      // Victoria
      playSuccessSound()
      setGameState('won')
      setShowWordAnimation(true)
      setWordsGuessed(prev => prev + 1)
      
      // Registrar juego y actualizar racha
      const stats = recordGame(
        currentWord.word,
        true,
        attempts + 1,
        hintsUsed,
        difficultyConfig.name
      )
      setCurrentStreak(stats.currentStreak)
      setBestStreak(stats.bestStreak)
    } else if (attempts + 1 >= difficultyConfig.maxAttempts) {
      // Derrota
      playErrorSound()
      setGameState('lost')
      setShowWordAnimation(true)
      
      // Registrar juego y resetear racha
      const stats = recordGame(
        currentWord.word,
        false,
        attempts + 1,
        hintsUsed,
        difficultyConfig.name
      )
      setCurrentStreak(0)
      setBestStreak(stats.bestStreak)
    } else {
      // Intento incorrecto
      playErrorSound()
      triggerShake()
    }
    
    // Focus en el input
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  // Continuar jugando (siguiente palabra)
  const continueGame = () => {
    initGame(true)
  }

  // Pedir pista a la API
  const requestHint = async () => {
    if (!currentWord || hintsUsed >= difficultyConfig.maxHints || isLoadingHint) return

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
        <div 
          ref={wordAreaRef}
          className="flex flex-wrap justify-center gap-2"
        >
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
      <div 
        ref={wordAreaRef}
        className={`flex flex-wrap justify-center gap-2 ${isShaking ? 'animate-shake' : ''}`}
      >
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
      {/* Header con categoría, dificultad y contadores */}
      <div className="flex flex-col gap-4">
        {/* Primera fila: Categoría y Dificultad */}
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Categoría:</span>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30">
              {currentWord.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Dificultad:</span>
            <span className={`px-3 py-1 ${difficultyConfig.bgColor} ${difficultyConfig.color} rounded-full text-sm font-medium border ${difficultyConfig.borderColor}`}>
              {difficultyConfig.name}
            </span>
          </div>
        </div>
        
        {/* Segunda fila: Intentos, Pistas y Racha */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/30 rounded-lg">
            <span className="text-slate-400">Intentos:</span>
            <span className={`font-bold ${attempts >= difficultyConfig.maxAttempts - 1 ? 'text-red-400' : 'text-white'}`}>
              {attempts}/{difficultyConfig.maxAttempts}
            </span>
          </div>
          
          {difficultyConfig.maxHints > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/30 rounded-lg">
              <span className="text-slate-400">Pistas:</span>
              <span className="font-bold text-purple-400">
                {hintsUsed}/{difficultyConfig.maxHints}
              </span>
            </div>
          )}
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <span>🔥</span>
            <span className="text-amber-300 font-bold">{currentStreak}</span>
            {bestStreak > 0 && (
              <span className="text-slate-500 text-xs">(máx: {bestStreak})</span>
            )}
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
          <p className="text-emerald-200 mb-2">¡Has adivinado la palabra correctamente!</p>
          
          {currentStreak > 1 && (
            <p className="text-amber-300 mb-2 flex items-center justify-center gap-2">
              <span>🔥</span>
              <span>Racha actual: {currentStreak} palabras seguidas</span>
            </p>
          )}
          
          <div className="bg-slate-800/50 rounded-lg p-4 text-left mb-4">
            <p className="text-sm text-slate-300">{currentWord.description}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={continueGame} className="btn-success">
              🎯 Siguiente palabra
            </button>
            <Link href="/">
              <button className="btn-secondary w-full sm:w-auto">
                🏠 Volver al inicio
              </button>
            </Link>
          </div>
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
          
          {wordsGuessed > 0 && (
            <p className="text-slate-400 mb-2">
              Adivinaste {wordsGuessed} {wordsGuessed === 1 ? 'palabra' : 'palabras'} esta sesión
            </p>
          )}
          
          <div className="bg-slate-800/50 rounded-lg p-4 text-left mb-4">
            <p className="text-sm text-slate-300">{currentWord.description}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => initGame(false)} className="btn-secondary">
              🔄 Intentar otra palabra
            </button>
            <Link href="/">
              <button className="btn-primary w-full sm:w-auto">
                🏠 Volver al inicio
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Área de juego activo */}
      {gameState === 'playing' && (
        <>
          {/* Input para adivinar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              ref={inputRef}
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu respuesta..."
              className={`game-input flex-1 ${isShaking ? 'animate-shake' : ''}`}
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

          {/* Botón de pista (solo si hay pistas disponibles) */}
          {difficultyConfig.maxHints > 0 && (
            <div className="flex justify-center">
              <button
                onClick={requestHint}
                disabled={hintsUsed >= difficultyConfig.maxHints || isLoadingHint}
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
                    {hintsUsed < difficultyConfig.maxHints && (
                      <span className="text-xs opacity-75">({difficultyConfig.maxHints - hintsUsed} restantes)</span>
                    )}
                  </>
                )}
              </button>
            </div>
          )}
          
          {/* Mensaje para dificultad difícil */}
          {difficultyConfig.maxHints === 0 && (
            <div className="text-center">
              <span className="text-red-400 text-sm italic">
                🚫 Las pistas están deshabilitadas en modo Difícil
              </span>
            </div>
          )}
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
      <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
        <Link href="/" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </Link>
        
        <Link href="/ranking" className="text-slate-400 hover:text-amber-400 text-sm transition-colors flex items-center gap-2">
          🏆 Ver estadísticas
        </Link>
      </div>
    </div>
  )
}
