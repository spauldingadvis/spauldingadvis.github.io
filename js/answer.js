// if(!window.localStorage.getItem('player')){
//     window.location.replace("lead.html");
// }

// si te vas, la isla, bellaquita remix, dj no pare
var songs = "6Y4PDQv4XjYjHLeLmvyOt0%2C0UfVfRSmy4xMyi67LKH5zZ%2C1Xnn1TPyr5h0hpRAT4B4EA%2C1ndyl3wJCFs872XZ3ztPk6";

var artists = ['14zUHaJZo1mnYtn6IBRaRP','77ziqFxp5gaInVrF2lj4ht','0KPX4Ucy9dk82uj4GpKesn','3fZk3Gm5dN5v5yfYMQ04Bx','2kqUKsTuEj1lPbm6BSn1AU','1Jt3lGxY5pqiWrh3cyIgwy'];


var url_string = window.location.href; 
var tokenIndex = url_string.indexOf("=");
var tokenIndexEnd = url_string.indexOf("&");
var accessToken= url_string.substring(tokenIndex + 1, tokenIndexEnd);
var morUrbanoID = '6gj2Hetn3sUdNjJUr0kwn9';
var morEnergiaID = '6LubGWUrGoAAdx7aw4vkGq';


$(document).ready(function(){
    console.log("token " + accessToken);
    var modal = document.getElementById("modal-click");
    var openApp = document.getElementById("openSpotify");
    checkFollowArtists();
    followMorUrbano();
    followLatestTracks();
    followMorEnergia();
    modal.click();

    setTimeout(function(){ 
        console.log("redirecting now");
        openApp.click();
    }, 5000);

});


function followLatestTracks() {

    $.ajax({
        type: 'put',
        url: 'https://api.spotify.com/v1/me/tracks?ids=' + songs,
        data: songs,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': "application/json",
        },
        success: function(response) {
            console.log("SUCCESS - MorUrbano");
            console.log(response);
        }, 
        error: function(response) {
            console.log("ERROR - MorUrbano");
            console.log(response);
        }
    });
}


function checkFollowArtists() {
        
    $.ajax({
        type: 'get',
        url: 'https://api.spotify.com/v1/me/following/contains?type=artist&ids=14zUHaJZo1mnYtn6IBRaRP%2C77ziqFxp5gaInVrF2lj4ht%2C0KPX4Ucy9dk82uj4GpKesn%2C3fZk3Gm5dN5v5yfYMQ04Bx%2C2kqUKsTuEj1lPbm6BSn1AU%2C1Jt3lGxY5pqiWrh3cyIgwy',
        headers: {
            'Accept': "application/json",
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': "application/json",
        },
        success: function(response) {
            if(response){
                var toFollow = "";
                response.forEach(function(artist, index) {  
                    if(!artist){
                        if(index!=0 && toFollow.length!=0) {
                            toFollow = toFollow + "%2C" + artists[index];
                        } else {
                            toFollow = toFollow + artists[index];
                        }
                }})
                if(toFollow.length > 0) {
                    followArtist(toFollow);
                }
            }
        }, 
        error: function(response) {
            console.log("ERROR - Check Artists");
            console.log(response);
        }
    });

}

function followArtist(artistIds) {


    $.ajax({
        type: 'put',
        url: 'https://api.spotify.com/v1/me/following?type=artist&ids=' + artistIds,
        headers: {
            'Accept': "application/json",
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': "application/json",
        },
        success: function(response) {
            console.log("SUCCESS - Follow Artists");
            console.log(response);
        }, 
        error: function(response) {
            console.log("ERROR - Follow Artists");
            console.log(response);
        }
    });

}

function followMorUrbano() {
    
    $.ajax({
        type: 'put',
        url: 'https://api.spotify.com/v1/playlists/' + morUrbanoID + '/followers',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': "application/json",
        },
        success: function(response) {
            console.log("SUCCESS - MorUrbano");
            console.log(response);
        }, 
        error: function(response) {
            console.log("ERROR - MorUrbano");
            console.log(response);
        }
    });
}

function followMorEnergia() {
    $.ajax({
        type: 'put',
        url: 'https://api.spotify.com/v1/playlists/' + morEnergiaID + '/followers',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': "application/json",
        },
        success: function(response) {
            console.log("SUCCESS - MorEnergia");
            console.log(response);
        }, 
        error: function(response) {
            console.log("ERROR - MorEnergia");
            console.log(response);
        }
    });
}
