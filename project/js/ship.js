window.onload = function() {
	var ship_num = 5;
	var row = 10;
	var rand = Math.floor(Math.random()*10);
	var arr = [18,18,6,8,10];
	function allowDrop(ev){
		ev.preventDefault();
		//console.log(ev);
	}
	function drag(ev){
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
	function isEmpty(start,width, tds){
		console.log(1);
		for(var i=0; i<width; i++){
			if (tds[start+i].className == "battle_cell hasShip")
				return false;
		}
		return true;
	}
	var tds_empty = document.querySelectorAll(".empty");
	for (var i = 0; i < 5; i++) {
		var width = arr[i]/2;
/*		var rand = Math.floor(Math.random()*(100));
		var remain = rand%row;
		
		var newRemain = remain + width > row ?row-width: remain;
		rand = rand - remain + newRemain;*/
		do {
			//alert(rand);
			var rand = Math.floor(Math.random()*(100));
			var remain = rand%row;s
			var newRemain = remain + width > row ? row-width: remain;
			rand = rand - remain + newRemain;
		}while(!isEmpty(rand,width,tds_empty));
		var div = document.createElement("div");
		div.className = "ship_draggable ship_r"; 

		div.style.width = arr[i] + "em";
		tds_empty[rand].childNodes[0].appendChild(div);
		for (var j=0; j<width; j++)
			tds_empty[rand+j].className = "battle_cell hasShip";
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