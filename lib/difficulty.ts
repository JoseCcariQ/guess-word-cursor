/**
 * Configuración de dificultades del juego
 */

export type DifficultyLevel = 'Fácil' | 'Medio' | 'Difícil'

export interface DifficultyConfig {
  name: DifficultyLevel
  maxAttempts: number
  maxHints: number
  description: string
  color: string
  bgColor: string
  borderColor: string
}

export const difficulties: Record<DifficultyLevel, DifficultyConfig> = {
  'Fácil': {
    name: 'Fácil',
    maxAttempts: 8,
    maxHints: 3,
    description: '8 intentos, 3 pistas',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    borderColor: 'border-emerald-500/50'
  },
  'Medio': {
    name: 'Medio',
    maxAttempts: 6,
    maxHints: 2,
    description: '6 intentos, 2 pistas',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/50'
  },
  'Difícil': {
    name: 'Difícil',
    maxAttempts: 4,
    maxHints: 0,
    description: '4 intentos, sin pistas',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/50'
  }
}

export const difficultyLevels: DifficultyLevel[] = ['Fácil', 'Medio', 'Difícil']

/**
 * Obtiene la configuración de dificultad por nombre
 */
export function getDifficultyConfig(name: string): DifficultyConfig {
  if (name in difficulties) {
    return difficulties[name as DifficultyLevel]
  }
  return difficulties['Medio'] // Default
}

/**
 * Valida si un string es una dificultad válida
 */
export function isValidDifficulty(name: string): name is DifficultyLevel {
  return name in difficulties
}

