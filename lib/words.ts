/**
 * Definición del tipo de palabra para el juego
 */
export interface Word {
  word: string
  category: string
  hint1: string
  hint2: string
  hint3: string
  description: string
}

/**
 * Lista de palabras para el juego "Adivina la Palabra con IA"
 * Cada palabra incluye categoría, 3 pistas progresivas y descripción final
 */
export const words: Word[] = [
  {
    word: "mariposa",
    category: "Animal",
    hint1: "Es un insecto que pasa por metamorfosis completa.",
    hint2: "Tiene alas coloridas y vuela de flor en flor.",
    hint3: "Antes de transformarse, era una oruga.",
    description: "La mariposa es un insecto lepidóptero conocido por sus hermosas alas coloridas y su ciclo de vida que incluye la metamorfosis."
  },
  {
    word: "telescopio",
    category: "Ciencia",
    hint1: "Es un instrumento óptico inventado en el siglo XVII.",
    hint2: "Galileo Galilei lo usó para observar los astros.",
    hint3: "Permite ver objetos muy lejanos en el cielo nocturno.",
    description: "El telescopio es un instrumento óptico que permite observar objetos lejanos, especialmente cuerpos celestes como estrellas y planetas."
  },
  {
    word: "biblioteca",
    category: "Lugar",
    hint1: "Es un lugar público o privado con mucho conocimiento.",
    hint2: "Aquí puedes encontrar obras de todos los géneros literarios.",
    hint3: "Es el hogar de miles de libros organizados por categorías.",
    description: "La biblioteca es una institución que almacena, organiza y pone a disposición del público colecciones de libros y otros materiales."
  },
  {
    word: "chocolate",
    category: "Alimento",
    hint1: "Es un producto derivado de una semilla tropical.",
    hint2: "Los aztecas lo consideraban el alimento de los dioses.",
    hint3: "Es dulce, viene en presentaciones con leche, negro o blanco.",
    description: "El chocolate es un alimento derivado del cacao, muy apreciado mundialmente por su sabor dulce y sus múltiples preparaciones."
  },
  {
    word: "arcoiris",
    category: "Fenómeno natural",
    hint1: "Aparece cuando hay sol y lluvia al mismo tiempo.",
    hint2: "Tiene siete colores que siempre van en el mismo orden.",
    hint3: "Es un fenómeno óptico causado por la refracción de la luz.",
    description: "El arcoíris es un fenómeno óptico y meteorológico que produce un espectro de luz en el cielo cuando el sol brilla sobre gotas de agua."
  },
  {
    word: "dinosaurio",
    category: "Animal extinto",
    hint1: "Dominaron la Tierra durante millones de años.",
    hint2: "Se extinguieron hace aproximadamente 66 millones de años.",
    hint3: "El T-Rex y el Velociraptor son ejemplos famosos.",
    description: "Los dinosaurios fueron reptiles que dominaron los ecosistemas terrestres durante la era Mesozoica antes de su extinción masiva."
  },
  {
    word: "girasol",
    category: "Planta",
    hint1: "Es una planta que puede crecer varios metros de altura.",
    hint2: "Su nombre describe su comportamiento de seguir al astro rey.",
    hint3: "Tiene pétalos amarillos y semillas comestibles en el centro.",
    description: "El girasol es una planta herbácea conocida por su gran flor amarilla que gira siguiendo la posición del sol durante el día."
  },
  {
    word: "volcan",
    category: "Geografía",
    hint1: "Es una formación geológica con una abertura en la cima.",
    hint2: "Cuando está activo, puede expulsar lava y cenizas.",
    hint3: "El Vesubio y el Etna son ejemplos famosos en Europa.",
    description: "Un volcán es una estructura geológica por donde emerge magma, gases y fragmentos de roca del interior de la Tierra."
  },
  {
    word: "guitarra",
    category: "Instrumento musical",
    hint1: "Es un instrumento de cuerda muy popular en la música.",
    hint2: "Tiene un cuerpo hueco de madera con forma de ocho.",
    hint3: "Se toca pulsando seis cuerdas con los dedos o una púa.",
    description: "La guitarra es un instrumento musical de cuerda pulsada, fundamental en géneros como el flamenco, rock, pop y música clásica."
  },
  {
    word: "piramide",
    category: "Arquitectura",
    hint1: "Es una construcción monumental de forma geométrica.",
    hint2: "Las más famosas se encuentran en Egipto y México.",
    hint3: "Los faraones las usaban como tumbas monumentales.",
    description: "Las pirámides son estructuras arquitectónicas con base poligonal y caras triangulares, famosas especialmente en el antiguo Egipto."
  },
  {
    word: "relampago",
    category: "Fenómeno natural",
    hint1: "Es un fenómeno atmosférico durante las tormentas.",
    hint2: "Produce una luz intensa que dura fracciones de segundo.",
    hint3: "Generalmente viene acompañado de un fuerte estruendo.",
    description: "El relámpago es una descarga eléctrica atmosférica que produce un destello luminoso intenso durante las tormentas eléctricas."
  },
  {
    word: "camaleon",
    category: "Animal",
    hint1: "Es un reptil conocido por una habilidad muy especial.",
    hint2: "Puede mover sus ojos de forma independiente.",
    hint3: "Cambia el color de su piel según su estado o entorno.",
    description: "El camaleón es un reptil escamoso famoso por su capacidad de cambiar de color y por su lengua extremadamente larga y pegajosa."
  },
  {
    word: "laberinto",
    category: "Estructura",
    hint1: "Es un lugar diseñado para confundir y desorientar.",
    hint2: "En la mitología griega, uno famoso contenía al Minotauro.",
    hint3: "Tiene muchos caminos y pasajes sin salida.",
    description: "Un laberinto es una construcción con múltiples caminos interconectados diseñados para dificultar encontrar la salida o el centro."
  },
  {
    word: "astronauta",
    category: "Profesión",
    hint1: "Es una profesión que requiere años de entrenamiento especial.",
    hint2: "Su lugar de trabajo está fuera de nuestro planeta.",
    hint3: "Neil Armstrong fue el primero en pisar la Luna.",
    description: "Un astronauta es un profesional entrenado para viajar y trabajar en el espacio exterior, operando naves y realizando investigaciones."
  },
  {
    word: "cascada",
    category: "Geografía",
    hint1: "Es una formación natural donde el agua cae verticalmente.",
    hint2: "Las Cataratas del Niágara son un ejemplo famoso.",
    hint3: "Se forma cuando un río encuentra un desnivel pronunciado.",
    description: "Una cascada es una caída de agua desde cierta altura, producida por un desnivel brusco en el cauce de un río o arroyo."
  },
  {
    word: "orquesta",
    category: "Música",
    hint1: "Es un conjunto de músicos que tocan juntos.",
    hint2: "Incluye instrumentos de cuerda, viento y percusión.",
    hint3: "Es dirigida por una persona con una batuta.",
    description: "Una orquesta es un conjunto de músicos que interpretan obras musicales bajo la dirección de un director de orquesta."
  },
  {
    word: "submarino",
    category: "Vehículo",
    hint1: "Es un vehículo diseñado para un ambiente especial.",
    hint2: "Puede permanecer bajo el agua durante largos períodos.",
    hint3: "Se usa para exploración marina y fines militares.",
    description: "El submarino es una embarcación capaz de navegar bajo la superficie del agua, utilizado para exploración, investigación y defensa."
  },
  {
    word: "canguro",
    category: "Animal",
    hint1: "Es un mamífero originario de un continente isla.",
    hint2: "Se desplaza dando grandes saltos con sus patas traseras.",
    hint3: "Las hembras llevan a sus crías en una bolsa llamada marsupio.",
    description: "El canguro es un marsupial australiano conocido por sus potentes patas traseras, su cola y la bolsa donde desarrollan sus crías."
  },
  {
    word: "brujula",
    category: "Instrumento",
    hint1: "Es un instrumento de navegación muy antiguo.",
    hint2: "Funciona gracias al campo magnético de la Tierra.",
    hint3: "Su aguja siempre señala hacia el norte.",
    description: "La brújula es un instrumento de orientación que utiliza una aguja magnetizada para señalar el norte magnético terrestre."
  },
  {
    word: "maratón",
    category: "Deporte",
    hint1: "Es una prueba atlética de resistencia extrema.",
    hint2: "Su nombre proviene de una antigua batalla griega.",
    hint3: "La distancia oficial es de 42.195 kilómetros.",
    description: "El maratón es una carrera de larga distancia que conmemora la legendaria carrera de Filípides desde Maratón hasta Atenas."
  }
]

/**
 * Obtiene una palabra aleatoria de la lista
 */
export function getRandomWord(): Word {
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
}

/**
 * Obtiene una pista específica basada en el número de pistas usadas
 */
export function getHint(word: Word, hintNumber: number): string {
  switch (hintNumber) {
    case 1:
      return word.hint1
    case 2:
      return word.hint2
    case 3:
      return word.hint3
    default:
      return "No hay más pistas disponibles."
  }
}

/**
 * Normaliza una cadena para comparación (minúsculas, sin acentos, sin espacios)
 */
export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

/**
 * Comprueba si la respuesta del usuario es correcta
 */
export function checkAnswer(guess: string, word: string): boolean {
  return normalizeString(guess) === normalizeString(word)
}

