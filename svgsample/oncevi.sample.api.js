/*
*
*/
var fs            = require('fs')
var path          = require('path')


/*
regist module: redirect request
*/
//app.mod('oncevi.sample', './mod/svgsample')

/*
Sample api
*/
var sampleJSON = {}
var M_NUM = 24

var getSampleJSON = function() {
  for ( var i = 0; i < M_NUM; i++) {
    sampleJSON['M' + ((i < 10) ? ('0' + i) : i)] = false
  }
  sampleJSON.percent = 0

  sampleJSON.chart = [
      [ 'Category', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]
    , [ 'Apple', 29.76, 0, 32.80, 196.45, 0.1993, 98.07, 13.92, 5.14  ]
    , [ 'Orange', 29.76, 0, 32.80, 196.45, 0.1993, 98.07, 13.92, 5.14 ]
    , [ 'Banana', 29.76, 0, 32.80, 196.45, 0.1993, 98.07, 13.92, 5.14 ]
  ]

  return sampleJSON
}

var setSampleJSON = function() {
  var num = Math.random() * M_NUM | 0
  var key = num < 10 ? ('M0' + num) : ('M' + num)

  sampleJSON[key] = !sampleJSON[key]
  sampleJSON.voltage = 220 + Math.random() * 10 - 5
  sampleJSON.current = 2 + Math.random() * 2 - 1
  sampleJSON.percent += Math.random() * 0.1

  for (var i = 1; i < sampleJSON.chart.length; i++) {
    for (var j = 1; j < sampleJSON.chart[i].length; j++) {
      sampleJSON.chart[i][j] = Math.random() * 100 - 10
    }
  }

  if (sampleJSON.percent > 1) {
    sampleJSON.percent = Math.random() * 0.1
  }

  return sampleJSON
}

getSampleJSON()

app.get('/oncevi.sample/api/json', function(req, res) {
  res.json(setSampleJSON())
})

app.get('/oncevi.sample/api/jsonp', function(req, res) {
  var json = JSON.parse(JSON.stringify(setSampleJSON()))
  json.prev = '/oncevi.sample/api/jsonp?pager=prev&callback=?'
  json.next = '/oncevi.sample/api/jsonp?pager=next&callback=?'
  res.jsonp(json)
})

app.get('/oncevi.sample/api/script', function(req, res) {
  var sample = setSampleJSON()
  res.send('var DATA=' + JSON.stringify(sample))
})

app.post('/oncevi.sample/api/post', function(req, res) {
  var body = req.body
  res.send(body)
})






/*
User data manual
*/
var USER_JSON = {
    username  : 'New User'
  , telephone : '15888888888'
  , userlist  : [
      [ 'Username'    , 'Telephone' ]
    , [ 'Kris Zhang'  , '15921444444' ]
    , [ 'Jerry Luo'   , '18588888888' ]
    , [ 'Tome Li'     , '15888888888' ]
  ]
}

app.post('/oncevi.sample/api/user/add', function(req, res) {
  var userInfo = req.body
  for (var i = 1; i < USER_JSON.userlist.length; i++) {
    if (userInfo.username == USER_JSON.userlist[i][0]) {
      res.send({ error: 'User already exist' })
      return
    }
  }

  USER_JSON.userlist.push([ userInfo.username, userInfo.telephone ])

  USER_JSON.userlist.length > 100 && USER_JSON.userlist.splice(4)

  res.send(userInfo)
})

app.get('/oncevi.sample/api/user/list', function(req, res) {
  res.send(USER_JSON)
})