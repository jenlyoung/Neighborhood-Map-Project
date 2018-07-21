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

    var viewModel = new ViewModel();
    ko.applyBindings(viewModel);
}


