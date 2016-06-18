// server.js
// load the things we need
var express = require('express');
var requesta = require("request")
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
  access_token = req.url.split('value=')[1]
  if(access_token)
  {
    requesta(
    {
      url: 'https://api.thingiverse.com/collections/5907119/things?access_token='+access_token,
      json: true
    }, function (error, response_thingiverse, body)
    {
      str_response = "<h1>Rosalila's Hub History</h1>"
      for(i=0;i<JSON.stringify(response_thingiverse.body.length);i++)
      {
        str_response+= "<h2>"+response_thingiverse.body[i].name+"</h2>"
        str_response+= "<img src=\'"+response_thingiverse.body[i].thumbnail+"\'/>"
        str_response+= "<p>"+JSON.stringify(response_thingiverse.body[i])+"</p>"
      }
      //response.end(str_response);

    res.render('pages/index',{not_logged:false,thingiverse:response_thingiverse.body});
    })
  }else
  {
    str_response ="<a href='https://www.thingiverse.com/login/oauth/authorize?client_id=01e6eab25045aa343883&redirect_uri=http://rosalilastudio.com:8000&response_type=token'>login with thingiverse</a>"
    str_response+= "<script>"
    str_response+= "if(window.location.hash.split('access_token=')[1])"
    str_response+= "window.location = '/?value='+window.location.hash.split('access_token=')[1]"
    str_response+= "</script>"
    //response.end(str_response);
    res.render('pages/index',{not_logged:true});
  }
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(8000);
console.log('8000 is the magic port');
