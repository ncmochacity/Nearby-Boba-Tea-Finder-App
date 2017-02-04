/*
Neighborhood Map for Bubble Teas in San Francisco, CA
foursquare data

*/

// creating bubble tea object
var TeaShops = function(item){
  this.name = ko.observable(item.name);
  this.address = ko.observable(item.address);
  this.location = item.location;
  this.venue_ID = item.venue_ID;
  this.info = '<h5>' + this.name() + '</h5>' + '<p>Address:' + this.address() + '<br>' + ", San Francisco, CA" + '</p>';
};
/*viewModel that stores the whole list of Bubble Tea listings in a Knockout observable Array
Creating Google Maps marker for each location
and perform search filters when user starts typing
*/
function viewModel () {
  var self = this;
  // storing a list of locations array inside variable bubbleLocations
  // initialize empty knockout observableArray
  this.bubbleTeaList = ko.observableArray([]);
  locations.map(function(location){
    self.bubbleTeaList.push(new TeaShops(location));
  });

  // bubbleTeaList array will store Teashops objects and storing the Google maps marker object as a property of the Teashop object
  this.bubbleTeaList().forEach(function(store,index,array){
    var marker = new google.maps.Marker({
      position : store.location,
      map:map,
      info:store.info,
      id:index,
      animation:google.maps.Animation.DROP
    });
    store.marker = marker;
    store.id = marker.id;
    
    bounds.extend(marker.position);
    // listens to marker's click event, and when clicked, open up infoWindow with corresponding information
    marker.addListener("click",function(){
      infoWindow.setContent('<div>' + marker.info + '</div>');
      infoWindow.open(map,marker);
    });
  });
  console.log(this.bubbleTeaList());
  map.fitBounds(bounds);
  map.setCenter(bounds.getCenter());
  // when the browser resize event is activated, recenter google maps boundaries
  window.addEventListener('resize', function(e) {
    map.fitBounds(bounds);
  });
  // begin filtering text input
  self.searchText= ko.observable("");
  this.filterBubbleList = ko.computed(function(){
    var filtering = this.searchText().toLowerCase();
    // close infowindow as user keeps typing
    infoWindow.close();
      return self.bubbleTeaList().filter(function getMatch(item){
        var showItem = !filtering || item.name().toLowerCase().indexOf(filtering) >= 0;
          item.marker.setVisible(showItem);
          return showItem;
      });

  },this);


      this.bubbleDOM = document.getElementById("bubbleTeaList");
      var bubbleArr = this.bubbleTeaList().map(function(item){
        return item.name();
      });
      for (var i = 0; i < bubbleArr.length; i++){
        var title = bubbleArr[i];
        var listElem = document.createElement("li");
        listElem.classList.add("teaElem");
        listElem.setAttribute("id",i);
        listElem.innerHTML = "<a>" + title + "</a>";
        this.bubbleDOM.appendChild(listElem);
      }


}

// global variables for the app
var map;
var foursquareID = "KQZCWKWZJ04GEK2BNVMOFLOY24JVA3IJDBHJIWKWNGYSQADB";
var foursquareSecr = "FSJK4HAKCYIHM2DIC4NGDL33N44SBSGNGE25DCLOT01WK1UF";
var locations = [
  {
  "name" : "Boba Guys",
  "location" : {lat: 37.790003,lng: -122.407301},
  "address" : "429 Stockton St",
  "venue_ID" : "54024696498e2fef352d2586"
},{
  "name" : "Plentea",
  "location" : {lat:37.791375,lng:-122.404389},
  "address" : "341 Kearny St",
  "venue_ID" : "535ec7a0498ef28116175e96"
},{
  "name" : "Tpumps",
  "location" :{lat: 37.763726,lng:-122.478623},
  "address" : "1916 Irving St",
  "venue_ID" : "511bfb60e4b08d6c9307f46c"

},{
  "name" : "Asha Tea House",
  "location" : {lat:37.78818,lng:-122.403696},
  "address" : "17 Kearny St",
  "venue_ID" : "55ccec5e498e015b5c6a0eb2"
},{
  "name" : "Sharetea",
  "location" : {lat:37.784272,lng:-122.403159},
  "address" : "135 4th St",
  "venue_ID" : "54f0d6d5498e9a7e483f2e80"
},{
  "name" : "Mitsu Tea House",
  "location" : {lat:37.785285,lng:-122.429177},
  "address" : "22 Peace Plz #440",
  "venue_ID" : "54c44df1498e8d9e272a318f"
},{
  "name" : "i-Tea",
  "location" : {lat:37.763524,lng:-122.481173},
  "address" : "2150 Irving St",
  "venue_ID" : "554d3a53498e73f71818b4be"
},{
  "name" : "Little Sweet Bubble Tea",
  "location" : {lat:37.78148,lng:-122.460687},
  "address" : "3836 Geary Blvd",
  "venue_ID" : "51eb348d498efde2657abad0"
},{
  "name" : "Bobapioca",
  "location" : {lat:37.794647,lng:-122.404561},
  "address" : "708 Kearny St",
  "venue_ID" : "56ad39a5498e0aacc4f7b87f"
},{
  "name" : "Quickly",
  "location" : {lat:37.784452,lng:-122.417986},
  "address" : "709 Larkin St",
  "venue_ID" : "4b0098b5f964a520d33f22e3"
},{
  "name" : "Cool Tea Bar",
  "location" :{lat:37.794298,lng:-122.406983},
  "address" : "103 Waverly Pl",
  "venue_ID" : "5616e060498ecfea6b3c29ad"
}
];
function initializeMap() {
  var mapOptions = {
    zoom : 13,
    center : new google.maps.LatLng(37.790003,-122.407301),
    mapTypeId : google.maps.MapTypeId.ROADMAP,
    disableDefaultUI : true,
    zoomControl : false,
    scrollwheel : false,
    navigationControl : false,
    scaleControl : false,
    styles:[
      {
        "stylers":[
          { "saturation":-41 },
          { "hue": "#00ffb3" },
          { "lightness":1 }
        ]
      },{
        "featureType": "road.highway",
        "stylers": [
          { "saturation": -41 },
          { "lightness": 1 }
        ]
      },{
        "featureType":"poi",
        "stylers": [
          { "visibility": "simplified" }
        ]
      },{
        "featureType": "water",
        "stylers":  [
          { "visibility": "on"},
          { "saturation": -51 },
          { "lightness": 1 }
        ]
      }
    ]
  };
  map = new google.maps.Map(document.querySelector("#map"),mapOptions);
  infoWindow = new google.maps.InfoWindow({
    content:""
  });
  bounds = new google.maps.LatLngBounds();
  // calling Ko.applyBindings with viewModel passed in will activate to the UI
  var Vm = new viewModel();
  ko.applyBindings(Vm);

}
// end of initializeMap
