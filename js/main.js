//view

class ViewModel {
    constructor() {
        //set scope
        const self = this;

        //initialize venue list for use
        self.venueList = ko.observableArray([]);

        //user input in observable
        self.userInput = ko.observable('');

        //toggle menu off campus
        self.isOffCanvas = ko.observable(true),
            self.isOpen = ko.observable(false);


        self.toggle = function () {
            self.isOffCanvas(!self.isOffCanvas());
            self.isOpen(!self.isOpen());
        }

        // filter the venue name in menu no matter the case
        self.filteredItems = ko.computed(() => {
            let filteredVenues = self.userInput();
            if (!filteredVenues) {
                return self.venueList();
            }
            return self.venueList().filter(venue => {
                if (venue.name.toLowerCase().indexOf(filteredVenues.toLocaleLowerCase()) > -1) {
                    return true;
                }
                if (venue.marker) {
                    venue.marker.setMap(null);
                    venue.marker = null;
                }
                return false;
            });
        });

        //Observable of venue by user
        self.selectedVenue = ko.observable();

        //Used to select the venue and update the observable - Used in index and map

        //Subscription for changes to the selected venue
        self.selectedVenue.subscribe(this.createInfoWindow, self);
        self.filteredItems.subscribe(this.createMarkers, self);

        //api request to get json data on 10 venues only
        fetch("https://api.foursquare.com/v2/venues/search?ll=38.580920,-90.627496&client_id=MQX5FUOOHIIQGWJVLXMC20VRP25LLJK3IUF2DC2TPHCHZUYX&client_secret=WMVDF05UPTVWPPSNP2YKUOTQ33YK5Q5E41C50MFSWMTWQXCH&v=20180718&limit=10")
            .then(response => response.json())
            .then(data => {
                self.venueList(data.response.venues);
            }).catch(error => {
            console.log(`Foursquare Error: ${error.message}`);
        });

        self.selectVenue = function (venue) {
            //creating animation on select
            const marker = venue.marker;
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
            //set the selectedVenue observable
            self.selectedVenue(venue);
        };

    }


    createInfoWindow(venue) {
        if (!this.infoWindow) {
            this.infoWindow = new google.maps.InfoWindow();
        }

        const marker = venue.marker;
        const infoWindow = this.infoWindow;
        //removes bounce animation
        marker.setAnimation(null);
        // Check to make sure the infoWindow is not already opened on this marker.
        if (infoWindow.marker != marker) {
            //close previous marker info window
            infoWindow.marker = null;

            // var venue = viewModel.venueList[marker.id];

            infoWindow.marker = marker;
            infoWindow.setContent(`<strong>${venue.name}</strong><br/>${venue.location.address || ''}<br/>${venue.location.city || ''}, ${venue.location.state || ''} ${venue.location.postalCode || ''}`);
            infoWindow.open(map, marker);
            // Make sure the marker property is cleared if the infoWindow is closed.
            infoWindow.addListener('closeclick', () => {
                infoWindow.marker = null;
            });
        }
    }

    createMarkers(list) {
        if (!this.bounds) {
            this.bounds = new google.maps.LatLngBounds();
        }

        for (let i = 0; i < list.length; i++) {
            let self = this;
            // Get the position from the location array.
            let venue = list[i];
            if (venue.marker) {
                continue;
            }
            const position = {
                lat: venue.location.lat,
                lng: venue.location.lng
            };

            const title = venue.name;

            // Create a marker per location, and put into markers array.
            const marker = new google.maps.Marker({
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
                self.selectVenue(venue);
            });

            this.bounds.extend(marker.position);
        }

        map.fitBounds(this.bounds);
    }
}


