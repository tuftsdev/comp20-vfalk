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


	marker = new google.maps.Marker({
		position: me,
		title: "Vince Falk's Location",
 		icon: image
	});
	marker.setMap(map);
		
	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
	var params = "login=PaulRamsey&lat=" + myLat + "&lng=" + myLng+ "&message=Vince Falk's Location";
	console.log(encodeURIComponent(params));

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
        	console.log(http.responseText);
        	jsondata = JSON.parse(http.responseText);
        	for (count = 0; count < jsondata.length; count++){
						marker = new google.maps.Marker({
						position: new google.maps.LatLng(jsondata[count]["lat"], jsondata[count]["lng"]),
						title: jsondata[count]["login"],
						});
						marker.setMap(map);
				}
        	console.log(jsondata);

    	}
	}
	http.send(params);
}