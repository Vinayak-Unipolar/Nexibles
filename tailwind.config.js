/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'pink-1': '#D285A9',
        'green-1': '#8CCFB7',
        'blue-1': '#22223B',
        'white-1': '#F2E9E4',
        'white-2': '#FDFCDC',
        'white-3': '#C2C1C2',
        'brown-1': '#DACEBE',
        'skin-1': '#C9ADA7',
        'rose-1': '#9A8C98',
        'blue-2': '#4A4E69',
        'blue-3': '#2D2D42',
        'vanilla': '#EAE2B7',
        'red-1': '#AD1B2E',
      },
      animation: {
        'fly': 'fly 2s ease-in-out infinite',
        'fly-up': 'flyUp 2s ease-in-out infinite',
        'air': 'air 20s linear infinite',
        'air-reverse': 'air-reverse 20s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-delay-1': 'float 3s ease-in-out 1s infinite',
        'float-delay-2': 'float 3s ease-in-out 2s infinite',
        'float-delay-3': 'float 3s ease-in-out 3s infinite',
        'move-down': 'moveDown 10s linear infinite',
        'move-down-fast': 'moveDownFast 3s linear infinite',
        'line-animation-1': 'lineAnim 0.8s linear infinite',
        'line-animation-2': 'lineAnim 1.2s linear infinite',
        'line-animation-3': 'lineAnim 0.6s linear infinite',
        'line-animation-4': 'lineAnim 1.4s linear infinite',
        'line-animation-5': 'lineAnim 1s linear infinite',
        'bounce': 'bounce 0.6s ease-in-out infinite',
        'loading-bar': 'loading-bar 1.5s ease-in-out infinite',
      },
      keyframes: {
        fly: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) translateX(20px) rotate(5deg)' },
        },
        flyUp: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        air: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'air-reverse': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        moveDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        moveDownFast: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        lineAnim: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'loading-bar': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(250%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      spacing: {
        'custom-list-padding': '1.5rem',
        'custom-list-item-margin': '0.5rem',
      },
      typography: {
        'custom-description': {
          css: {
            color: '#000',
            strong: {
              color: '#000',
              fontWeight: '900',
            },
            em: {
              fontStyle: 'italic',
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.5rem',
            },
            li: {
              marginBottom: '0.5rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
