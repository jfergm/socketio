// server.js
// where your node app starts

// init project

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', (message) => {
    console.log(message);
    io.emit('chat message', message);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});
