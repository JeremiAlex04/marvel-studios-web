/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GUÍA DE ESTILOS DE ALTO IMPACTO Y ESTÉTICA CINEMATOGRÁFICA MARVEL STUDIOS
        marvel: {
          // 1. Fondo de Pantalla y Contenedores (La "Atmósfera")
          bg: '#0D0D0D',            // Negro Profundo (#0D0D0D / #101010)
          dark: '#0D0D0D',
          darker: '#0D0D0D',
          card: '#1F1F1F',          // Gris Carbón Muy Oscuro (#1F1F1F / #252525)
          panel: '#252525',
          cardHover: '#2A2A2A',

          // 2. Tipografía (Legibilidad)
          white: '#FFFFFF',         // Blanco Puro para Encabezados (H1, H2, H3) (#FFFFFF)
          heading: '#FFFFFF',
          body: '#E0E0E0',          // Gris Claro para Texto de Cuerpo (#E0E0E0 / #D1D1D1)
          muted: '#9E9E9E',         // Gris Medio para Metadatos (#9E9E9E / #888888)

          // 3. Elementos de Interacción y Énfasis (La "Acción")
          red: '#E62429',           // Rojo Marvel Intenso (#E62429)
          redHover: '#FF2A2F',      // Rojo más brillante al pasar el cursor (#FF2A2F)
          gold: '#FBB040',          // Oro/Amarillo Poderoso (#FBB040)
          goldHover: '#FCCA58',

          // 4. Elementos Temáticos y de Categoría ("El Multiverso")
          quantum: '#00D2FF',       // Cósmico / Tecnológico Azul (#00D2FF)
          mystic: '#8A2BE2',        // Místico / Magia Púrpura (#8A2BE2 / #6A1B9A)
          gamma: '#00FF66',         // Gamma / Fuerza / Loki Verde (#00FF66)
        },
        heroverse: {
          red: '#E62429',
          gold: '#FBB040',
          white: '#FFFFFF',
          dark: '#0D0D0D',
          darker: '#0D0D0D',
          card: '#1F1F1F',
          quantum: '#00D2FF',
          mystic: '#8A2BE2',
          gamma: '#00FF66',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        hero: ['Bebas Neue', 'Impact', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 25px -5px rgba(230, 36, 41, 0.65)',
        'glow-gold': '0 0 25px -5px rgba(251, 176, 64, 0.65)',
        'glow-quantum': '0 0 25px -5px rgba(0, 210, 255, 0.65)',
        'glow-mystic': '0 0 25px -5px rgba(138, 43, 226, 0.65)',
        'glow-gamma': '0 0 25px -5px rgba(0, 255, 102, 0.65)',
        'glow-card': '0 10px 30px -10px rgba(0, 0, 0, 0.9), 0 0 15px 0 rgba(230, 36, 41, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'beam-glow': 'beam 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        beam: {
          '0%': { opacity: '0.3', transform: 'scale(0.98)' },
          '100%': { opacity: '0.8', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
