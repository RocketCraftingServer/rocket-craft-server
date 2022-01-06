
module.exports = {

  pages: {
    'index': {
      entry: './src/main.ts',
      template: 'public/index.html',
      title: 'Welcome to my vue generator project. Alternative NODEJS Htpp server powered by MongoDB.',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    'bad': {
      entry: './src/error-instance.ts',
      template: 'public/bad.html',
      title: 'Error page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }

  },
  devServer: {
    port: 1777
  },
  css: {
    sourceMap: true
  },
  pwa: {
    name: 'rocket-admin-panel',
    themeColor: '#000000',
    msTileColor: 'orange',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },

}
