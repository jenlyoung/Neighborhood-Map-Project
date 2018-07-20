// Model

//view


// You have the three DOM elements. Two of them will have click bindings and one will have a css binding. You have one variable that represents whether the drawer is open, used in the CSS binding. The click bindings control its value. As far as Knockout is concerned, it's just this:

var viewModel = {
    isOffCanvas: ko.observable(true),
    isOpen: ko.observable(false),
    venues: ko.observableArray([]),
    toggle: function () {
        this.isOffCanvas(!this.isOffCanvas());
        this.isOpen(!this.isOpen());
    },
    close: function () {
        this.isOffCanvas(true);
    },
    input: ko.observable(''),
    filtered: ko.computed(function () {
      /*if(!this.input()){
          return this.venues();
      }
      else{
          return this.venues.slice(1,3);
      }*/
    }),
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