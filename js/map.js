//inititalize map variable
var map;
//create markers array
var markers = [];

function initMap() {

    //set the center of the map
    var wildwoodLatLng = {lat: 38.580783, lng: -90.63143};

    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: wildwoodLatLng,
        zoom: 15,
    });

    var testLocation = {lat:38.58127490294978, lng: -90.62694820243829};

    var marker = new google.maps.Marker({
        position: testLocation,
        map: map,
        title: "First Marker",
        animation: google.maps.Animation.DROP
    });

    var infowindow = new google.maps.InfoWindow({
        content: "It worked"
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

