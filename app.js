// server.js
// load the things we need
var express = require('express')
var request = require("request")
var promise = require('promise')
var app = express();

app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  access_token = req.url.split('value=')[1]

  if(access_token)
  {
    collections = []
    copies = []
    promises = []
    collection_ids = ["5938346"]
    users = ["sucito","turupawn"]
    collection_names = ["Turupawn's TODO list"]
    for(i=0;i<collection_ids.length;i++)
    {
      promises.push( new promise(function(resolve, reject) {
        request(
        {
          url: 'https://api.thingiverse.com/collections/'+collection_ids[i]+'/things?access_token='+access_token,
          json: true
        }, function (error, response, body)
        {
          collections.push(response.body)
          resolve('')
        })
      }))
    }

    for(i=0;i<collection_ids.length;i++)
    {
      promises.push( new promise(function(resolve, reject) {
        request(
        {
          url: 'https://api.thingiverse.com/users/'+users[0]+'/copies?access_token='+access_token,
          json: true
        }, function (error, response, body)
        {
          copies.push(response.body)
          resolve('')
        })
      }))
    }


    Promise.all(promises).then(function(values) { 
      res.render('pages/index',{not_logged:false,collections:collections,collection_names: collection_names,copies: copies});
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
