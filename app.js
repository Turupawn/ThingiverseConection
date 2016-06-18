// server.js
// load the things we need
var express = require('express');
var request = require("request")
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
  access_token = req.url.split('value=')[1]
  if(access_token)
  {
    request(
    {
      url: 'https://api.thingiverse.com/collections/5907119/things?access_token='+access_token,
      json: true
    }, function (error, response_thingiverse, body)
    {
      res.render('pages/index',{not_logged:false,thingiverse:response_thingiverse.body});
    })
  }else
  {
    res.render('pages/index',{not_logged:true});
  }
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(8000);
console.log('8000 is the magic port');
