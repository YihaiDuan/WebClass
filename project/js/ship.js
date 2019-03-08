window.onload = function() {
	var ship_num = 5;
	var row = 10;
	var rand = Math.floor(Math.random()*10);
	oneOffset = 32;
	var arr = [4,6,6,8,10,4,4,4,4,4,4];
	var cell = new Array();
	var tds = document.querySelectorAll("#table1 .empty");
	function allowDrop(ev){
		
		ev.preventDefault();
/*		var ship = ev.dataTransfer.getData("Text");
		var target_from = document.getElementById(ship);
		target_from.style.opacity = "1";
		target_from.style.zIndex = "1";*/
		//console.log(ev);
	}
	function renewDrop(){
		var busy_tmp = document.querySelectorAll("#table1 .busy_cell");
		for (var i = 0; i < busy_tmp.length; i++) {
			busy_tmp[i].ondrop = null;
			busy_tmp[i].ondragover = null;
		}
		var empty_tmp = document.querySelectorAll("#table1 .battle_cell");
		for (var i = 0; i < empty_tmp.length; i++) {
		empty_tmp[i].ondrop = drop;
		empty_tmp[i].ondragover = allowDrop;
	}
	}
	function mouseup(ev){
		ev.target.style.zIndex = "1";
		ev.target.style.border = "3px solid #00f";
		var td_tmp = ev.target.parentNode.parentNode;
		var width = arr[parseInt(ev.target.id.substring(4,5))]/2;
		insertShip(parseInt(td_tmp.id),width);

	}
	function drag(ev){
		ev.dataTransfer.setData("Text",ev.target.id);
		ev.dataTransfer.setData("offX",ev.offsetX);
		//console.log(ev.target);
		ev.target.style.zIndex = "0";
		ev.target.style.border = "3px solid #36e868";
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

		var target_from = document.getElementById(ship);
		var ship_id = target_from.id.substring(4,5);
		var width = arr[parseInt(ship_id)]/2;
		//console.log(off);
		var shipArr = [];
		shipArr[off] = this;
		var pre = this;
		var next = this;
		//console.log(ev.target.id);
		for(var i=off-1; i>=0; i--){
			pre = pre.previousElementSibling;
			if(pre.className == "outside_cell")	
				return;
			shipArr[i] = pre;
		}
		//console.log(next);
		for(var i=off+1; i<width; i++){
			//console.log(i,next);
			if(next.nextElementSibling == null)
				return;
			next = next.nextElementSibling;
			
			shipArr[i] = next;
		}
		var allMove = true;
		for (var i = 0; i < shipArr.length; i++) {
			if(shipArr[i].className=="busy_cell hasShip" || shipArr[i].className=="busy_cell empty")
				allMove = false;
		}


/*		var parent_td = document.getElementById(ship).parentNode.parentNode;
		parent_td.className = "battle_cell empty";
		parent_td.ondrop = drop;
		parent_td.ondragover = allowDrop;*/
		//console.log(ev);
		//console.log(parseInt(pre.id)%10);
		if(allMove){
			pre.childNodes[0].appendChild(target_from);
		
		insertShip(parseInt(pre.id),width);
		renewDrop();
	}
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
		//console.log(size);
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
	function removeOneCell(id,shipid){
		
/*		for (var i = 0; i < cell.length; i++) {
			var niber_id = id+cell[i];
			//console.log(niber_id);
			if(niber_id>=0 && niber_id<=99  ){
				//console.log(niber_ship.id);
				var niber_ship = tds[niber_id].childNodes[0].childNodes[0];
				//console.log(typeof(niber_ship));
				if (typeof(niber_ship) != "undefined") {
					if(niber_ship.id != shipid){
						//console.log(niber_ship.id);
						return;
					}
					
			}
		}
		}*/
		//console.log(id);
		
		var left = id-1,right = id+1,top = id-11,bottom = id+9;
		if(id%10 != 0){
			if(tds[left].className == "busy_cell hasShip")
				return;
		}
		if(id%10 != 9){
			if(tds[right].className == "busy_cell hasShip")
				return;
		}
		if(top>=-1){
			//console.log(top);
			for (var k = top; k < top+3; k++) {
				if (parseInt(k/10) == parseInt(id/10)-1 && k>=0) {
				if(tds[k].className == "busy_cell hasShip")
				return;
			}
			}
		}
		if (bottom<99) {
			for (var m = bottom; m < bottom+3; m++) {
				//console.log("bo",m);
				if(parseInt(m/10) == parseInt(id/10)+1){
				if(tds[m].className == "busy_cell hasShip")
				return;
				}
			}
		}
		//console.log(id);
		tds[id].className = "battle_cell empty";
		
	}
	function removeShip(ship){
		var order = ship.id.substring(4,5);
		var rand = parseInt(ship.parentNode.parentNode.id);
		var size = arr[order]/2;
		//console.log(order);
		//console.log(size);
		var left = rand-1,right = rand +size,top = rand-11,bottom = rand+9;
		for (var j = 0; j < size; j++){
			tds[rand+j].className = "battle_cell empty";
			//console.log(tds[rand+j].className);
		}
		 if((left+10)%10 != 9){
		 	removeOneCell(left,ship.id);
		 	//tds[left].className = "battle_cell empty";
		}	 
		 if(rand%10+size < 10){
		 	 removeOneCell(right,ship.id);
		 	 //tds[right].className = "battle_cell empty";
		 }
		 if(top >= -1) {
		   for (var k = top; k <= top+size+1; k ++) {
		    	if(parseInt(k/10) == parseInt(rand/10)-1 && k>=0)
		 	    removeOneCell(k,ship.id);
		 	    //tds[k].className = "battle_cell empty";
		    }
		}
		if(bottom < 99){
		  for (var m = bottom; m <= bottom+size+1 ; m++) {
				 //console.log(m);
				if(parseInt(m/10) == parseInt(rand/10)+1) 
				// console.log(m);
				removeOneCell(m,ship.id);
				//tds[m].className = "battle_cell empty";
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
		insertShip(rand,arr[i]/2);
	}

	var ships = document.querySelectorAll("#table1 .ship_draggable");
	for (var i = 0; i < ships.length; i++) {

		ships[i].setAttribute("draggable","true");
		ships[i].ondragstart = drag;
		ships[i].ondragend = mouseup;
	}
	tds_empty = document.querySelectorAll("#table1 .battle_cell");
	for (var i = 0; i < tds_empty.length; i++) {
		tds_empty[i].ondrop = drop;
		tds_empty[i].ondragover = allowDrop;
	}
	function shipJudge(request){
		console.log(request.responseText);
		var td = document.getElementById(judging_id);
		if(request.responseText == "1"){
			console.log(11);
			td.childNodes[0].childNodes[0].style.visibility = "visible";
			td.childNodes[0].childNodes[1].style.visibility = "visible";
		}
	}
	var judging_id;
	td_table = document.querySelectorAll("#table2 .battle_cell");
	for (var i = 0; i < td_table.length; i++) {
		td_table[i].onmouseover = function(){
			this.style.border = "2px solid #36e868";
		}
		td_table[i].onmouseout = function(){			
			this.style.border = "1px solid #b4b4ff";
		}
		td_table[i].onclick = function() {
			judging_id = this.id;
			new SimpleAjax('judge.php', 'GET', "ship="+this.id, shipJudge);
		}
	}
	function ok(request){
		console.log(request.responseText);
	}
	document.querySelector(".start-button").onclick = function(){
		var start_td = document.querySelectorAll(".hasShip");
		//console.log(start_td);
		for (var i = 0; i < start_td.length; i++) {
			cell[i] = start_td[i].id;
		}
		new SimpleAjax('save.php', 'GET', "ship="+cell, ok);
		console.log(cell);
	}


	//alert(1);
}