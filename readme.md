##  Boba Tea Finder App - San Francisco
This is a capstone udacity single-page-application that utilizes Knockout.js for showing a list of nearby Boba Teas in the San Francisco,CA area. The app separates the UI and the Javascript data with Knockout, and bound the HTML DOM with Knockout utilities. It's not only user-friendly but also mobile-responsive and consistent across browsers. 
### Libraries, third-party APIs,Fonts : 
* Google Maps
* FourSquare
* Bootstrap
* jQuery
* Google Fonts

### Project Requirements
* Display a list of Boba Tea locations in San Francisco using Google Maps API. App loads a callback function after loading the Google Maps script
```
<script async defer src="https://maps.googleapis.com/maps/api/js?key=myKey&libraries=places&callback=initializeMap">
```

* After the page loads, the app displays a list of clickable Boba Tea locations that corresponds to each markers on the Google Map
* Utilizes FourSquare API for showing ratings, store hours and location by performing an asynchronous HTTP request : 
```
$.ajax({
 type: "GET",
 url : apiURL,
 success:function(data){
   var fourSquareResult = data.response;
   some.name = foursqaureResult.venue.name;
 }
})
```
* Adds custom styles to Google Maps, and animates markers when user clicks on the list and when the marker click event gets triggered
* Customizes infoWindow by updating its content by calling a function on infoWindow's setContent method for each marker. InfoWindow displays data from FourSquare and from app data stored in the locations array in the model. 
* User can perform a random search in the input box that filters the markers and the list items, as the user starts typing. If the search box is empty, the entire list view and markers will show on default on page load. 
* This app is mobile-responsive and user-friendly, in addition to being tested against errors in the Chrome Dev Tool. 
### How to use this app
1. Clone the repo in the Command Line
```
git clone git@github.com:ncmochacity/Nearby-Boba-Tea-Finder-App.git
```
2. Download the repo in a zipped file at : https://github.com/ncmochacity/Nearby-Boba-Tea-Finder-App and open the index.html in your browser
3. Test the app : https://ncmochacity.github.io/Nearby-Boba-Tea-Finder-App/

