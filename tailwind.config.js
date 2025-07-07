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
        btn: {
          goldHvr: '#8F604A'
        },
        form: {
          blackInShdw: '#151619',
        },
        ctnr: {
          blackOutShdw: '#1A1B1F'
        }
      }
    },
  },
  plugins: [],
}
