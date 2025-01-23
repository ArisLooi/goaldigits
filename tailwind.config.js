module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths to your project structure
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)', // Map the CSS variable to Tailwind
        foreground: 'var(--foreground)', // Map other variables if needed
      },
    },
  },
  plugins: [],
};

