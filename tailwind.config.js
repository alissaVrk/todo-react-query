module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: ".rtw",
  prefix: "r-",
  corePlugins: {
    preflight: false
  },
  theme: {
    fontFamily: {
      sans: ['proxima-soft', 'sans-serif']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      neutral: {
        100: '#f2f2f2',
        200: '#BDBDBD'
      },
      gray: {
        600: '#65778B'
      },
      blue: {
        100: '#E5F0FF',
        500: '#0063ff'
      }
    },
    spacing: {
      px: '1px',
      0: '0px',
      3: '3px',
      5: '5px',
      6: '6px',
      9: '9px',
      12: '12px',
      13: '13px',
      15: '15px',
    },
    fontSize: {
      'base': '14px'
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
      15: "15px",
    },
    extend: {
      borderRadius: {
        sm: '4px',
        DEFAULT: '3px',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  }
}
