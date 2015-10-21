// Lab 6 js file containing parse function for json data

var xhr = new XMLHttpRequest();


function parse() {
	xhr.open("GET","http://messagehub.herokuapp.com/messages.json",true);

	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && xhr.status == 200){
				jsondata = JSON.parse(xhr.responseText);
				elem = document.getElementById("messages");
				
				for (count = 0; count < jsondata.length; count++){
						elem.innerHTML += "<p>" + jsondata[count]["content"] + " - " 
						+ jsondata[count]["username"] + "</p>";
				}
		}	
	}
	xhr.send(null);
}
