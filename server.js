var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');


var app = new (require('express'))()
var port = 3000


var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/routes/index.html')
})

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var data = require('./public/data.json');
// 接收 留言 的
var fs= require("fs")
app.post('/', function(req, res, next) {
  console.log(req.body);

  
  data.unshift(req.body)
  console.log(data)
  var datastring = JSON.stringify(data);
  
  //保存文件
  fs.writeFile('./public/data.json', datastring, function (err) {
    if (err) throw err;
    console.log('It\'s saved!'); //文件被保存
  });

  res.json(req.body);
});

var Dynamic = require('./public/Dynamic.json');
// 接收 时光轴 的 Post 请求
app.post('/Dynamic', function(req, res, next) {
  console.log(req.body);

  Dynamic.unshift(req.body)
  var DynamicString = JSON.stringify(Dynamic);
  //保存文件
  fs.writeFile('./public/Dynamic.json', DynamicString, function (err) {
    if (err) throw err;
    console.log('It\'s saved!'); //文件被保存
  });

  res.json(req.body);
});

// 接受图片的 Post http://www.cnblogs.com/bruce-gou/p/5708439.html
var formidable = require('formidable');
app.post('/uploadimage', function(req, res, next){
  var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public/TimelineFilesImg/';     //设置上传目录/并且保证该目录存在 否则上传不成功
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
  form.parse(req, function(err, fields, files) {
    if (err) {
     console.log(err);
    }  
    var extName = '';  //后缀名
    console.log(files);
    switch (files.fulAvatar.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;         
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;         
    }
    if(extName.length == 0){
        console.log('只支持png和jpg格式图片');
        return;                   
    }
    var avatarName = files.fulAvatar.name;
    var newPath = form.uploadDir + avatarName;
    fs.renameSync(files.fulAvatar.path, newPath);  //重命名
    console.log("图片新路劲 :"+newPath);//路劲
  });
});



app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})




