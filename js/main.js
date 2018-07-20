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

var viewModel = function () {
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
    //clicking on venue list items
    self.selectedVenue = function () {
        alert("it worked");
        // populateInfoWindow();
    };

    // filter the venue name in menu no matter the case
    self.filteredItems = ko.computed(function() {
        var filteredVenues = self.userInput();
        if (!filteredVenues) { return self.venueNames(); }
        return self.venueNames().filter(function(venue) {
            return venue.name.toLowerCase().indexOf(filteredVenues.toLocaleLowerCase()) > -1;
        });
    });







    //placing markers
    // self.filterMarkers = function () {
    //
    // }

    // creating info window content
    self.infoWindowContentMaker = function () {
        populateInfoWindow(self.selectedVenue);
    };




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
};


ko.applyBindings(viewModel);



//
// var viewModel = function(){
//     var self = this;
//     self.isActive = ko.observable(false);
//     self.isClosed = ko.observable(false);
//
//     self.toggleActive = function(data){
//         data(!data());//toggle the isActive value between true/false
//     };
//
//     self.toggleClosed = function(data){
//         data(!data());
//     };
// }

// var myModel = new viewModel();
//
// ko.applyBindings(myModel);


// var ClickCounterViewModel = function() {
//     this.numberOfClicks = ko.observable(0);
//
//     this.registerClick = function() {
//         this.numberOfClicks(this.numberOfClicks() + 1);
//
//     };
//
//     this.resetClicks = function() {
//         this.numberOfClicks(0);
//     };
//
//     this.hasClickedTooManyTimes = ko.computed(function() {
//         return this.numberOfClicks() >= 3;
//     }, this);
// };
//
// ko.applyBindings(new ClickCounterViewModel());


