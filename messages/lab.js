// Lab 6 js file containing parse function for json data

var jsondata = new XMLHttpRequest();
jsondata.open("GET","data.json",true);


function parse() {

	parsedObjects = JSON.parse(jsondata);
	elem = document.getElementByID("messages");

	for( count = 0; count < parsedObjects.length; count++){
		console.log(Objects.keys(parsedObjects[count]));
		elem.innerHTML += "<p> " + parsedObjects[count]["content"] + parsedObects[count]["username"] + "</p>";
	}

}
