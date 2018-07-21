//inititalize map variable
var map;
//create markers array

function initMap() {

    //set the center of the map
    var wildwoodLatLng = {lat: 38.580783, lng: -90.63143};

    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: wildwoodLatLng,
        zoom: 10,
    });

    var bounds = new google.maps.LatLngBounds();

    viewModel.filteredItems.subscribe(function (list) {
        for (var i = 0; i < list.length; i++) {
            // Get the position from the location array.
            let venue = list[i];
            if(venue.marker){
                continue;
            }
            var position = {
                lat: venue.location.lat,
                lng: venue.location.lng
            };

            var title = venue.name;

            // Create a marker per location, and put into markers array.
            var marker = new google.maps.Marker({
                map: map,
                position: position,
                title: title,
                animation: google.maps.Animation.DROP,
                id: i
            });

            //add marker to the model
            venue.marker = marker;
            // Create an onclick event to open an infoWindow at each marker.
            marker.addListener('click', function () {
                viewModel.selectVenue(venue);
            });

            bounds.extend(marker.position);
        }

        map.fitBounds(bounds);
    });
}


