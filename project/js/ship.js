window.onload = function() {
	var rand = Math.floor(Math.random()*10);
	function allowDrop(ev){
		ev.preventDefault();
	}
	function drag(ev){
		//alert(1);
		ev.dataTransfer.setData("Text",ev.target.id);
	}
	function drop(ev){
		ev.preventDefault();
		var ship = ev.dataTransfer.getData("Text");
		ev.target.appendChild(document.getElementById(ship));
	}
	var ships = document.querySelectorAll(".ship_draggable");
	for (var i = 0; i < ships.length; i++) {
		ships[i].setAttribute("id","ship"+i);
		ships[i].ondragstart = drag;
	}
	var tds = document.querySelectorAll("td");
	for (var i = 0; i < tds.length; i++) {
		tds[i].ondrop = drop;
		tds[i].ondragover = allowDrop;
	}
	//alert(1);
}