/**
 * Sistema de efectos de sonido para el juego
 */

class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map()
  private enabled: boolean = true
  private lastPlayTime: Map<string, number> = new Map()
  private minInterval: number = 150 // ms entre sonidos del mismo tipo

  constructor() {
    if (typeof window !== 'undefined') {
      this.preloadSounds()
    }
  }

  private preloadSounds() {
    const soundFiles = {
      success: '/sounds/success.mp3',
      error: '/sounds/error.mp3'
    }

    Object.entries(soundFiles).forEach(([name, path]) => {
      const audio = new Audio(path)
      audio.preload = 'auto'
      audio.volume = 0.5
      this.sounds.set(name, audio)
    })
  }

  /**
   * Reproduce un sonido con protección contra spam
   */
  play(soundName: 'success' | 'error') {
    if (!this.enabled || typeof window === 'undefined') return

    const now = Date.now()
    const lastPlay = this.lastPlayTime.get(soundName) || 0
    
    // Evitar reproducir el mismo sonido muy seguido
    if (now - lastPlay < this.minInterval) return
    
    const sound = this.sounds.get(soundName)
    if (sound) {
      // Clonar para permitir sonidos superpuestos si es necesario
      const clone = sound.cloneNode() as HTMLAudioElement
      clone.volume = 0.5
      clone.play().catch(() => {
        // Ignorar errores de autoplay (política del navegador)
      })
      this.lastPlayTime.set(soundName, now)
    }
  }

  /**
   * Habilita o deshabilita los sonidos
   */
  setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  /**
   * Verifica si los sonidos están habilitados
   */
  isEnabled(): boolean {
    return this.enabled
  }
}

// Singleton para usar en toda la aplicación
let soundManager: SoundManager | null = null

export function getSoundManager(): SoundManager {
  if (!soundManager && typeof window !== 'undefined') {
    soundManager = new SoundManager()
  }
  return soundManager || new SoundManager()
}

/**
 * Funciones de conveniencia
 */
export function playSuccessSound() {
  getSoundManager().play('success')
}

export function playErrorSound() {
  getSoundManager().play('error')
}

