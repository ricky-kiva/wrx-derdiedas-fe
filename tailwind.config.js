const assetDir = '/src/assets/images'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  purge: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        'neuschwanstein-1-grad': `linear-gradient(to bottom, transparent 80%, var(--color-brdr-black) 85%), url('${assetDir}/bg-neuschwanstein-1-2x-c.jpg')`,
        'neuschwanstein-1-mobile-grad': `linear-gradient(to bottom, transparent 75%, var(--color-brdr-black) 80%), url('${assetDir}/bg-neuschwanstein-1-2x-c.jpg')`,
        'btn-gold': 'linear-gradient(to bottom, var(--color-btn-bg-top-gold) 0%, var(--color-btn-bg-bottom-gold) 90%)',
        'form-black': 'linear-gradient(to bottom, var(--color-form-shdw-in-black) 10%, var(--color-btn-bg-bottom-gold) 25%)'
      },
      boxShadow: {
        'in-out-btn-hvr-top-gold-bottom-black': 'inset 0 3px 1px -2px var(--color-btn-hvr-gold), 0 -4px 8px -4px var(--color-btn-hvr-gold), -2px 2px 6px var(--color-ctnr-shdw-black)',
        'out-btn-bottom-black': 'inset 0 3px 1px -2px rgba(240,202,165,0), 0 -4px 8px -4px rgba(240,202,165,0), -2px 2px 6px var(--color-ctnr-shdw-black)',
      },
      dropShadow: {
        'out-a-gold': '0 0 4px var(--color-btn-hvr-gold)',
        'out-txt-black': '0 0 2px rgba(0,0,0,1), 0 0 4px rgba(0,0,0,0.75)'
      },
      keyframes: {
        'spin-propeller': {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(30deg)' },
          '30%': { transform: 'rotate(120deg)' },
          '60%': { transform: 'rotate(300deg)' },
          '100%': { transform: 'rotate(4320deg)' },
        },
        'error-jump': {
          '0%':   { transform: 'translate(-50%, 200%)', opacity: '0' },
          '35%':  { transform: 'translate(-50%, -12px)', opacity: '1' },
          '50%':  { transform: 'translate(-50%, 0%)',    opacity: '1' },
          '85%':  { transform: 'translate(-50%, 0%)',    opacity: '1' },
          '100%': { transform: 'translate(-50%, 200%)',  opacity: '0' }
        }
      },
      animation: {
        'spin-propeller': 'spin-propeller 1.6s cubic-bezier(0.2, 0.0, 0.1, 1) forwards',
        'error-jump': 'error-jump 2s ease-in-out forwards'
      },
      fontFamily: {
        noto: ['Noto Sans', 'sans-serif']
      },
      colors: {
        bg: {
          indigo: '#EBD8BA', 
        },
        txt: {
          black: 'var(--color-btn-bg-bottom-gold)'
        },
        brdr: {
          goldBrdrTop: '#8A5A46',
          goldBrdrBottom: '#2E2B2D',
          black: '#201B18',
        },
        ctnr: {
          blackOutShdw: 'var(--color-ctnr-shdw-black)'
        },
        svg: {
          redHvr: '#A33424'
        },
        a: {
          goldHvr: 'var(--color-btn-hvr-gold)'
        }
      }
    },
  },
  plugins: [
    (function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-a-gold': {
          'text-shadow': '0 0 6px var(--color-btn-hvr-gold)'
        },
        '.drop-shadow-txt-black': {
          filter: `drop-shadow(0 0 2px rgba(26, 27, 31, 1)) drop-shadow(0 0 3px rgba(26, 27, 31, 0.8)) drop-shadow(0 0 4px rgba(26, 27, 31, 0.6))`,
        }
      })
    })
  ],
}
