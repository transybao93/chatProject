/**
 * variable app using for require express server
 * http using for create http server
 * io variable present for socket.io running on httpserver
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = require('express').Router();
var path = __dirname + '/view/';

/**
 * [using when to connect some files in project]
 * @param  {[http]} req    [request]
 * @param  {[http]} res){               
 * res.sendfile('view/client.html');} [using when to determine what file to load and where that file]
 */
app.get('/', function(req, res){
  res.sendfile('view/client.html');
});

//Whenever someone connects this gets executed
//when have connection, 'connection' command will catch connect and
//show a message to annouce that one user is connect to the server
//through specific port
io.on('connection', function(socket){

  console.log('A user connected');



  /**
   * socket.emit create pure data or data with labels event to server
   * or client.
   * Using socket.emit to sending data...
   * Using socket.on to receive data from socket.emit event...
   * if you want to get data from socket.emit using socket.on,
   * please call socket.on(data);
   * Function setTimeout(callback, after)
   */
  setTimeout(function(){
    //send data instant
    // socket.send('Hehe, tin nhắn này đã được gửi từ server từ 4 giây trước');
    

    //send data using emit
    socket.emit('mess', {fromServer: '123'});

  }, 4000);






  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });


});



/**
 * Router from express configuration
 */
router.get("/",function(req,res){
  res.sendFile(path + "client.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

// router.get("/contact",function(req,res){
//   res.sendFile(path + "contact.html");
// });

app.use("/",router);



/**
 * [Tells the app what port need to be listen to the app]
 */
var port = 8000;
http.listen(port, function(){
  console.log('Running server on port: ' + port);
});