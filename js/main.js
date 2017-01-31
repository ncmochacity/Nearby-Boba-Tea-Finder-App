/*
Neighborhood Map for Bubble Teas in San Francisco, CA
foursquare data

*/

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

// showList displays the Bubble Teas links for users to click on
function showList(){
// get the input: get locations
/*var getLoc= locations;
var titles =;
kiss : keep it simple stupid
*/
// transform it : create links from locations

// <li><a>Boba Guys</a></li>

// each location requires a title from locations
// display output: show locations in the left area of the page


  var bubbleElem = document.getElementById("bubbleTeaList");
  var locationNames = locations.map(function(item){
    return item.name;
  });
  // return location names wrapped inside an array, now needs to convert to strings
  var locationNamesStr = locationNames.join("");
  for (var i = 0; i<locationNames.length;i++){
    var title=locationNames[i];
    var listElem = document.createElement("li");
    bubbleElem.appendChild(listElem);
    listElem.innerHTML = "<a>" + title + "</a>";
  }
}
showList();

/* beginning of Knockout's viewModel */
function viewModel () {
  var self = this;
  // storing a list of locations array inside variable bubbleLocations
  var bubbleLocations = locations;
  // initialize empty knockout observableArray
  self.listLocationsArr = ko.observableArray([]);


}

var map;
var markers = [];
var place;
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
  var infoWindow = new google.maps.InfoWindow({
    content:"",
  });
  var bounds = new google.maps.LatLngBounds();

      for (var i=0; i < locations.length; i++) {
        place = locations[i].location;
        title = locations[i].name;
        var marker = new google.maps.Marker({
          position : place,
          map:map,
          title:title,
          animation:google.maps.Animation.DROP,
          id:i
        });
        markers.push(marker);
        marker.addListener('click', function() {
          populateInfoWindow(this, infoWindow);
        });
        bounds.extend(markers[i].position);
      }
      map.fitBounds(bounds);
      map.setCenter(bounds.getCenter());
    window.addEventListener('resize', function(e) {
      map.fitBounds(bounds);
    });
}
// end of initializeMap
// search functionality

function populateInfoWindow(marker, infoWindow){
  if(infoWindow.marker != marker) {
  infoWindow.marker = marker;
  infoWindow.setContent('<div>' + marker.title + '</div>');
  infoWindow.open(map,marker);
  infoWindow.addListener('closeclick',function(){
    infoWindow.setMarker(null);
  });
  }
}
var vm = new viewModel();
ko.applyBindings(vm);
