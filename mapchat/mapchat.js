//Assignment 2 js file, using geolocation_map.html example as template/starting point

var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
			zoom: 13, // The larger the zoom number, the bigger the zoom
			center: me,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
var map;
var marker;
var infowindow = new google.maps.InfoWindow();

function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();
}

function getMyLocation() {
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap()
{
	me = new google.maps.LatLng(myLat, myLng);
	
	// Update map and go there...
	map.panTo(me);

	// Create a unique marker
		var image = {
		url: 'football.png',
		scaledSize: new google.maps.Size (20,20),
		origin: new google.maps.Point(0,0), // origin
    	anchor: new google.maps.Point(0, 0) // anchor
	};


	uniquemarker = new google.maps.Marker({
		position: me,
		title: "Successfully Retrieved Vince Falk's Location",
 		icon: image
	});
	uniquemarker.setMap(map);
		
	// Open info window on click of marker
	google.maps.event.addListener(uniquemarker, 'click', function() {
		infowindow.setContent(uniquemarker.title);
		infowindow.open(map, uniquemarker);
	});
	var params = "login=PaulRamsey&lat=" + myLat + "&lng=" + myLng+ "&message=Vince Falk's Location";


	accessDataStore();
}
function accessDataStore()
{
	var http = new XMLHttpRequest();
	var url = "https://secret-about-box.herokuapp.com/sendLocation";
	var params = "login=PaulRamsey&lat=" + myLat + "&lng=" + myLng+ "&message=Vince Falk's Location";
	http.open("POST", url, true);


	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {//Call a function when the state changes.
    	if(http.readyState == 4 && http.status == 200) {
 
        	jsondata = JSON.parse(http.responseText);
        	var marker = new Array();

        	for (var count = 0; count < jsondata.length; count++){
        				var distance = haversine(count);
						marker[count] = new google.maps.Marker({
							position: new google.maps.LatLng(jsondata[count]["lat"], jsondata[count]["lng"]),
							title: "Login: " + jsondata[count]["login"]+ "<br>" + "Message: " + jsondata[count]["message"] + "<br>" + "Distance from Vince: " + distance + " Miles"
						});
						marker[count].setMap(map);
						// Open info window on click of marker
						var infowindow = new google.maps.InfoWindow();
						google.maps.event.addListener(marker[count], 'click', function() {
							infowindow.setContent(this.title);
							infowindow.open(this.getMap(), this);
						});
			}

    	}
	}
	http.send(params);

}
function haversine(count)
{
Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

var lat2 = myLat; 
var lon2 = myLng; 
var lat1 = jsondata[count]["lat"]; 
var lon1 = jsondata[count]["lng"];

var R = 6371; // km 

var x1 = lat2-lat1;
var dLat = x1.toRad();  
var x2 = lon2-lon1;
var dLon = x2.toRad();  
var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);  
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
var d = R * c; 

return(d*0.621371);



}