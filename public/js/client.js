var socket = io();
//In socket.on, create a point call message or whatever you want to create message back to server
socket.on('mess', function(data){
  // document.write(data);
  document.getElementById('d').innerHTML = data.fromServer;
});