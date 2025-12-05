/**
 * Utilidades para almacenamiento local de estadísticas del juego
 */

export interface GameStats {
  totalGames: number
  wins: number
  losses: number
  totalAttempts: number
  totalHintsUsed: number
  currentStreak: number
  bestStreak: number
  gamesHistory: GameRecord[]
}

export interface GameRecord {
  date: string
  word: string
  won: boolean
  attempts: number
  hintsUsed: number
  difficulty: string
}

const STORAGE_KEY = 'adivina-palabra-stats'

const defaultStats: GameStats = {
  totalGames: 0,
  wins: 0,
  losses: 0,
  totalAttempts: 0,
  totalHintsUsed: 0,
  currentStreak: 0,
  bestStreak: 0,
  gamesHistory: []
}

/**
 * Obtiene las estadísticas del localStorage
 */
export function getStats(): GameStats {
  if (typeof window === 'undefined') {
    return defaultStats
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...defaultStats, ...JSON.parse(stored) }
    }
  } catch (error) {
    console.error('Error reading stats from localStorage:', error)
  }
  
  return defaultStats
}

/**
 * Guarda las estadísticas en localStorage
 */
export function saveStats(stats: GameStats): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  } catch (error) {
    console.error('Error saving stats to localStorage:', error)
  }
}

/**
 * Registra el resultado de un juego
 */
export function recordGame(
  word: string,
  won: boolean,
  attempts: number,
  hintsUsed: number,
  difficulty: string
): GameStats {
  const stats = getStats()
  
  // Actualizar contadores
  stats.totalGames++
  stats.totalAttempts += attempts
  stats.totalHintsUsed += hintsUsed
  
  if (won) {
    stats.wins++
    stats.currentStreak++
    if (stats.currentStreak > stats.bestStreak) {
      stats.bestStreak = stats.currentStreak
    }
  } else {
    stats.losses++
    stats.currentStreak = 0
  }
  
  // Agregar al historial (mantener últimos 50 juegos)
  const record: GameRecord = {
    date: new Date().toISOString(),
    word,
    won,
    attempts,
    hintsUsed,
    difficulty
  }
  
  stats.gamesHistory = [record, ...stats.gamesHistory].slice(0, 50)
  
  saveStats(stats)
  return stats
}

/**
 * Calcula estadísticas derivadas
 */
export function calculateDerivedStats(stats: GameStats) {
  const winPercentage = stats.totalGames > 0 
    ? Math.round((stats.wins / stats.totalGames) * 100) 
    : 0
    
  const avgAttempts = stats.totalGames > 0 
    ? (stats.totalAttempts / stats.totalGames).toFixed(1) 
    : '0'
    
  const avgHints = stats.totalGames > 0 
    ? (stats.totalHintsUsed / stats.totalGames).toFixed(1) 
    : '0'
  
  return {
    winPercentage,
    avgAttempts,
    avgHints
  }
}

/**
 * Reinicia todas las estadísticas
 */
export function resetStats(): void {
  saveStats(defaultStats)
}

/**
 * Obtiene solo la racha actual (para mostrar en tiempo real)
 */
export function getCurrentStreak(): number {
  return getStats().currentStreak
}

/**
 * Obtiene la mejor racha
 */
export function getBestStreak(): number {
  return getStats().bestStreak
}

