const fs = require('fs')
class BasicPlugin {
  constructor() {}
  apply(compiler) {
    compiler.hooks.done.tap('BasicPlugin', stats => {
      const {
        startTime,
        endTime,
        hash
      } = stats
      console.log('hash：' + hash)
      console.log('time：' + (endTime - startTime) + 'ms')
      const timer = parseInt(endTime / 1000) - parseInt(startTime / 1000)
      console.log(timer)
      console.log('打包结束')
      fs.writeFileSync(
        '../admin-server/index.html',
        fs.readFileSync('./dist/index.html')
      )
      fs.createReadStream('./dist/static.zip', {
        highWaterMark: 1024 * 1024 * 5
      }).pipe(fs.createWriteStream('../admin-server/static.zip'))
      console.log('移动文件成功')
    })
  }
}
module.exports = BasicPlugin
