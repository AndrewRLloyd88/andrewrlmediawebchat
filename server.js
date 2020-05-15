let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);
let messageHistory = [];
let client = [];

app.use(express.static('client'));

let io = require('socket.io')(server);

io.on('connection', function(socket) {
    client.push({id : socket.client.id});
//    console.log(client);
    // I don't understand e?
    let getClientID = client.find(e => (e.id === socket.client.id))
//       console.log("the Client", getClientID)
       if(getClientID){
           socket.emit("update messages", messageHistory);
      } 
    
    socket.on('send message', function(data){
        io.sockets.emit('new message', (data.nick+" says: "+data.msg));
        messageHistory.push(data.nick+" says: "+data.msg);
    });
});  


server.listen(8080, function() {
  console.log('Chat server running');
});