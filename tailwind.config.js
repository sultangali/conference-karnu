/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New color scheme - Professional Blues
        'cobalt-blue': '#0d47a1',
        'ocean-deep': '#1565c0',
        'twitter-blue': '#1976d2',
        'brilliant-azure': '#1e88e5',
        'cool-sky': '#42a5f5',
        'icy-blue': '#bbdefb',
        'alice-blue': '#e3f2fd',
        
        // Semantic naming
        'primary': {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#1e88e5',
          600: '#1976d2',
          700: '#1565c0',
          800: '#0d47a1',
          900: '#0a3d91',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(13, 71, 161, 0.08), 0 1px 2px 0 rgba(13, 71, 161, 0.06)',
        'card': '0 4px 6px -1px rgba(13, 71, 161, 0.08), 0 2px 4px -1px rgba(13, 71, 161, 0.04)',
        'elevated': '0 10px 15px -3px rgba(13, 71, 161, 0.1), 0 4px 6px -2px rgba(13, 71, 161, 0.05)',
        'strong': '0 20px 25px -5px rgba(13, 71, 161, 0.12), 0 10px 10px -5px rgba(13, 71, 161, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
