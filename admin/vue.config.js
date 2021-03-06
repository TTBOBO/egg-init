const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BasicPlugin = require('./BasicPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
var ZipPlugin = require('zip-webpack-plugin')
let prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push(new BundleAnalyzerPlugin({
      analyzerPort: 8889
    }), new BasicPlugin(),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      include: ['static'],
      exclude: ['index.html'],
      test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8,
      cache: true
    }), new ZipPlugin({
      filename: 'static.zip',
      pathPrefix: '',
      // exclude: ['index.html'],
      pathMapper: function (assetPath) {
        // put all pngs in an `images` subdir
        if (assetPath.indexOf('static/index/') > -1) {
          return path.join(
            path.dirname(assetPath).replace('static/index', 'index'),
            path.basename(assetPath)
          )
        }
        return assetPath
      },
      fileOptions: {
        mtime: new Date(),
        mode: 0o100664, // -rw-rw-r--
        compress: true,
        forceZip64Format: false
      },
      zipOptions: {
        forceZip64Format: false
      }
    }))
}
module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    externals: {
      echarts: 'echarts'
    }, //配置全局变量
    optimization: {
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          terserOptions: {
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
