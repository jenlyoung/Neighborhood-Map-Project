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

    var infoWindow = new google.maps.InfoWindow();

    for (var i = 0; i < venues.length; i++) {
        // Get the position from the location array.
        var position = venues[i].location;
        var title = venues[i].name;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: name,
            animation: google.maps.Animation.DROP,
            id: i
        });

        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infoWindow at each marker.
        marker.addListener('click', function () {
            populateInfoWindow(this, infoWindow);
        });
    }

    function populateInfoWindow(marker, infoWindow) {
        // Check to make sure the infoWindow is not already opened on this marker.
        if (infoWindow.marker != marker) {
            infoWindow.marker = marker;
            infoWindow.setContent('<div>' + marker.title + '</div>');
            infoWindow.open(map, marker);
            // Make sure the marker property is cleared if the infoWindow is closed.
            infoWindow.addListener('closeclick', function () {
                infoWindow.marker = null;
            });
        }
    }
}

