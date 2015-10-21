// Lab 6 js file containing parse function for json data

var xhr = new XMLHttpRequest();


function parse() {
	xhr.open("GET","data.json",true);

	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && xhr.status == 200){
			jsondata = JSON.parse(xhr.responseText);
			elem = document.getElementById("messages");
			elem.innerHTML = jsondata["content"];	
		}	

	}
	xhr.send();

}
