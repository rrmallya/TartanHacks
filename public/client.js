
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
=======
var socket = io.connect('http://localhost');
var username;

window.fbAsyncInit = function() {
    FB.init({
        appId   : '346049582201169',
        oauth   : true,
        status  : true, // check login status
        cookie  : true, // enable cookies to allow the server to access the session
        xfbml   : true // parse XFBML
    });
};

function fb_login(){
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            FB.api('/me', function(response) {
              console.log(response.name, 'response data');
                username = response.name;
                socket.emit('username', username);
                user_email = response.email; //get user email
          // you can store this data into your database             
            });

>>>>>>> 7f0db8505060c619bc83b01bc11bed7aec096988
        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'publish_stream,email'
    });
<<<<<<< HEAD
 
    sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: text });
    };
 
}*/


var socket = io.connect('http://localhost:3700');
var username;
var thumbnail;
var field = document.getElementById("field");

window.onload = function() {
 
    
    
    //var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var usr;
    socket.on('login', function (data) {
        if(data.status=='Ready')
        {
             alert("ready to login!");
            
        }
    });
 
   /* sendButton.onclick = function() {
        usr = field.value;
       
    };*/

    /*socket.on('pageLoad',function (data){
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
        socket.emit('helpReq',{req:helpReq, locations:loc,points:10});
    });
    }


           
        }
        else
            {console.log("Didn't load shit.");}

    })
    function findLocation(){

        
    }*/
 
}




window.fbAsyncInit = function() {
    FB.init({
        appId   : '346049582201169',
        oauth   : true,
        status  : true, // check login status
        cookie  : true, // enable cookies to allow the server to access the session
        xfbml   : true // parse XFBML
    });
};



     function fb_login(){
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            FB.api('/me', {
              fields: ['name', 'picture']
            }, function(response) {
               
                username = response.name;
                thumbnail=response.picture.data.url;
                console.log(username,thumbnail);
                socket.emit('username', {name:username});
                user_email = response.email; //get user email
          // you can store this data into your database             
            });

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'publish_stream,email'
    });


  //    FB.Event.subscribe('auth.authResponseChange', function(response) {
  //   // Here we specify what we do with the response anytime this event occurs. 
  //   if (response.status === 'connected') {
  //     // The response object is returned with a status field that lets the app know the current
  //     // login status of the person. In this case, we're handling the situation where they 
  //     // have logged in to the app.
  //   console.log('logged in!');
    
  //   } else if (response.status === 'not_authorized') {
  //     // In this case, the person is logged into Facebook, but not into the app, so we call
  //     // FB.login() to prompt them to do so. 
  //     // In real-life usage, you wouldn't want to immediately prompt someone to login 
  //     // like this, for two reasons:
  //     // (1) JavaScript created popup windows are blocked by most browsers unless they 
  //     // result from direct interaction from people using the app (such as a mouse click)
  //     // (2) it is a bad experience to be continually prompted to login upon page load.
  //     FB.login();
  //   } else {
  //     // In this case, the person is not logged into Facebook, so we call the login() 
  //     // function to prompt them to do so. Note that at this stage there is no indication
  //     // of whether they are logged into the app. If they aren't then they'll see the Login
  //     // dialog right after they log in to Facebook. 
  //     // The same caveats as above apply to the FB.login() call here.
  //     FB.login();
  //   }
  // }); 
}
(function() {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
}());

socket.on('pageLoad', function (data) {
    // alert ('pageload!');
    if(data.page=="helpFeed"){
        $('#request-help').show();
        $('#usrname').html(username);

        $('#submit-btn').click(function(){
            var helpMsg=field.value;
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
                        socket.emit('helpReq', {
                            name: username,
                            message: helpMsg,
                            usrlocation:loc,
                            points: 10
                            });
                    });
                }
            else
                {console.log("Didn't load shit.");}

        })

            
        }
  })

socket.on('populatePosts', function (data) {
   $('#post-container').empty();
    for (var i=0; i<data.length; i++) {
        $('#post-container').append('<div class="post">'+data[i].name+'\n'+data[i].message+'\n'+data[i].points+'\n'+data[i].usrlocation+i+'<a  href="#">Help this person!</a></div>');
    }
});

socket.on('removePost', function (data) {
   $('#post-container').empty();
    for (var i=0; i<data.length; i++) {
        $('#post-container').append('<div class="post" >'+data[i].name+'\n'+data[i].message+'\n'+data[i].points+'\n'+data[i].usrlocation+i+'<a href="#">Help this person!</a></div>');
    }
});



$(document.body).on('click', '.post', function() {
     var index = $(this).index();
     socket.emit('removePost', index);

});

