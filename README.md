# 🧠 Adivina la Palabra con IA

Un juego interactivo de adivinar palabras en español con un sistema de pistas inteligente que simula IA.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/Licencia-MIT-green?style=flat-square)

## 📖 Descripción

**Adivina la Palabra con IA** es un juego de palabras donde el jugador debe descubrir una palabra oculta basándose en su categoría y con ayuda de pistas inteligentes. El juego está completamente en español y funciona de manera offline.

### ✨ Características

- 🎯 **20 palabras únicas** con categorías variadas (animales, ciencia, geografía, etc.)
- 💡 **Sistema de 3 pistas** progresivas que van de lo general a lo específico
- 🎮 **6 intentos** para adivinar cada palabra
- 📱 **Diseño responsive** optimizado para móviles y escritorio
- 🌙 **Modo oscuro** con gradientes elegantes
- 🔌 **100% offline** - no requiere conexión a internet
- 🤖 **Preparado para IA real** - estructura lista para integrar OpenAI


## 🚀 Comenzar

### Prerrequisitos

- Node.js 18+ (recomendado Node.js 20)
- npm o yarn
- Docker (opcional)

### Instalación Local

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/TU_USUARIO/adivina-la-palabra-ia.git
   cd adivina-la-palabra-ia
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Ejecuta en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abre en tu navegador:**
   ```
   http://localhost:3000
   ```

### 🐳 Ejecución con Docker

#### Opción 1: Docker Compose (Recomendado)

```bash
# Construir y ejecutar
docker-compose up --build

# O en segundo plano
docker-compose up -d --build
```

#### Opción 2: Docker directo

```bash
# Construir imagen
docker build -t adivina-la-palabra-ia .

# Ejecutar contenedor
docker run -p 3000:3000 adivina-la-palabra-ia
```

#### Modo Desarrollo con Docker

```bash
# Usar el compose de desarrollo con hot-reload
docker-compose -f docker-compose.dev.yml up
```

La aplicación estará disponible en `http://localhost:3000`

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| **Next.js 14** | Framework React con App Router |
| **TypeScript** | Tipado estático para mayor robustez |
| **TailwindCSS** | Estilos utility-first |
| **React Hooks** | Manejo de estado del juego |
| **API Routes** | Backend para sistema de pistas |

## 📁 Estructura del Proyecto

```
adivina-la-palabra-ia/
├── app/
│   ├── api/
│   │   └── hint/
│   │       └── route.ts      # API de pistas
│   ├── juego/
│   │   └── page.tsx          # Página del juego
│   ├── globals.css           # Estilos globales
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Página de inicio
├── components/
│   └── GameBoard.tsx         # Componente principal del juego
├── lib/
│   └── words.ts              # Lista de palabras y tipos
├── Dockerfile                # Configuración Docker
├── docker-compose.yml        # Docker Compose producción
├── docker-compose.dev.yml    # Docker Compose desarrollo
├── tailwind.config.js        # Configuración Tailwind
└── README.md                 # Este archivo
```

## 🎮 Cómo Jugar

1. **Inicia el juego** haciendo clic en "Empezar a jugar"
2. **Observa la categoría** de la palabra oculta
3. **Escribe tu respuesta** en el campo de texto
4. **Usa las pistas** si necesitas ayuda (máximo 3)
5. **Gana** adivinando la palabra antes de agotar los 6 intentos

## 🤖 Desarrollo Asistido por IA

Este proyecto fue desarrollado utilizando **Cursor IDE** con asistencia de inteligencia artificial. El proceso incluyó:

- ✅ Generación de estructura base del proyecto
- ✅ Creación de componentes React con TypeScript
- ✅ Diseño de la interfaz con TailwindCSS
- ✅ Implementación de la lógica del juego
- ✅ Configuración de Docker para despliegue
- ✅ Documentación y mejores prácticas

### Integración con OpenAI (Opcional)

El sistema está preparado para usar IA real. Para activarlo:

1. Obtén una API key de OpenAI
2. Crea un archivo `.env.local`:
   ```
   OPENAI_API_KEY=tu_api_key_aqui
   ```
3. Descomenta el código en `app/api/hint/route.ts`
4. Instala el paquete: `npm install openai`

## 🔮 Mejoras Futuras

- [ ] 🏆 Sistema de puntuación y ranking
- [ ] 📊 Estadísticas del jugador
- [ ] 🌐 Más idiomas (inglés, portugués)
- [ ] 🎨 Temas personalizables
- [ ] 🔊 Efectos de sonido
- [ ] 📱 PWA para instalación móvil
- [ ] 🤝 Modo multijugador
- [ ] 📝 Editor de palabras personalizadas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2025

Se concede permiso, libre de cargos, a cualquier persona que obtenga una copia
de este software y de los archivos de documentación asociados...
```

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el increíble framework
- [TailwindCSS](https://tailwindcss.com/) por el sistema de utilidades CSS
- [Cursor](https://cursor.sh/) por la asistencia en el desarrollo

---

<p align="center">
  Hecho con ❤️ y 🤖 asistencia de IA
</p>

