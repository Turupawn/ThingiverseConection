var http = require('http');
var requesta = require("request")

var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  access_token = request.url.split('value=')[1]
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
      response.end(str_response);
    })
  }else
  {
    str_response ="<a href='https://www.thingiverse.com/login/oauth/authorize?client_id=01e6eab25045aa343883&redirect_uri=http://rosalilastudio.com:8000&response_type=token'>login with thingiverse</a>"
    str_response+= "<script>"
    str_response+= "if(window.location.hash.split('access_token=')[1])"
    str_response+= "window.location = '/?value='+window.location.hash.split('access_token=')[1]"
    str_response+= "</script>"
    response.end(str_response);
  }
});

server.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");
