/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(217, 91%, 60%)',
        'primary-hover': 'hsl(217, 91%, 55%)',
        accent: 'hsl(142, 71%, 45%)',
        'accent-hover': 'hsl(142, 71%, 40%)',
        success: 'hsl(142, 71%, 45%)',
        warning: 'hsl(38, 92%, 50%)',
        error: 'hsl(0, 84%, 60%)',
        info: 'hsl(199, 89%, 48%)',
        text: 'hsl(222, 47%, 11%)',
        'text-muted': 'hsl(215, 14%, 46%)',
        bg: 'hsl(0, 0%, 100%)',
        'bg-subtle': 'hsl(210, 20%, 98%)',
        surface: 'hsl(0, 0%, 100%)',
        'surface-hover': 'hsl(210, 20%, 97%)',
        border: 'hsl(214, 15%, 91%)',
      },
      boxShadow: {
        'card': '0 1px 3px hsla(222, 47%, 11%, 0.08), 0 8px 24px hsla(222, 47%, 11%, 0.06)',
        'card-hover': '0 4px 12px hsla(222, 47%, 11%, 0.10), 0 12px 32px hsla(222, 47%, 11%, 0.08)',
        'dialog': '0 16px 48px hsla(222, 47%, 11%, 0.16)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-up': 'slideUp 250ms cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}