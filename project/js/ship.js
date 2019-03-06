window.onload = function() {
	var ship_num = 5;
	var row = 10;
	var rand = Math.floor(Math.random()*10);
	oneOffset = 32;
	var arr = [4,6,6,8,10,4,4,4,4,4,4];
	var tds = document.querySelectorAll(".empty");
	function allowDrop(ev){
		ev.preventDefault();
		//console.log(ev);
	}
	function renewDrop(){
		var busy_tmp = document.querySelectorAll(".busy_cell");
		for (var i = 0; i < busy_tmp.length; i++) {
			busy_tmp[i].ondrop = null;
			busy_tmp[i].ondragover = null;
		}
		var empty_tmp = document.querySelectorAll(".battle_cell");
		for (var i = 0; i < empty_tmp.length; i++) {
		empty_tmp[i].ondrop = drop;
		empty_tmp[i].ondragover = allowDrop;
	}
	}
	function drag(ev){
		ev.dataTransfer.setData("Text",ev.target.id);
		ev.dataTransfer.setData("offX",ev.offsetX);
		console.log(ev.target);
		ev.target.style.opacity = "0.4";
		ev.target.style.zIndex = "-1";
		removeShip(ev.target);
		renewDrop();
		//ev.target.parentNode.ondrop = drop;
		//alert(ev.target.style.visibility);
	}
	function drop(ev){
		ev.preventDefault();
		var ship = ev.dataTransfer.getData("Text");
		var offX = ev.dataTransfer.getData("offX");
		var off = parseInt(offX/oneOffset);
		console.log(off);
		var pre = this;
		console.log(ev.target.id);
		for(var i=0; i<off; i++){
			pre = pre.previousElementSibling;
		}
		var target_from = document.getElementById(ship);
		target_from.style.opacity = "1";
		target_from.style.zIndex = "1";
/*		var parent_td = document.getElementById(ship).parentNode.parentNode;
		parent_td.className = "battle_cell empty";
		parent_td.ondrop = drop;
		parent_td.ondragover = allowDrop;*/
		//console.log(ev);
		pre.childNodes[0].appendChild(target_from);
		var ship_id = target_from.id.substring(4,5);
		insertShip(parseInt(pre.id),arr[parseInt(ship_id)]/2);
		renewDrop();
/*		ev.target.parentNode.className = "battle_cell hasShip";
		ev.target.ondrop = null;
		ev.target.ondragover = null;*/
	}
	function isEmpty(start,width, tds){
		for(var i=0; i<width; i++){
			if (tds[start+i].className == "busy_cell hasShip" || tds[start+i].className == "busy_cell empty")
				return false;
		}
		return true;
	}
	function insertShip(rand,size){
		console.log(size);
		var left = rand-1,right = rand +size,top = rand-11,bottom = rand+9;
		for (var j = 0; j < size; j++){
			tds[rand+j].className = "busy_cell hasShip";
		}
		 if((left+10)%10 != 9){
		 	tds[left].className = "busy_cell empty";
		}	 
		 if(rand%10+size < 10){
		 	 tds[right].className = "busy_cell empty";
		 }
	
		 if(top >= -1) {
		    for (var k = top; k <= top+size+1 ; k ++) {
		 	    if(parseInt(k/10) == parseInt(rand/10)-1 && k>=0)
		 	    tds[k].className = "busy_cell empty";
		    }
		}
		if(bottom < 99){
		    for (var m = bottom; m <= bottom+size+1 ; m++) {
				// console.log(m);
				if(parseInt(m/10) == parseInt(rand/10)+1)
				tds[m].className = "busy_cell empty";
		    }
		}
	}
	function removeOneCell(id){

	}
	function removeShip(ship){
		var order = ship.id.substring(4,5);
		var rand = parseInt(ship.parentNode.parentNode.id);
		var size = arr[order]/2;
		console.log(order);
		console.log(size);
		var left = rand-1,right = rand +size,top = rand-11,bottom = rand+9;
		for (var j = 0; j < size; j++){
			tds[rand+j].className = "battle_cell empty";
			//console.log(tds[rand+j].className);
		}
		 if(left >= 0){
		 	tds[left].className = "battle_cell empty";
		}	 
		 if(rand%10+size < 10){
		 	 tds[right].className = "battle_cell empty";
		 }
		 if(top >= -1) {
		   for (var k = top; k <= top+size+1; k ++) {
		    	if(parseInt(k/10) == parseInt(rand/10)-1 && k>=0)
		 	    tds[k].className = "battle_cell empty";
		    }
		}
		if(bottom < 99){
		  for (var m = bottom; m <= bottom+size+1 ; m++) {
				 console.log(m);
				if(parseInt(m/10) == parseInt(rand/10)+1) 
				// console.log(m);
				tds[m].className = "battle_cell empty";
		    }
		}


	}
	
	for (var i = 0; i < 5; i++) {
		var width = arr[i]/2;
/*		var rand = Math.floor(Math.random()*(100));
		var remain = rand%row;
		
		var newRemain = remain + width > row ?row-width: remain;
		rand = rand - remain + newRemain;*/
		do {
			//alert(rand);
			var rand = Math.floor(Math.random()*(100));
			var remain = rand%row;
			var newRemain = remain + width > row ? row-width: remain;
			rand = rand - remain + newRemain;
		}while(!isEmpty(rand,width,tds));
		var div = document.createElement("div");
		div.className = "ship_draggable ship_r"; 
		div.style.width = arr[i] + "em";
		div.setAttribute("id","ship"+i);
		tds[rand].childNodes[0].appendChild(div);
		//console.log(i);
		insertShip(rand,arr[i]/2)
	}

	var ships = document.querySelectorAll(".ship_draggable");
	for (var i = 0; i < ships.length; i++) {

		ships[i].setAttribute("draggable","true");
		ships[i].ondragstart = drag;
	}
	tds_empty = document.querySelectorAll(".battle_cell");
	for (var i = 0; i < tds_empty.length; i++) {
		tds_empty[i].ondrop = drop;
		tds_empty[i].ondragover = allowDrop;
	}

	//alert(1);
}