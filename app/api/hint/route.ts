import { NextRequest, NextResponse } from 'next/server'
import { words, getHint, normalizeString } from '@/lib/words'

const MAX_HINTS = 3

/**
 * API Route para obtener pistas del juego
 * 
 * Este endpoint simula un sistema de IA para dar pistas.
 * Está estructurado para que en el futuro se pueda integrar
 * con un LLM real como OpenAI.
 * 
 * Para integrar con OpenAI en el futuro:
 * 1. Agregar OPENAI_API_KEY en las variables de entorno
 * 2. Instalar el paquete: npm install openai
 * 3. Modificar la función generateHintWithAI() para usar la API real
 */

interface HintRequest {
  word: string
  hintsUsed: number
}

interface HintResponse {
  hint: string
  used: number
  max: number
}

/**
 * Función placeholder para integración futura con OpenAI
 * 
 * Para usar con OpenAI real, descomenta y modifica:
 * 
 * import OpenAI from 'openai'
 * 
 * const openai = new OpenAI({
 *   apiKey: process.env.OPENAI_API_KEY
 * })
 * 
 * async function generateHintWithAI(word: string, category: string, hintNumber: number): Promise<string> {
 *   const response = await openai.chat.completions.create({
 *     model: 'gpt-3.5-turbo',
 *     messages: [
 *       {
 *         role: 'system',
 *         content: `Eres un asistente de un juego de palabras en español. 
 *                   Debes dar pistas para ayudar a adivinar una palabra.
 *                   La pista ${hintNumber} de 3 debe ser ${
 *                     hintNumber === 1 ? 'muy vaga' : 
 *                     hintNumber === 2 ? 'moderadamente útil' : 
 *                     'bastante específica pero sin revelar la palabra'
 *                   }.`
 *       },
 *       {
 *         role: 'user',
 *         content: `Da una pista número ${hintNumber} para la palabra "${word}" (categoría: ${category}). 
 *                   No reveles la palabra directamente.`
 *       }
 *     ],
 *     max_tokens: 100,
 *     temperature: 0.7
 *   })
 *   
 *   return response.choices[0]?.message?.content || 'No se pudo generar una pista.'
 * }
 */

/**
 * Obtiene la pista predefinida para una palabra
 * En modo offline usa las pistas predefinidas en lib/words.ts
 */
function getOfflineHint(wordText: string, hintNumber: number): string {
  // Buscar la palabra en la lista
  const normalizedWord = normalizeString(wordText)
  const wordData = words.find(w => normalizeString(w.word) === normalizedWord)
  
  if (!wordData) {
    return "No se encontró información para esta palabra."
  }
  
  return getHint(wordData, hintNumber)
}

/**
 * POST /api/hint
 * 
 * Recibe: { word: string, hintsUsed: number }
 * Devuelve: { hint: string, used: number, max: number }
 */
export async function POST(request: NextRequest): Promise<NextResponse<HintResponse>> {
  try {
    const body: HintRequest = await request.json()
    const { word, hintsUsed } = body

    // Validaciones
    if (!word) {
      return NextResponse.json(
        { hint: 'Error: palabra no proporcionada', used: hintsUsed, max: MAX_HINTS },
        { status: 400 }
      )
    }

    if (hintsUsed >= MAX_HINTS) {
      return NextResponse.json(
        { hint: 'Has usado todas las pistas disponibles.', used: MAX_HINTS, max: MAX_HINTS },
        { status: 200 }
      )
    }

    // Calcular siguiente número de pista (1, 2 o 3)
    const nextHintNumber = hintsUsed + 1

    // Obtener pista
    // En el futuro, aquí se puede cambiar a generateHintWithAI() cuando OPENAI_API_KEY esté disponible
    const useAI = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== ''
    
    let hint: string
    
    if (useAI) {
      // Placeholder: cuando se integre OpenAI, usar generateHintWithAI()
      // hint = await generateHintWithAI(word, category, nextHintNumber)
      hint = getOfflineHint(word, nextHintNumber) // Por ahora usa offline
    } else {
      hint = getOfflineHint(word, nextHintNumber)
    }

    // Simular un pequeño delay para dar sensación de "pensamiento" de la IA
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500))

    return NextResponse.json({
      hint,
      used: nextHintNumber,
      max: MAX_HINTS
    })

  } catch (error) {
    console.error('Error en /api/hint:', error)
    return NextResponse.json(
      { hint: 'Error al procesar la solicitud de pista.', used: 0, max: MAX_HINTS },
      { status: 500 }
    )
  }
}

/**
 * GET /api/hint
 * Endpoint informativo sobre el sistema de pistas
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    message: 'API de pistas del juego "Adivina la Palabra con IA"',
    usage: 'POST con { word: string, hintsUsed: number }',
    maxHints: MAX_HINTS,
    aiEnabled: !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== ''),
    note: 'En modo offline, las pistas vienen predefinidas. Configure OPENAI_API_KEY para usar IA real.'
  })
}

