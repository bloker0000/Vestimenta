module.exports = {
  purge: [
    './**/*.html',
    './src/**/*.js',
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        vestimenta: {
          beige: '#C8B8B1',
          dark: '#272121',
          taupe: '#BDAA9F',
          gray: '#CEC9CC',
          blue: '#6D7D97',
        }
      },
      fontFamily: {
        sans: ['Quicksand', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['TT Corals', 'Georgia', 'serif'],
      },
      spacing: {
        '128': '32rem',
      },
      height: {
        'screen-75': '75vh',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      zIndex: {
        '-1': '-1',
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['active'],
      scale: ['group-hover'],
      transform: ['hover', 'group-hover'],
    },
  },
  plugins: [],
}