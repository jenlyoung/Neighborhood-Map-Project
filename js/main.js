// Model

var testArray = [
    {test: "one"},
    {test: "two"},
    {test: "three"},
    {test: "four"}
];

var venuess = [
    {
        "id": "4bae5b61f964a52041a73be3",
        "name": "Wines Of Wildwood",
        "location": {
            "address": "2418 Taylor Rd",
            "lat": 38.58081522239121,
            "lng": -90.6273365020752,
            "labeledLatLngs": [
                {
                    "label": "display",
                    "lat": 38.58081522239121,
                    "lng": -90.6273365020752
                }
            ],
            "distance": 18,
            "postalCode": "63040",
            "cc": "US",
            "city": "Wildwood",
            "state": "MO",
            "country": "United States",
            "formattedAddress": [
                "2418 Taylor Rd",
                "Wildwood, MO 63040",
                "United States"
            ]
        },
        "categories": [
            {
                "id": "4bf58dd8d48988d119951735",
                "name": "Wine Shop",
                "pluralName": "Wine Shops",
                "shortName": "Wine Shop",
                "icon": {
                    "prefix": "https://ss3.4sqi.net/img/categories_v2/shops/food_wineshop_",
                    "suffix": ".png"
                },
                "primary": true
            }
        ],
        "referralId": "v-1531974886",
        "hasPerk": false
    },
    {
        "id": "4bc360a1f8219c748fffb510",
        "name": "One Lucky Mutt",
        "location": {
            "address": "2414 Taylor Rd",
            "crossStreet": "(Manchester)",
            "lat": 38.58127490294978,
            "lng": -90.62694820243829,
            "labeledLatLngs": [
                {
                    "label": "display",
                    "lat": 38.58127490294978,
                    "lng": -90.62694820243829
                }
            ],
            "distance": 61,
            "postalCode": "63040",
            "cc": "US",
            "city": "Wildwood",
            "state": "MO",
            "country": "United States",
            "formattedAddress": [
                "2414 Taylor Rd ((Manchester))",
                "Wildwood, MO 63040",
                "United States"
            ]
        },
        "categories": [
            {
                "id": "4bf58dd8d48988d100951735",
                "name": "Pet Store",
                "pluralName": "Pet Stores",
                "shortName": "Pet Store",
                "icon": {
                    "prefix": "https://ss3.4sqi.net/img/categories_v2/shops/pet_store_",
                    "suffix": ".png"
                },
                "primary": true
            }
        ],
        "referralId": "v-1531974886",
        "hasPerk": false
    },
    {
        "id": "4e26e366e4cd60a2c6299f9d",
        "name": "Redbox",
        "location": {
            "address": "2460 Taylor Rd",
            "lat": 38.58062674085465,
            "lng": -90.62594464673137,
            "labeledLatLngs": [
                {
                    "label": "display",
                    "lat": 38.58062674085465,
                    "lng": -90.62594464673137
                }
            ],
            "distance": 138,
            "postalCode": "63040",
            "cc": "US",
            "city": "Wildwood",
            "state": "MO",
            "country": "United States",
            "formattedAddress": [
                "2460 Taylor Rd",
                "Wildwood, MO 63040",
                "United States"
            ]
        },
        "categories": [
            {
                "id": "4bf58dd8d48988d126951735",
                "name": "Video Store",
                "pluralName": "Video Stores",
                "shortName": "Video Store",
                "icon": {
                    "prefix": "https://ss3.4sqi.net/img/categories_v2/shops/video_",
                    "suffix": ".png"
                },
                "primary": true
            }
        ],
        "referralId": "v-1531974886",
        "hasPerk": false
    },
    {
        "id": "4bba33253db7b7138206239a",
        "name": "Walgreens",
        "location": {
            "address": "100 Plaza Dr",
            "lat": 38.58123037995799,
            "lng": -90.62797352671623,
            "labeledLatLngs": [
                {
                    "label": "display",
                    "lat": 38.58123037995799,
                    "lng": -90.62797352671623
                }
            ],
            "distance": 54,
            "postalCode": "63040",
            "cc": "US",
            "city": "Wildwood",
            "state": "MO",
            "country": "United States",
            "formattedAddress": [
                "100 Plaza Dr",
                "Wildwood, MO 63040",
                "United States"
            ]
        },
        "categories": [
            {
                "id": "4bf58dd8d48988d10f951735",
                "name": "Pharmacy",
                "pluralName": "Pharmacies",
                "shortName": "Pharmacy",
                "icon": {
                    "prefix": "https://ss3.4sqi.net/img/categories_v2/shops/pharmacy_",
                    "suffix": ".png"
                },
                "primary": true
            }
        ],
        "referralId": "v-1531974886",
        "hasPerk": false
    },
];

//view


// You have the three DOM elements. Two of them will have click bindings and one will have a css binding. You have one variable that represents whether the drawer is open, used in the CSS binding. The click bindings control its value. As far as Knockout is concerned, it's just this:

var viewModel = {
    isOffCanvas: ko.observable(true),
    isOpen: ko.observable(false),
    venues: ko.observable([]),
    toggle: function () {
        this.isOffCanvas(!this.isOffCanvas());
        this.isOpen(!this.isOpen());
    },
    close: function () {
        this.isOffCanvas(true);
    },
    filter: function (e) {
      console.log(arguments);
    },
    init: function () {
        fetch("https://api.foursquare.com/v2/venues/search?ll=38.580920,-90.627496&client_id=MQX5FUOOHIIQGWJVLXMC20VRP25LLJK3IUF2DC2TPHCHZUYX&client_secret=WMVDF05UPTVWPPSNP2YKUOTQ33YK5Q5E41C50MFSWMTWQXCH&v=20180718&limit=10")
            .then(response => response.json())
            .then(data => {
                this.venues(data.response.venues);
            }).catch(error => {
            console.log(`Foursquare Error: ${error.message}`);
        });
    }
};

ko.applyBindings(viewModel);

viewModel.init();


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