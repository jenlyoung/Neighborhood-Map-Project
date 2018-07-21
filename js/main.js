// Model
var venueList = [
    {
        "id": "4bae5b61f964a52041a73be3",
        "name": "Wines Of Wildwood",
        "location": {
            "address": "2418 Taylor Rd",
            "lat": 38.58081522239121,
            "lng": -90.6273365020752,
            "formattedAddress": [
                "2418 Taylor Rd",
                "Wildwood, MO 63040",
                "United States"
            ]
        }
    },
    {
        "id": "4bc360a1f8219c748fffb510",
        "name": "One Lucky Mutt",
        "location": {
            "address": "2414 Taylor Rd",
            "crossStreet": "(Manchester)",
            "lat": 38.58127490294978,
            "lng": -90.62694820243829,
            "formattedAddress": [
                "2414 Taylor Rd ((Manchester))",
                "Wildwood, MO 63040",
                "United States"
            ]
        },
    }
];

//view

var ViewModel = function () {
    //set scope
    var self = this;

    //initialize venue list for use

    self.venueNames = ko.observableArray(venueList);

    //user input in observable
    self.userInput = ko.observable('');

    //toggle menu off campus
    self.isOffCanvas = ko.observable(true),
    self.isOpen= ko.observable(false),
    self.toggle = function () {
        self.isOffCanvas(!self.isOffCanvas());
        self.isOpen(!self.isOpen());
    };

    //behaviors
    //Observable of the selected venue
    var selectedVenue = ko.observable();

    // filter the venue name in menu no matter the case
    self.filteredItems = ko.computed(function() {
        var filteredVenues = self.userInput();
        if (!filteredVenues) { return self.venueNames(); }
        return self.venueNames().filter(function(venue) {
            return venue.name.toLowerCase().indexOf(filteredVenues.toLocaleLowerCase()) > -1;
        });
    });

    //Used to select the venue and update the observable - Used in index and map
    self.selectVenue = function (venue) {
        selectedVenue(venue);
    };

    //Subscription for changes to the selected venue
    selectedVenue.subscribe(function (venue) {
        if(!self.infoWindow){
            self.infoWindow = new google.maps.InfoWindow();
        }

        var marker = venue.marker;
        var infoWindow = self.infoWindow;

        // Check to make sure the infoWindow is not already opened on this marker.
        if (infoWindow.marker != marker) {
            //close previous marker
            infoWindow.marker = null;
            // var venue = viewModel.venueList[marker.id];

            infoWindow.marker = marker;
            // infoWindow.setContent('<div>' + marker.title + '</div>');
            infoWindow.setContent(venue.name);
            infoWindow.open(map, marker);
            // Make sure the marker property is cleared if the infoWindow is closed.
            infoWindow.addListener('closeclick', function () {
                infoWindow.marker = null;
            });
        }
    });
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


