

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

var map;
var markers = [];

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

  var place;
  var infoWindow = new google.maps.InfoWindow();
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
    // search functionality
}
// end of initializeMap
// search functionality
function populateInfoWindow(marker,infoWindow){
  if(infoWindow.marker != marker) {
    infoWindow.marker = marker;
    infoWindow.setContent('<div>' + marker.title + '</div>');
    infoWindow.open(map,marker);
    infoWindow.addListener('closeclick',function(){
      infoWindow.setMarker(null);
    });
  }
}
