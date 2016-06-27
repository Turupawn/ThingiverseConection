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
    promises2 = []
    promises_collections = []
    collection_ids = [5938346,5024209,5975514]
    users = ["turupawn","sucito","morghan831"]

    for(i=0;i<users.length;i++)
    {
      promise_user_collection = new promise(function(resolve, reject) {
        request(
        {
          url: 'https://api.thingiverse.com/users/'+users[i]+'/collections?access_token='+access_token,
          json: true
        }, function (error, response, body)
        {
          for(j=0;j<response.body.length;j++)
          {
            for(k=0;k<collection_ids.length;k++)
            {
              if(response.body[j].id==collection_ids[k])
              {
                resolve([response.body[j].id,response.body[j].name])
              }
            }
          }
          reject('')
        })
      })

      promises.push(promise_user_collection)

      promise_user_collection.then(function(collection) {
        promises2.push( new promise(function(resolve, reject) {
          request(
          {
            url: 'https://api.thingiverse.com/collections/'+collection[0]+'/things?access_token='+access_token,
            json: true
          }, function (error, response, body)
          {
            collections.push([collection[1],response.body])
            resolve('')
          })
        }))
      })
    }

    for(i=0;i<users.length;i++)
    {
      promises.push( new promise(function(resolve, reject) {
        request(
        {
          url: 'https://api.thingiverse.com/users/'+users[i]+'/copies?access_token='+access_token,
          json: true
        }, function (error, response, body)
        {
          copies.push(response.body)
          resolve('')
        })
      }))
    }

    promise.all(promises).then(function(values) { 
      promise.all(promises2).then(function(values) { 
        res.render('pages/index',{not_logged:false,collections:collections,copies: copies});
      })
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
