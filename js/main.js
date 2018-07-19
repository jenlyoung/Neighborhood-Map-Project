// Model

var testArray = [
    {test: "one"},
    {test: "two"},
    {test: "three"}
    ];


//view



// You have the three DOM elements. Two of them will have click bindings and one will have a css binding. You have one variable that represents whether the drawer is open, used in the CSS binding. The click bindings control its value. As far as Knockout is concerned, it's just this:

viewModel = {
    isClosed: ko.observable(true),
    toggle: function() {
        this.isClosed(!this.isClosed());
    },
    close: function() {
        this.isClosed(true);
    }
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