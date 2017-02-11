/*
Neighborhood Map for Bubble Teas in San Francisco, CA
foursquare data

*/

// creating bubble tea object
var TeaShops = function(item){
  this.name = item.name;
  this.address = item.address;
  this.location = item.location;
  this.venue_ID = item.venue_ID;
  this.photo = "";
  this.rating = "";
  this.url = "";
  this.hours = "";
};
function updateInfoWindow(teaShop){
  var info = '<div class="text-center img-wrapper" style="width:200px">' + '<a href="'+ teaShop.url + '">' + "<img class='img-responsive text-center' src='"  + teaShop.photo + "'/>" + '</a>'  + '</div>'+ '<h1 class="text-center">' + teaShop.name + '</h1>' + '<span class="glyphicon glyphicon-star">' + '</span>' + '<span class="ratingScore">'  + teaShop.rating  + '<sup>' + "/" + '<span class="ten">' + "10" +'</span>' +'</sup>' + '</span>'  ;
  var address = '<p class="location">' + '<span class="glyphicon glyphicon-map-marker" aria-hidden="true">' + '</span>'  + teaShop.address+ ", San Francisco, CA " + '</p>';
  var hours = '<p class="hours">'  + '<span class="glyphicon glyphicon-time">' + '</span>'+ teaShop.hours + '</p>';
  info = info + address + hours;
  return info;
}
// Bounce function upon clicking any of the markers, with setTimeOut function that turns off bouncing animation after a second
function toggleBounce(marker){
  if(marker.getAnimation() !== null){
    marker.setAnimation(null);
  }
  else{
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeOutMarker(marker);
  }

}
function setTimeOutMarker(marker){
  setTimeout(function(){
    marker.setAnimation(null);
  },1000);
}
function errorHandlerMap(){
  var mapErrorElem = document.getElementsByClassName("mapErrorHandler");
  mapErrorElem.style.display = "block";
  mapErrorElem.innerHTML = "There's something wrong with loading the Google Maps. Try reload the page";
}
/*viewModel that stores the whole list of Bubble Tea listings in a Knockout observable Array
Creating Google Maps marker for each location
and perform search filters when user starts typing
*/
function viewModel () {
  var self = this;
  // storing a list of locations array inside variable bubbleLocations
  // initialize empty knockout observableArray
  self.bubbleTeaList = ko.observableArray([]);
  locations.map(function(location){
    self.bubbleTeaList.push(new TeaShops(location));
  });
  var msg = $(".foursquareError");

/* The following lines of code can be eliminated after using Knockout utilities

  this.bubbleDOM = document.getElementById("bubbleTeaList");
  var bubbleArr = this.bubbleTeaList().map(function(item){
    return {title :item.name(),storeID:item.venue_ID};
  });
/*creating a new array stored in bubbleArr with the results
  of callback function on each element --> teaShops object
  with properties : title and storeID

  for (var i = 0; i < bubbleArr.length; i++){
    var title = bubbleArr[i].title;
    var listElem = document.createElement("li");
    listElem.classList.add("teaElem");
    listElem.setAttribute("id","teaShop_" + i);
    listElem.innerHTML = "<a>" + title + "</a>";
    listElem.setAttribute("data-storeID",bubbleArr[i].storeID);
    this.bubbleDOM.appendChild(listElem);
  }
  $(".teaElem").click(function(){
    var storeID = $(this).attr("data-storeID");
    // JS find() returns first element in an array that passes a test
    // if gets a true value,returns value of the array element
    var teaShop = self.bubbleTeaList().find(function (teaShop){
      return teaShop.venue_ID == storeID;
    });
    google.maps.event.trigger(teaShop.marker,"click");
  });
*/
  // bubbleTeaList array will store Teashops objects and storing the Google maps marker object as a property of the Teashop object
  self.bubbleTeaList().forEach(function(store,index,array){
    var marker = new google.maps.Marker({
      position : store.location,
      map:map,
      id:index,
      animation:google.maps.Animation.DROP
    });
    store.marker = marker;
    store.markerID = marker.id;
    bounds.extend(marker.position);
    // listens to marker's click event, and when clicked, open up infoWindow with corresponding information
    marker.addListener("click",function(){
      infoWindow.setContent(updateInfoWindow(store));
      infoWindow.open(map,marker);
      toggleBounce(marker);
    });

    var venue_ID  = store.venue_ID + "/?";
    var apiUrl = foursquareURL + venue_ID + foursquareID + foursquareSecr + foursquareVs;
    $.ajax({
      type: "GET",
      url : apiUrl,
      success:function(data){
        var foursquareResult = data.response;
        store.name = foursquareResult.venue.name;
        store.photo = foursquareResult.venue.bestPhoto.prefix + "200x200" + foursquareResult.venue.bestPhoto.suffix;
        store.rating = foursquareResult.venue.rating;
        store.url = foursquareResult.venue.shortUrl;
        store.hours = foursquareResult.venue.hours.status;
      },
    })
    .fail(function(jqXHR,exception){
      switch(jqXHR.status){
        case 0:
          msg = msg.text("Foursquare Request Failed: " + "No connection");
          break;
        case 404:
          msg = msg.text("Requested page not found. [404]");
          break;
        case 500:
          msg = msg.text("Internal Server Error [500]");
          break;
        default:
          msg = msg.text("There's something wrong with loading Foursquare data");
      }
    });
  });
  // end of forEach loop

  map.fitBounds(bounds);
  map.setCenter(bounds.getCenter());
  // when the browser resize event is activated, recenter google maps boundaries
  window.addEventListener('resize', function(e) {
    map.fitBounds(bounds);
  });
  // begin filtering text input
  self.searchText= ko.observable("");
  self.filterBubbleList = ko.computed(function(){
    var filtering = self.searchText().toLowerCase();
    // close infowindow as user keeps typing
    infoWindow.close();
    // return filtered array with elements that passe test in the provided function test
      return self.bubbleTeaList().filter(function getMatch(item){
        var test = item.name.toLowerCase().indexOf(filtering) >= 0;
        var showItem = !filtering || test;
          item.marker.setVisible(showItem);
          return showItem;
      });

  },this);
  // attach a click binding to knockout
  self.clickableMarker = function(teaShop){
    google.maps.event.trigger(teaShop.marker,"click");
  };
}
$(".nav-toggle-btn").removeClass("close");
$(".nav-toggle-btn").click(function(){
  $(".nav-container").toggleClass("open");
  $(this).toggleClass("close");
});

// global variables for the app
var map;
var foursquareURL = "https://api.foursquare.com/v2/venues/";
var foursquareID = "&client_id=KQZCWKWZJ04GEK2BNVMOFLOY24JVA3IJDBHJIWKWNGYSQADB";
var foursquareSecr = "&client_secret=FSJK4HAKCYIHM2DIC4NGDL33N44SBSGNGE25DCLOT01WK1UF";
var foursquareVs = "&v=20170101";
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
  "name" : "PurpleKow",
  "location" : {lat:37.775941,lng:-122.497787},
  "address" : "3620 Balboa St",
  "venue_ID" : "4e7fd43ebe7b414d61ef63d8"
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
  "name" : "Super Cue Cafe",
  "location" : {lat:37.742762,lng:-122.478584},
  "address" : "1139 Taraval St",
  "venue_ID" : "51e60310498eca96abdd4a22"
},{
  "name" : "Quickly",
  "location" : {lat:37.784452,lng:-122.417986},
  "address" : "709 Larkin St",
  "venue_ID" : "4b0098b5f964a520d33f22e3"
},{
  "name" : "Teaone",
  "location" :{lat:37.780687,lng:-122.476872},
  "address" : "5336 Geary Blvd",
  "venue_ID" : "5388dd4f498e39acdc909b8d"
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
    content:"",
    maxWidth:300
  });
  bounds = new google.maps.LatLngBounds();
  // calling Ko.applyBindings with viewModel passed in will activate to the UI
  var Vm = new viewModel();
  ko.applyBindings(Vm);

}
// end of initializeMap
