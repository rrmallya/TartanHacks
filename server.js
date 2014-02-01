var express = require("express");
var app = express();
var port = 3700;
var users=[];




 app.set('views', __dirname + '/views');

app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("clientpage");
});


 app.use(express.static(__dirname + '/public'));




var io = require('socket.io').listen(app.listen(port));

io.set('log level', 1);


io.sockets.on('connection', function (socket) {

    
    socket.emit('login', {login:'now'});
    var usrid=socket.id;
    socket.on('username', function (data) {
    	users=users.concat([{id:socket.id , name: data.name}]);
    	console.log(data);
        socket.emit('pageLoad', {page:'helpFeed'});

    });



});


console.log("Listening on port " + port);