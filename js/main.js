//view

var ViewModel = function () {
    //set scope
    var self = this;

    //initialize venue list for use
    self.venueList = ko.observableArray([]);

    //user input in observable
    self.userInput = ko.observable('');

    //toggle menu off campus
    self.isOffCanvas = ko.observable(true),
    self.isOpen= ko.observable(false),
    self.toggle = function () {
        self.isOffCanvas(!self.isOffCanvas());
        self.isOpen(!self.isOpen());
    };

    // filter the venue name in menu no matter the case
    self.filteredItems = ko.computed(function() {
        var filteredVenues = self.userInput();
        if (!filteredVenues) { return self.venueList(); }
        return self.venueList().filter(function(venue) {
            if(venue.name.toLowerCase().indexOf(filteredVenues.toLocaleLowerCase()) > -1){
                return true;
            }
            if(venue.marker) {
                venue.marker.setMap(null);
                venue.marker = null;
            }
            return false;
        });
    });

    //Observable of venue by user
    var selectedVenue = ko.observable();

    //Used to select the venue and update the observable - Used in index and map
    self.selectVenue = function (venue) {
        //creating animation on select
        var marker = venue.marker;
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        //set the selectedVenue observable
        selectedVenue(venue);
    };

    //Subscription for changes to the selected venue
    selectedVenue.subscribe(this.createInfoWindow);

    //api request to get json data on 10 venues only
    fetch("https://api.foursquare.com/v2/venues/search?ll=38.580920,-90.627496&client_id=MQX5FUOOHIIQGWJVLXMC20VRP25LLJK3IUF2DC2TPHCHZUYX&client_secret=WMVDF05UPTVWPPSNP2YKUOTQ33YK5Q5E41C50MFSWMTWQXCH&v=20180718&limit=10")
        .then(response => response.json())
        .then(data => {
            self.venueList(data.response.venues);
        }).catch(error => {
        console.log(`Foursquare Error: ${error.message}`);
    });

};

ViewModel.prototype.createInfoWindow = function (venue) {
    if(!this.infoWindow){
        this.infoWindow = new google.maps.InfoWindow();
    }

    var marker = venue.marker;
    var infoWindow = this.infoWindow;
    //removes bounce animation
    marker.setAnimation(null);
    // Check to make sure the infoWindow is not already opened on this marker.
    if (infoWindow.marker != marker) {
        //close previous marker info window
        infoWindow.marker = null;

        // var venue = viewModel.venueList[marker.id];

        infoWindow.marker = marker;
        infoWindow.setContent(venue.name);
        infoWindow.open(map, marker);
        // Make sure the marker property is cleared if the infoWindow is closed.
        infoWindow.addListener('closeclick', function () {
            infoWindow.marker = null;
        });
    }
};

var viewModel = new ViewModel();
ko.applyBindings(viewModel);

// input: ko.observable(''),
// filtered: ko.computed(function () {
//   /*if(!this.input()){
//       return this.venues();
//   }
//   else{
//       return this.venues.slice(1,3);
//   }*/
// }),
// init: function () {
//     fetch("https://api.foursquare.com/v2/venues/search?ll=38.580920,-90.627496&client_id=MQX5FUOOHIIQGWJVLXMC20VRP25LLJK3IUF2DC2TPHCHZUYX&client_secret=WMVDF05UPTVWPPSNP2YKUOTQ33YK5Q5E41C50MFSWMTWQXCH&v=20180718&limit=10")
//         .then(response => response.json())
//         .then(data => {
//             this.venues(data.response.venues);
//         }).catch(error => {
//         console.log(`Foursquare Error: ${error.message}`);
//     });
// }


