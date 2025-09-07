module.exports = {
    content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}", "./index.html"],
    theme: {
      extend: {
        colors: {
          neon: {
            DEFAULT: '#00e5ff',
            soft: '#7beaff'
          },
          bg: '#050a16'
        },
        boxShadow: {
          'neon': '0 8px 30px rgba(0,229,255,0.12)'
        }
      }
    },
    plugins: []
  }