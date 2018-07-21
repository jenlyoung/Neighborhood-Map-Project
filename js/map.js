//inititalize map variable
let map;

//create markers array

function initMap() {

    //set the center of the map
    const wildwoodLatLng = {lat: 38.580783, lng: -90.63143};

    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: wildwoodLatLng,
        zoom: 5,
        styles: [
            {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ]
    });

    const viewModel = new ViewModel();
    ko.applyBindings(viewModel);
}


