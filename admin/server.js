var express = require('express');
var app = express();
 
app.use(express.static('./dist'));//express.static是express提供的内置的中间件用来设置静态文件路径
 
app.get('/', function (req, res) {
    res.sendFile(__dirname);
})
 
var server = app.listen(8082, function () {
    console.log("监听8082端口")
})