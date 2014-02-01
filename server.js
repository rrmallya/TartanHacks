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

io.set('log level', 1);


io.sockets.on('connection', function (socket) {

<<<<<<< HEAD
io.set('log level', 1);
=======
>>>>>>> 7f0db8505060c619bc83b01bc11bed7aec096988
    
    socket.emit('login', {status:'Ready'});
    var usrid=socket.id;
    socket.on('username', function (data) {
    	users=users.concat([{id:socket.id , name: data.name}]);
    	console.log(data);
        socket.emit('pageLoad', {page:'helpFeed'});

    });
<<<<<<< HEAD

socket.on('helpReq',function (data){

	posts.push();
	io.sockets.emit('populate_posts',posts);
	console.log(data);
});

});
=======
>>>>>>> 7f0db8505060c619bc83b01bc11bed7aec096988



});


console.log("Listening on port " + port);