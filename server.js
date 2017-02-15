/**
 * variable app using for require express server
 * http using for create http server
 * io variable present for socket.io running on httpserver
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/**
 * [using when to connect some files in project]
 * @param  {[http]} req    [request]
 * @param  {[http]} res){               
 * res.sendfile('view/client.html');} [using when to determine what file to load and where that file]
 */
app.get('/', function(req, res){
  res.sendfile('view/client.html');
});

/**
 * [Tells the app what port need to be listen to the app]
 */
var port = 8000;
http.listen(port, function(){
  console.log('Running server on port: ' + port);
});

//Whenever someone connects this gets executed
//when have connection, 'connection' command will catch connect and
//show a message to annouce that one user is connect to the server
//through specific port
io.on('connection', function(socket){
  
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });


});