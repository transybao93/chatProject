/**
 * variable app using for require express server
 * http using for create http server
 * io variable present for socket.io running on httpserver
 * path used for router
 */
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = require('express').Router();
var path = __dirname + '/view/';
//declare public folder
app.use(express.static('public'));
//mongoose database
var mongoose = require('mongoose');
var mUsername = 'transybao';
var mPassword = 'transybao';
var mDatabase = 'tsbforum';
var mAddress =  'ds161029.mlab.com:61029';
var mTempAddress = 'mongodb://localhost:27017/forum';
//uistring
 var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://' + mUsername + ':' + mPassword + '@' + mAddress + '/' + mDatabase;
    // var app = '--app tsbforum';
//check connection
mongoose.connect(mTempAddress, function (err, res) {
  if (err) {
    console.log ('ERROR: ' + err);
  } else {
    console.log ('Connected !');
  }
});


/**
 * [using when you want to connect some files in project]
 * @param  {[http]} req)    -> request
 * @param  {[http]} res)    -> response        
 * res.sendfile('view/client.html');} [using when to determine what file to load and where that file]
 */
app.get('/', function(req, res){
  res.sendFile(path + 'client.html');
});

//Whenever someone connects this gets executed
//when have connection, 'connection' command will catch connect and
//show a message to annouce that one user is connect to the server
//through specific port
var clients = 0;
io.on('connection', function(socket){
  clients++;
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

    //send connection to current connected client count
    socket.emit('mess_back', {count: clients});

    /**
     * Using socket.broadcast.emit when you want to 
     * send data to all connected clients
     */
    socket.broadcast.emit('count', {count: clients});



  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    //minus the user have just left
    clients--;
    socket.broadcast.emit('count', {count: clients});
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
 * Mongoose Schema
 */
var postSchema = mongoose.Schema({
  pTitle: { type: String, trim: true, required: true },
  pContent: { type: String, trim: true, required: true },
  pAuthor: { type: String, trim: true, required: true },
  pViews: {type: Number, default: 0},
  pCreatedAt: {type: Date},
  userID: {type: Number, required:true},
});
var userSchema = mongoose.Schema({
  uName: {type: String, max: 100, required:true},
  uEmail: {type: String, required:true},
  uPass: {type: String, max: 100, required:true},
  registeredAt: {type: Date},
});
var Post = mongoose.model('Post', postSchema, 'forum');
var User = mongoose.model('User', userSchema, 'forum');
//insert some data
var user = new User({
  uName: 'Trần Sỹ Bảo',
  uEmail: 'bao988@gmail.com',
  uPass: '123',
  registeredAt: new Date(),
});
user.save(function(err, data){
  if(!err)
  {
    console.log('Added new user !');
  }else{
    console.log('Error: ' + err);
  }
});

/**
 * [Tells the app what port need to be listen to the app]
 */
var port = process.env.PORT || 8000;
http.listen(port, function(){
  console.log('Running server on port: ' + port);
});