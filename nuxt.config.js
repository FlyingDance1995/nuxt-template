const pkg = require('./package');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  router: {
    middleware: 'i18n'
  },

  /*
  ** Global CSS
  */
  css: [
    `~assets/less/mainnet-style.less`
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vuechart.js', ssr: true },
    { src: '~/plugins/iview.js', ssr: true },
    '~/plugins/i18n.js'
  ],

  generate: {
    routes: ['/', '/about', '/vi', '/vi/about']
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vue-echarts', 'resize-detector'],
    loaders: {
      less: { javascriptEnabled: true }
    },
    module: {
      rules: [
        {
          test: /\.md$/,
          loader: 'vue-loader!vue-md-loader'
        }
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      let { isDev, isClient, isServer } = ctx;
      if (isServer) {
        config.externals = [
          nodeExternals({
            // default value for `whitelist` is
            // [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i]
            whitelist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i, /^vue-echarts/]
          })
        ]
      }
    }
  }
};
