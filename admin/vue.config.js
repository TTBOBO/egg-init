const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BasicPlugin = require('./BasicPlugin')
let prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push(new BundleAnalyzerPlugin(), new BasicPlugin())
}
module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    externals: {}, //配置全局变量
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true,
          uglifyOptions: {
            // ecma: 8,
            // warnings: false,
            compress: {
              drop_debugger: false,
              drop_console: false
            }
          },
          // cache:true,  //开启catch  比什么都开启 少1分钟
          parallel: true //开启多线程 比不开启少了25秒
        })
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        util: ['@/assets/js/util', 'default']
      })
    ].concat(prodPlugins)
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 8080
  }
}
