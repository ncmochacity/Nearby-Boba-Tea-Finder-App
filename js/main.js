// declare global map variable without storing anything
var map;
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

    ]
  };
  map = new google.maps.Map(document.querySelector("#map"),mapOptions);
}
var locations = [
  {
  "name" : "Boba Guys",
  "location" : {lat: 37.790003,lng: -122.407301},
  "address" : "429 Stockton St"
},{
  "name" : "Plentea",
  "location" : {lat:37.791375,lng:-122.404389},
  "address" : "341 Kearny St"
},{
  "name" : "Tpumps",
  "location" :{lat: 37.763726,lng:-122.478623},
  "address" : "1916 Irving St"
},{
  "name" : "Asha Tea House",
  "location" : {lat:37.78818,lng:-122.403696},
  "address" : "17 Kearny St"
},{
  "name" : "Sharetea",
  "location" : {lat:37.784272,lng:-122.403159},
  "address" : "135 4th St"
},{
  "name" : "Mitsu Tea House",
  "location" : {lat:37.785285,lng:-122.429177},
  "address" : "22 Peace Plz #440"
},{
  "name" : "i-Tea",
  "location" : {lat:37.763524,lng:-122.481173},
  "address" : "2150 Irving St"
},{
  "name" : "Little Sweet Bubble Tea",
  "location" : {lat:37.78148,lng:-122.460687},
  "address" : "3836 Geary Blvd"
},{
  "name" : "Bobapioca",
  "location" : {lat:37.794647,lng:-122.404561},
  "address" : "708 Kearny St"
},{
  "name" : "Quickly",
  "location" : {lat:37.784452,lng:-122.417986},
  "address" : "709 Larkin St"
},{
  "name" : "Cool Tea Bar",
  "location" :{lat:37.794298,lng:-122.406983},
  "address" : "103 Waverly Pl"
}

];
// add a marker
/*
createMapMarker(placeData) reads Google Places search results to create map pins.
placeData is the object returned from search results containing information
about a single location.
*/
function createMapsMarker(placeData) {
  // name of the place from the place service
  var placeName = placeData.formatted_address;
  // current boundaries of the map window
  var bounds = window.mapBounds;
  // marker is an object with additional data about the pin for a single location
  var marker = new google.maps.Marker({
    map : map,
    position:placeData.geometry.location,
    title : name
  });


  // infoWindows are the little helper windows that open when you click
  var infoWindow = new google.maps.infoWindow();
  //  To make the info window visible, you need to call the open() method on the InfoWindow
  marker.addListener('click',function(){
    infoWindow.open(map,marker);
  });
}
/*
callback(results, status) makes sure the search returned results for a location.
If so, it creates a new map marker for that location.
*/
function callBack(rqResult,status ) {
  if(status == google.maps.places.PlacesServiceStatus.OK) {
    createMapsMarker(rqResult[0]);
  }
}
