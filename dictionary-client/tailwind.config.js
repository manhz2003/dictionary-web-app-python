export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'custom': "url('./src/assets/images/banner.png')",
        'custom2': "url('./src/assets/images/banner-2.png')",
        'custom3': "url('./src/assets/images/banner-3.png')",
        'custom-avatar': "url('./src/assets/images/bg-avatar.png')",
      }),
      backgroundSize: {
        'zoom': '110%',
        'zoom-large': '100%',
      },
    },
  },
  plugins: [],
}