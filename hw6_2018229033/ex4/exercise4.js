
function show( source ) {
	var Realsize = document.getElementById("realsize");
	 Realsize.src = source.src;
	 var Legend = document.getElementById("legend");
	 Legend.innerHTML = source.title;
}
