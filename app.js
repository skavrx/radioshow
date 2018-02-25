var mysql = require('mysql');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var io = require('socket.io')(http);
var ss = require('socket.io-stream');

app.use(express.static(`${__dirname}`));

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('start', { hello: 'worold' });
  socket.on('stream', function (data) {
    console.log(data);
    var stream = ss.createStream();
    var filename = __dirname + '/songs/test.mp3' ;
    ss(socket).emit('audio-stream', stream, { name: filename });
    fs.createReadStream(filename).pipe(stream);
  });
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});



/*
var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
*/
