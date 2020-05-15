let socket = io();

$('form').submit(function () {
  
  let text = $('#message').val();
  let init = $('#initials').val();   
    let chat = {
        msg: text,
        nick: init
  };
    
    //send chat array over to server containing both msg and nick
socket.emit("send message", chat);
  $('#message').val('');
  return false;
});

//update previously missed messages from the server
socket.on('update messages', function(data){
//    console.log(data);
    let i;
    for (i=0; i<data.length; i++){
 $('<li>').text(data[i]).appendTo('#history');
    }
})

//return both data.nick + says: + data.msg and print to an LI appended to history
socket.on('new message', function(data) {
    $('<li>').text(data).appendTo("#history");
});

//https://stackoverflow.com/questions/20632401/how-to-send-two-variables-in-one-message-using-socket-io
//The above link gave me the idea to try sending the chat as an array

// https://stackoverflow.com/questions/48561935/how-to-send-new-user-the-old-sent-messages-with-socket-io/48565615
//The above gave me the idea about getting old messages from the server using a user index.