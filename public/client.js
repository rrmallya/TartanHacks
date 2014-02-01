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

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'publish_stream,email'
    });


     FB.Event.subscribe('auth.authResponseChange', function(response) {
    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {
      // The response object is returned with a status field that lets the app know the current
      // login status of the person. In this case, we're handling the situation where they 
      // have logged in to the app.

    console.log('logged in!');
    
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so. 
      // In real-life usage, you wouldn't want to immediately prompt someone to login 
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they 
      // result from direct interaction from people using the app (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
      FB.login();
    } else {
      // In this case, the person is not logged into Facebook, so we call the login() 
      // function to prompt them to do so. Note that at this stage there is no indication
      // of whether they are logged into the app. If they aren't then they'll see the Login
      // dialog right after they log in to Facebook. 
      // The same caveats as above apply to the FB.login() call here.
      FB.login();
    }
  }); 

}
(function() {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
}());


socket.on('pageLoad', function (data) {
    // alert ('pageload!');
    $('#request-help').show();

    $('#submit-btn').click(function(){
        console.log(username, 'this is a message', 'points?')
        socket.emit('submit_help', {
            name: username,
            message: 'this is a message',
            points: 'points?'
        });
    })

})

socket.on('populate_posts', function (data) {
    
    updatePosts(data);
})


function updatePosts(data) {
    $('#post-container').empty();
    for (var i=0; i<data.length; i++) {
        $('#post-container').append('<div class="post">'+data[i].name+'\n'+data[i].message+'\n'+data[i].points+i+'<a href="#">Help this person!</a></div>');
    }
}



$(document.body).on('click', '.post', function(e) {
     // console.log($(this).index());
     var index = $(this).index();
     socket.emit('removePost', index);

});


   