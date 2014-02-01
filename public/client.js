// var socket = io.connect('http://chinweiw-tartanhacks.nodejitsu.com/');
var socket =io.connect('http://localhost:3700');

var username;
var thumbnail;
var points;
var field = document.getElementById("field");

window.onload = function() {
 
    
    
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var usr;
    socket.on('login', function (data) {
        if(data.status=='Ready')
        {
             alert("ready to login!");
            
        }
    });
 
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
            // console.log('Welcome!  Fetching your information.... ');
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

        points=data.points;
        console.log(username+" has "+points);

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


socket.on('updatePoints',function (data){
    points=data;
    console.log(username+" has "+points);

})

$('#points').on('click',function(){

  socket.emit('showUsers',{});
})

$(document.body).on('click', '.post', function() {
     var index = $(this).index();
     socket.emit('removePost', index);

});


function setActive(e){
  var par = $(event.target).closest("li").attr("id");
  console.log(par);
  window.activeRequest = par;
  $("#popup-content").html("");
  $("#popup-content").append("<div class='active list-content'></div>");
  $(".active.list-content").append($("#"+window.activeRequest).find(".list-content").html());
  $("#popup-content").append("<div class='active list-meta'></div>");
  $(".active.list-meta").append($("#"+window.activeRequest).find(".list-meta").html());
}

function untoggle(){
  $(".hidden").removeClass("hidden");
  $(".active-request").html("");
  $(".ui-page").css("min-height", "0px");
  $(".ui-page").css("padding-top", $(".header").height());
}

function acceptRequest(){
  $(".hidden").removeClass("hidden");
  console.log("Accepted " + window.activeRequest);
  $(".active-request").html("<div class='active-header'>Now Helping</div>");
  $(".active-header").append("<a href='' onclick=untoggle()><img src='images/close.png' class='active-close' /></a>");
  $(".active-request").append("<div class='active-body'></div>");
  $(".active-body").append("<div class='active list-content'></div>");
  $(".active.list-content").append($("#"+window.activeRequest).find(".list-content").html());
  $(".active-body").append("<div class='active list-meta'></div>");
  $(".active.list-meta").append($("#"+window.activeRequest).find(".list-meta").html());
  $(".active-request").append("<div class='active-footer'></div>");
  $("#"+window.activeRequest).addClass("hidden");
}

$(document).on("pageinit", function(event){
  $('.list-expand').click(function(e){
    if($(this).hasClass("protected") == false){
      $('.dropdown-btn').slideUp(100);
      $(this).addClass("protected");
      setTimeout(function(){
        $(".protected").removeClass("protected");
        },150);
      if($(this).hasClass("down") == false){
        $(this).parent().find('.dropdown-btn').slideDown(100);
        $(".down").removeClass("down");
        $(this).addClass("down");
      }
      else {
        $(this).removeClass("down");
      }
    }
  });
});

$(document).ready(function(){
  $("li").each(function() {
    $(this).attr("id", Math.random().toString(36).slice(2));
  });
})




// (function(){var a;if(navigator.platform==="iPad"){a=window.orientation!==90||window.orientation===-90?"images/startup-tablet-landscape.png":"images/startup-tablet-portrait.png"}else{a=window.devicePixelRatio===2?"images/startup-retina.png":"images/startup.png"}document.write('<link rel="apple-touch-startup-image" href="'+a+'"/>')})()
// The script prevents links from opening in mobile safari. https://gist.github.com/1042026

// (function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")










