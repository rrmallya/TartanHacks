var express = require("express");
var app = express();
var port = 3700;
var users=[];
var posts=[];

app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("clientpage");
});


 app.use(express.static(__dirname + '/public'));




var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function (socket) {

io.set('log level', 1);
    
    socket.emit('login', {status:'Ready'});
    var usrid=socket.id;
    socket.on('username', function (data) {
    	users=users.concat([{id:socket.id , name: data.name}]);
    	console.log(users);
        socket.emit('pageLoad', {page:'helpFeed'});
    });

socket.on('helpReq',function (data){

	posts.push();
	io.sockets.emit('populate_posts',posts);
	console.log(data);
});

});





console.log("Listening on port " + port);