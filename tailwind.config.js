const assetDir = '/src/assets/images'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  purge: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        'neuschwanstein-1-grad': `linear-gradient(to bottom, transparent 80%, var(--color-brdr-black) 85%), url('${assetDir}/bg-neuschwanstein-1-2x-c.jpg')`,
        'btn-gold': 'linear-gradient(to bottom, var(--color-btn-bg-top-gold) 0%, var(--color-btn-bg-bottom-gold) 90%)'
      },
      boxShadow: {
        'in-out-btn-hvr-top-gold-bottom-black': 'inset 0 3px 1px -2px var(--color-btn-hvr-gold), 0 -4px 8px -4px var(--color-btn-hvr-gold), -2px 2px 6px var(--color-ctnr-shdw-black)',
        'out-btn-bottom-black': 'inset 0 3px 1px -2px rgba(240,202,165,0), 0 -4px 8px -4px rgba(240,202,165,0), -2px 2px 6px var(--color-ctnr-shdw-black)',
      },
      dropShadow: {
        'out-a-gold': '0 0 4px var(--color-btn-hvr-gold)'
      },
      fontFamily: {
        noto: ['Noto Sans', 'sans-serif']
      },
      colors: {
        bg: {
          indigo: '#EBD8BA', 
        },
        brdr: {
          goldBrdrTop: '#8A5A46',
          goldBrdrBottom: '#2E2B2D',
          black: '#201B18',
        },
        form: {
          blackInShdw: '#151619',
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
        }
      })
    })
  ],
}
