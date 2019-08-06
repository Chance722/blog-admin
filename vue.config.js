const webpack = require('webpack')
const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.min'
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $api: [path.resolve(__dirname, `./src/api/index.js`), 'default'],
      })
    ], 
  },
}