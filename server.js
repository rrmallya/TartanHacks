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


io.set('log level', 1);


    socket.emit('login', {status:'Ready'});
    var usrid=socket.id;
    socket.on('username', function (data) {
    	users=users.concat([{id:usrid , name: data.name,points:100}]);
    	console.log(users);
        socket.emit('pageLoad', {page:'helpFeed',points:100});
        socket.emit('populatePosts',posts);

    });


	socket.on('helpReq', function (data) {
		console.log(data);
		posts.push(data);
		var pointsupdated;
			for(var i=0;i<users.length;i++){
	 		if(users[i].id==socket.id){
	 			users[i].points-=10;
	 			console.log(users);
	 			socket.emit('updatePoints',users[i].points);
	 		}
	 	}
	 	io.sockets.emit('populatePosts', posts);
	});

	 socket.on('removePost', function (data) {
	 	console.log('lets remove',data);
	 	posts.splice(data, 1);
	 	console.log(users);
	 	console.log("sender: ",socket.id);
	 	for(var i=0;i<users.length;i++){
	 		if(users[i].id==socket.id){
	 			users[i].points+=10;
	 			pointsupdated=users[i].points;
	 			socket.emit('updatePoints',users[i].points);
	 			console.log(users);
	 		}

	 	}
	 	
	 	io.sockets.emit('populatePosts', posts);
	 });
// socket.broadcast.emit('user connected');

	socket.on('showUsers',function (data) {
		console.log(users);
	});

});


console.log("Listening on port " + port);