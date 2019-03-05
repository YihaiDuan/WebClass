window.onload = function() {
	var ship_num = 5;
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
		var parent_td = document.getElementById(ship).parentNode.parentNode;
		parent_td.className = "battle_cell empty";
		parent_td.ondrop = drop;
		parent_td.ondragover = allowDrop;
		console.log(ev);
		ev.target.appendChild(document.getElementById(ship));
		ev.target.parentNode.className = "battle_cell hasShip";
		ev.target.ondrop = null;
		ev.target.ondragover = null;
	}
	
	for (var i = 0; i < ship_num; i++) {
		var rand = Math.floor(Math.random()*(100-i));
		var tds_empty = document.querySelectorAll(".empty");
		var div = document.createElement("div");
		div.className = "ship_draggable ship_r";
		tds_empty[rand].childNodes[0].appendChild(div);
		tds_empty[rand].className = "battle_cell hasShip";
	}

	var ships = document.querySelectorAll(".ship_draggable");
	for (var i = 0; i < ships.length; i++) {
		ships[i].setAttribute("id","ship"+i);
		ships[i].setAttribute("draggable","true");
		ships[i].ondragstart = drag;
	}
	tds_empty = document.querySelectorAll(".empty");
	for (var i = 0; i < tds_empty.length; i++) {
		tds_empty[i].childNodes[0].ondrop = drop;
		tds_empty[i].childNodes[0].ondragover = allowDrop;
	}
	//alert(1);
}