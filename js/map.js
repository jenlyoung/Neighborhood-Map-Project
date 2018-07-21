//inititalize map variable
let map;

function initMap() {

    //set the center of the map
    const wildwoodLatLng = {lat: 38.580783, lng: -90.63143};

    // creates a new map - wildwood town center--remove default icons
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
    //instantiating viewModel and ko bindings
    const viewModel = new ViewModel();
    ko.applyBindings(viewModel);
}


