var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

// 跨域设置
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const doRequest = (res, options = {}) => {
  console.log('doRequest===============', options)
  request(options, (error, resp, body) => {
      if (!error && resp.statusCode == 200) {
      res.json(Object.assign(JSON.parse(body), {return_code: 0, return_info: 'ok'}))
    } else {
      console.log('doRequest===============', error)
      res.json({return_code: 1000, return_info: 'server error'})
    }
  })
}

//模拟 get 请求
app.use('/place/suggestion', express.Router().get('/', (req, res, next) => doRequest(res, {
  method: 'GET',
  url: 'http://api.map.baidu.com/place/v2/suggestion',
  qs: Object.assign({ak: 'HRGVIZaERPQqrudUwFwzMPRy', output: 'json', region: '全国'}, req.query),
})))

//模拟 post 请求
app.use('/direction/transit', express.Router().post('/', (req, res, next) => doRequest(res, {
  method: 'GET',
  url: 'http://api.map.baidu.com/direction/v2/transit',
  qs: Object.assign(JSON.parse(req.body.body), {ak: 'HRGVIZaERPQqrudUwFwzMPRy'}),
})))

//模拟 post 请求
app.use('/joke/rand', express.Router().post('/', (req, res, next) => doRequest(res, {
  method: 'POST',
  url: 'http://v.juhe.cn/joke/randJoke.php',
  qs: Object.assign(JSON.parse(req.body.body), {key: '0d4818dd0829e4a5ff44ae3e31db9153'}),
})))

// app.use('/staticImage', express.Router().post('/', (req, res, next) => doRequest(res, {
//   method: 'POST',
//   url: '123.json',
//   qs: Object.assign({ak: 'gdQqTNMXz82QGStsTtX0OCvlrnvK1bv4'}, JSON.parse(req.body.body)),
// })))
app.use('/staticImage', express.Router().post('/', (req, res, next) => doRequest(res, {
  method: 'POST',
  url: '123.json',
  qs: Object.assign({ak: 'gdQqTNMXz82QGStsTtX0OCvlrnvK1bv4'}, JSON.parse(req.body.body)),
})))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
