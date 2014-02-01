/*window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: text });
    };
 
}*/
window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var usr;
    socket.on('login', function (data) {
        if(data.status=='Ready')
        {
            alert("ready to login!");
        }
    });
 
    sendButton.onclick = function() {
        usr = field.value;
        socket.emit('username', { name: usr });
        console.log(usr);
    };
    socket.on('pageLoad',function (data){
        alert("message received");
            if(data.page=='helpFeed'){
            var helpReq=prompt("What do you need "+usr+"?");
            var loc;
            if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(function(position){
      var latlng=position.coords.latitude+","+position.coords.longitude;
      console.log(latlng);
      var xhr = new XMLHttpRequest();
      xhr.open("GET","http://maps.googleapis.com/maps/api/geocode/json?latlng="+latlng+"&sensor=true" , false);
      xhr.send();
      console.log(xhr.status);
      console.log(xhr.statusText);
      xmlDocument = xhr.responseText;
      var addresses=JSON.parse(xmlDocument);
      console.log( addresses.results[0].formatted_address);
      loc = addresses.results[0].formatted_address;
        socket.emit('helpReq',{req:helpReq, locations:'loc',points:10});
    });
    }


           
        }
        else
            {console.log("Didn't load shit.");}

    })
    function findLocation(){

        
    }
 
}
