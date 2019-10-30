module.exports = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: '/box2d/embox2d-noclosure.min.js' },
      { src: '/box2d/embox2d-helpers.js' },
      { src: '/box2d/embox2d-html5canvas-debugDraw.js' }
    ]
  },
  render: {
    static: {
      maxAge: 0
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/css/main.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  // modules: ['@nuxtjs/pwa'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    postcss: {
      plugins: [
        require('postcss-import'),
        require('postcss-nested'),
        require('postcss-math'),
        require('postcss-extend'),
        require('postcss-for'),
        require('tailwindcss'),
        require('autoprefixer'),
      ]
    },
    optimization: {
    },
    tsx: {
    },
    babel: { plugins: ["jsx-v-model", "transform-vue-jsx"] }
  }
}
