const path = require('path')
const webpack = require('webpack')
const WebpackChokidarPlugin = require('webpack-chokidar-plugin')
const { getIconClasses } = require('./getIconClasses')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/css/index.scss";`
      },
    },
  },
  publicPath: BASE_URL,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', ],
      alias: {
        'vue$': 'vue/dist/vue.min',
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        $api: [path.resolve(__dirname, `./src/api/index.js`), 'default', ],
      }),
      new WebpackChokidarPlugin({
        watchFilePaths: [
          './src/assets/icons/**'
        ],
        onAddCallback: listenPath => getIconClasses(listenPath),
        onChangeCallback: listenPath => getIconClasses(listenPath),
      }),
    ],
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  productionSourceMap: false,
}
