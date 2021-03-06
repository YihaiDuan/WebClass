Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
window.onload = function() {
	var ship_num = 5;
	var row = 10;
	var rand = Math.floor(Math.random()*10);
	oneOffset = 32;
	var arr = [4,6,6,8,10];
	var gid = document.querySelector("#gid").innerHTML;
	var history = document.querySelector("#his").innerHTML;
	var robot = 0;
	var randArr = new Array();
	var robotJudge;
	if(gid == "robot" || gid == ""){
		robot = 1;
		gid = "robot-"+Math.floor(Math.random()*100000);
	}
	console.log(robot);
	function randomSuccess(request){
		gid = request.responseText;
		console.log(gid);
	}
	if(gid == "random"){
		new SimpleAjax('random.php','GET','',randomSuccess);
	}
	var robotJudgeShip = new Array();
	for (var i = 0; i < 100; i++) {
		robotJudgeShip[i] = i;
	}
/*	var cell = new Array();
	for (var i = 0; i < arr.length; i++) {
		cell[i] = new Array();
	}*/
	var cell = [];
	var tds = document.querySelectorAll("#table1 .empty");
	var tds3 = document.querySelectorAll("#table3 .empty");
	var UserName = document.querySelector("#uname").innerHTML;
	if(UserName != "visitor"){
		document.querySelector("#signin").style.display = "none";
		document.querySelector("#signup").style.display = "none";
		document.querySelector("#userSpan").innerHTML = "Hello "+ UserName;
		document.querySelector("#userSpan").style.display = "inline";
		document.querySelector("#logout").style.display = "inline";
		document.querySelector("#history").className = "";
	}
	var reset_ship = 0;
	function Trim(str)
 	{ 
 		 return str.replace(/^\s+|\s+$/gm,''); 
	}
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
		if(ev.target.parentNode.className != "port-ship")
			insertShip(tds,parseInt(td_tmp.id),width);

	}
	function drag(ev){
		ev.dataTransfer.setData("Text",ev.target.id);
		ev.dataTransfer.setData("offX",ev.offsetX);
		//console.log(ev.target);
		ev.target.style.zIndex = "0";
		ev.target.style.border = "3px solid #36e868";
		if(ev.target.parentNode.className != "port-ship")
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
			if(target_from.parentNode.className == "port-ship")
				reset_ship++;
			if(reset_ship == 5){
				restart();
				removePortship();
			}
			pre.childNodes[0].appendChild(target_from);
			
		insertShip(tds,parseInt(pre.id),width);
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
	function insertShip(tds,rand,size){
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
	function initShip(table,tds){
		for (var i = 0; i < 5; i++) {
			var width = arr[i]/2;
	/*		var rand = Math.floor(Math.random()*(100));
			var remain = rand%row;			
			var newRemain = remain + width > row ?row-width: remain;
			rand = rand - remain + newRemain;*/
			do {
				//alert(rand);
				rand = Math.floor(Math.random()*(100));
				var remain = rand%row;
				var newRemain = remain + width > row ? row-width: remain;
				rand = rand - remain + newRemain;
			}while(!isEmpty(rand,width,tds));
			randArr[i] = rand;
				var div = document.createElement("div");
				div.className = "ship_draggable ship_r"; 
				div.style.width = arr[i] + "em";
				div.setAttribute("id",table+"ship"+i);
				tds[rand].childNodes[0].appendChild(div);
				//console.log(i);
				insertShip(tds,rand,arr[i]/2);
		}
	}
	initShip("",tds);
	console.log(randArr);

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
	function addDot(table,id) {
		var td = document.getElementById(table+id);
		var dot = document.createElement("span");
		dot.className = "dot";
		dot.style.zIndex = "3";
		td.childNodes[0].appendChild(dot);
		if(table == "table2")
			td.childNodes[0].querySelector(".ship_r").style.background = "transparent";
		td.childNodes[0].childNodes[0].style.border = "none";
		td.childNodes[0].childNodes[0].style.visibility = "visible";
		td.className = "busy_cell empty";
		td.onmouseover = null;
		td.onmouseout = null;
		td.onclick = null;
	}
	function judgeAround(table,id){
		id = parseInt(id);
		//console.log(id);
		var topLeft = id - 11, topRight = id - 9, bottomLeft = id + 9, bottomRight = id+11;
		if(topLeft>=0 && parseInt(topLeft/10)+1 == parseInt(id/10) ){
			addDot(table,topLeft);
		}
		if(topRight>=0 && parseInt(topRight/10)+1 == parseInt(id/10) ){
			addDot(table,topRight);
		}
		if(bottomLeft<=99 && parseInt(bottomLeft/10)-1 == parseInt(id/10)){
			addDot(table,bottomLeft);
		}
		if(bottomRight<=99 && parseInt(bottomRight/10)-1 == parseInt(id/10) ){
			addDot(table,bottomRight);
		}
	}
	function removeArrayAround(id){
		id = parseInt(id);
		//console.log(id);
		var topLeft = id - 11, topRight = id - 9, bottomLeft = id + 9, bottomRight = id+11;
		if(topLeft>=0 && parseInt(topLeft/10)+1 == parseInt(id/10) ){
			robotJudgeShip.remove(topLeft);
		}
		if(topRight>=0 && parseInt(topRight/10)+1 == parseInt(id/10) ){
			robotJudgeShip.remove(topRight);
		}
		if(bottomLeft<=99 && parseInt(bottomLeft/10)-1 == parseInt(id/10)){
			robotJudgeShip.remove(bottomLeft);
		}
		if(bottomRight<=99 && parseInt(bottomRight/10)-1 == parseInt(id/10) ){
			robotJudgeShip.remove(bottomRight);
		}
	}
	function okMsg(request){
		console.log(request.responseText);
	}
	var hit = 0;
	var left_hit = 0, right_hit = 0, first_hit = 0;
	function robotJudgeSuccess(request){
		robotJudgeShip.remove(robotJudge);
		robotJudgeShip.remove(robotJudge);
		console.log(robotJudgeShip);
		if(request.responseText[0] == "0"){
			document.querySelector("#table2").style.opacity = 1;
			document.querySelector("#table1").style.opacity = 0.4;
			document.querySelector(".notification").innerHTML = "Your turn, Please!!";
			stratMouse();		
		}else {
			
			console.log("hit: ",hit,left_hit,right_hit);
			if(hit == 0){
				right_hit = 1;
				hit = 1;
				first_hit = robotJudge;
			}
			if(right_hit == 1){
				robotJudge += 1;
				if(robotJudge%10 == 0){
					left_hit == 1;
					robotJudge = first_hit;
					hit = 2;
				}
			}
			if(left_hit == 1){
				robotJudge -= 1;
			}
			removeArrayAround(robotJudge);
			new SimpleAjax('judge.php', 'GET', "gid="+gid+"&player_id=1&ship=table3"+robotJudge,robotJudgeSuccess);
			if(request.responseText[0] == "2");
		}
	}
	var pre_td;
	function judgeSuccess(request){
		console.log(request.responseText);
		var td = document.getElementById(judging_id);
		td.querySelector(".ship_r").style.background = "transparent";
		td.childNodes[0].style.background = "#fbf3be";
		if(pre_td != null)
			pre_td.childNodes[0].style.background = "#f2f4f8";
		pre_td = td;

		if(request.responseText[0] == "0"){
			document.querySelector("#table2").style.opacity = 0.4;
			document.querySelector("#table1").style.opacity = 1;
			document.querySelector(".notification").innerHTML = "Waiting for your Opponent to Move!";
			addDot("",judging_id);
			endMouse();			
			if(robot){
				robotJudge = robotJudgeShip[Math.floor(Math.random()*(robotJudgeShip.length))];
				if(hit == 1){
					right_hit = 0;
					left_hit = 1;
					hit = 2;
					robotJudge = first_hit - 1;
				}
				else if(hit == 2){
					hit = 0;
					left_hit = 0;
				}
				
				console.log(robotJudge);
				new SimpleAjax('judge.php', 'GET', "gid="+gid+"&player_id=1&ship=table3"+robotJudge,robotJudgeSuccess);
			}

			
		}
		else{
			var spanLeft = document.createElement("span");
			spanLeft.className = "left";
			var spanRight = document.createElement("span");
			spanRight.className = "right";
			td.childNodes[0].childNodes[0].appendChild(spanLeft);
			td.childNodes[0].childNodes[0].appendChild(spanRight);
			document.querySelector(".notification").innerHTML = "Your turn, Please!";
			td.childNodes[0].childNodes[0].style.border = "none";

			td.childNodes[0].childNodes[0].className += " ship"+request.responseText[1];
			if(request.responseText[0] == "2"){
				var shipClass = "ship"+request.responseText[1];
				var doneShip = document.querySelectorAll("."+shipClass);
				console.log(doneShip);
				for (var i = 0; i < doneShip.length; i++) {
					
					doneShip[i].style.border = "3px solid red";
				}
				var dots = new Array();
				var tdLeft = doneShip[0].parentNode.parentNode;
				if(parseInt(tdLeft.id.substring(6))%10 != 0){
					tdLeft = tdLeft.previousElementSibling;
					addDot("",tdLeft.id);
					dots[0] = tdLeft.id.substring(6);
				}
				var tdRight = doneShip[doneShip.length-1].parentNode.parentNode;
				if(parseInt(tdRight.id.substring(6))%10 != 9){
					tdRight = tdRight.nextElementSibling;
					addDot("",tdRight.id);
					if(parseInt(tdLeft.id.substring(6))%10 != 0)
						dots[1] = tdRight.id.substring(6);
					else
						dots[0] = tdRight.id.substring(6);
				}
				if(!robot){
					new SimpleAjax('save.php','GET','gid='+gid+'&dots='+dots+'&player_id='+player_id,okMsg);
				}

			}
			td.className = "busy_cell hasShip";
			td.onmouseover = null;
			td.onmouseout = null;
			td.onclick = null;
			judgeAround("table2",judging_id.substring(6));
			if(request.responseText[2] == "1"){
				clearInterval(finishGameInterval);
				new SimpleAjax('save.php','GET','gid='+gid+'&result=won'+'&UserName='+UserName+'&player_id='+player_id,okMsg);
				alert("You Win!");
			}
		}
	}
	var judging_id;
	var player_id;
	function stratMouse(){
		td_table = document.querySelectorAll("#table2 .battle_cell");
		for (var i = 0; i < td_table.length; i++) {
			td_table[i].onmouseover = function(){
				this.childNodes[0].childNodes[0].style.visibility = "visible";
			}
			td_table[i].onmouseout = function(){			
				this.childNodes[0].childNodes[0].style.visibility = "hidden";
			}
			td_table[i].onclick = function() {
				judging_id = this.id;
/*				if(robot)
					new SimpleAjax('judge.php', 'GET', "gid="+robotid+"&player_id="+player_id+"&ship="+this.id, judgeSuccess);
				else*/
					new SimpleAjax('judge.php', 'GET', "gid="+gid+"&player_id="+player_id+"&ship="+this.id, judgeSuccess);
			}
		}
	}
	function endMouse(){
		td_table = document.querySelectorAll("#table2 .battle_cell");
		//console.log(td_table);
		for (var i = 0; i < td_table.length; i++) {
			td_table[i].onmouseover = null;
			td_table[i].onmouseout = null;
			td_table[i].onclick = null;
		}
	}



	var waitingOpponentInterval = null;
	var judgedFieldInterval = null;
	var finishOneShipInterval = null;
	var finishGameInterval = null;
	function shipJson(table,tds){
		cell = [];
		var ships = document.querySelectorAll("#"+table+" .ship_r");
		//console.log(ships);
		for (var i = 0; i < ships.length; i++) {
			var len = ships[i].style.width.replace(/em/,"");
			td = ships[i].parentNode.parentNode;
			len = parseInt(len)/2;
			var row = {};
			row.ship_id = ships[i].id;
			var tds = 100+len;
			for(var j=0; j<len; j++){
				if(table=="table1")
					tds += "," + (parseInt(td.id)+j);
				else
					tds += "," + (parseInt(td.id.substring(6))+j);
			}
			//console.log(table,tds);
			row.tds = tds;
			cell.push(row);
		}
		cell = JSON.stringify(cell);
	}
	function startok(request){
		player_id = request.responseText;
		console.log(request.responseText);
		if(robot){
			shipJson("table3",tds3);
			new SimpleAjax('save.php', 'GET', "gid="+gid+"&ship="+cell+"&UserName="+UserName);
		}
	}
	document.querySelector(".start-button").onclick = function(){

		var start_td = document.querySelectorAll(".hasShip");
/*		for (var i = 0; i < start_td.length; i++) {
			cell[i] = start_td[i].id;
		}*/
		shipJson("table1",tds);
/*		if(robot)
			new SimpleAjax('save.php', 'GET', "gid="+robotid+"&ship="+cell, startok);
		else*/
			new SimpleAjax('save.php', 'GET', "gid="+gid+"&ship="+cell+"&UserName="+UserName, startok);
		this.className += " battlefield-start-button__disabled";
		var msg = document.querySelector(".notification");

		for (var i = 0; i < ships.length; i++) {

			ships[i].setAttribute("draggable","false");
			ships[i].style.cursor = "default";
		}
		if(robot){
			msg.innerHTML = "Game Start, Chose a feild";
			document.querySelector(".battlefield-start-choose_rival").style.visibility = "hidden";
			document.querySelector(".battlefield-start-choose_rival").style.zIndex = "-1";

			document.querySelector("#table2").style.opacity = 1;
			document.querySelector("#table1").style.opacity = 0.4;
			initShip("table3",tds3);

			console.log(randArr);
			stratMouse();
			judgedFieldInterval = setInterval(judgedField,1000);
			finishOneShipInterval = setInterval(finishOneShip,500);

		}else{
			msg.innerHTML = "Waiting for Opponent";
			waitingOpponentInterval = setInterval(waitingOpponent,500);
		}
		//console.log(cell);
	}
	function waitingOpponentSuccess(request){
		//console.log(request.responseText);		
		var msg = document.querySelector(".notification");
		if(request.responseText == "1"){
			document.querySelector(".battlefield-start-choose_rival").style.visibility = "hidden";
			document.querySelector(".battlefield-start-choose_rival").style.zIndex = "-1";
			clearInterval(waitingOpponentInterval);
			waitingMoveInterval = setInterval(waitingMove,500);
			judgedFieldInterval = setInterval(judgedField,1000);
			finishOneShipInterval = setInterval(finishOneShip,500);
			finishGameInterval = setInterval(finishGame,500);
			if(player_id == "0"){
				msg.innerHTML = "Game Start, Chose a feild";
				document.querySelector("#table2").style.opacity = 1;
				document.querySelector("#table1").style.opacity = 0.4;
				stratMouse();
			}
			if(player_id == "1"){
				msg.innerHTML = "Game Start, Waiting for the Opponent to chose first!";
			}
		}
	}
	function waitingOpponent(){		
		new SimpleAjax('waitingOpponent.php','GET','gid='+gid,waitingOpponentSuccess)
	}

	var waitingMoveInterval = null;
	function waitingMoveSuccess(request){
		//console.log(request.responseText);
		if(request.responseText == player_id){
			document.querySelector("#table2").style.opacity = 1;
			document.querySelector("#table1").style.opacity = 0.4;
			document.querySelector(".notification").innerHTML = "Your turn, Please!";
			stratMouse();
		}
	}
	function waitingMove(){
		new SimpleAjax('waitingMove.php','GET','gid='+gid,waitingMoveSuccess);
	}
	//var judged_count = 0;
	function judgedFieldSuccess(request){
		var judged = request.responseText;
		//console.log(judged);
		var judgedArr = judged.split(',');
		for (var i = 0; i < judgedArr.length-1; i++) {
			var td = document.getElementById(judgedArr[i]);
			td.childNodes[0].style.background = "#f2f4f8";
			if(i == judgedArr.length-2)
				td.childNodes[0].style.background = "#fbf3be";
			if(td.className == "busy_cell hasShip"){
				var spanLeft = document.createElement("span");
				spanLeft.className = "left";
				spanLeft.style.zIndex = "3";
				var spanRight = document.createElement("span");
				spanRight.className = "right";
				spanRight.style.zIndex = "3";
				td.childNodes[0].appendChild(spanLeft);
				td.childNodes[0].appendChild(spanRight);
				//console.log(judgedArr[i]);
				//console.log(td);
				judgeAround("",judgedArr[i]);
			}
			else {
				addDot("",judgedArr[i]);
				//td.querySelector(".ship_r").style.background = "transparent";
			}
		}
		//judged_count = judgedArr.length-1;
		//console.log(judgedArr);
	}
	function judgedField(){
/*		if(robot){
			new SimpleAjax('judgedField.php','GET',"gid="+robotid+"&player_id="+player_id,judgedFieldSuccess);
		}
		else{*/
			new SimpleAjax('judgedField.php','GET',"gid="+gid+"&player_id="+player_id,judgedFieldSuccess);
		//}
		
	}
	var finishedCount = 0;
	function finishOneShipSuccess(request){
		if(request.responseText != ""){
			var finished = request.responseText.split(',');
			//console.log(finished);
			for (var i = finishedCount; i < finished.length-1; i++) {
				addDot("",finished[i]);

			}
			finishedCount = finished.length-1;
		}


	}
	function finishOneShip(){
/*		if(robot){
			new SimpleAjax('finishOneShip.php','GET',"gid="+robotid+"&player_id="+player_id,finishOneShipSuccess);
		}else{*/
			new SimpleAjax('finishOneShip.php','GET',"gid="+gid+"&player_id="+player_id,finishOneShipSuccess);
		//}
		
	}
	function finishGameSuccess(request){
		console.log("finish: ", request.responseText);
		if(request.responseText != ""){
			clearInterval(finishGameInterval);
			new SimpleAjax('save.php','GET','gid='+gid+'&result=lost to'+'&UserName='+UserName+'&player_id='+player_id,okMsg);
			alert("You lose!");


		}
	}
	function finishGame(){
		new SimpleAjax('finish.php','GET','gid='+gid,finishGameSuccess);
	}
	var li = document.querySelectorAll("ul.ulOpponent li");
	li[0].onclick = function(){
		this.childNodes[0].href = "/edsa-webProject/?gid=robot";


	}
	li[1].onclick = function(){
		var randGid = Math.floor(Math.random()*100000);
		this.childNodes[0].href = "/edsa-webProject/?gid="+randGid;	
       
	}
	li[2].onclick = function(){
		this.childNodes[0].href = "/edsa-webProject/?gid=random";	

	}
	console.log("gid",gid);
	if(gid.substring(0,5) == "robot" || gid == ""){
		console.log(111);
		li[0].childNodes[0].className = "rival-variant-link_connect";
		li[1].childNodes[0].className = "rival-variant-link";
		li[2].childNodes[0].className = "rival-variant-link";
	}
	else if(gid>=0 && gid < 100000){
		var div = document.createElement("div");
		var divchild = document.createElement("div");
		divchild.style.marginTop = "1em";
		var input = document.createElement("input");
		input.style.marginBottom = 0;
		input.type = "text";
		input.value = "http://127.0.0.1/edsa-webProject/?gid="+gid;
		input.style.width = "20em";
		divchild.innerHTML = "Send the link to your fridend";

		li[2].appendChild(div);
		div.appendChild(divchild);
		div.appendChild(input);
		li[1].childNodes[0].className = "rival-variant-link_connect";
		li[0].childNodes[0].className = "rival-variant-link";
		li[2].childNodes[0].className = "rival-variant-link";	

	}
	else {
	li[2].childNodes[0].className = "rival-variant-link_connect";
	li[0].childNodes[0].className = "rival-variant-link";
	li[1].childNodes[0].className = "rival-variant-link";
}
	if(history == "yes"){
		document.querySelector("#twoTable").style.display = "none";
		document.querySelector("#home").className = "";
		document.querySelector("#history").className = "active";
		document.querySelector("#record").style.display = "block";
	}
	document.querySelector("#signin").onclick = function(){
		document.querySelector("#twoTable").style.display = "none";
		document.querySelector("#signupDiv").style.display = "none";
		document.querySelector("#loginDiv").style.display = "block";
	}
	document.querySelector("#signup").onclick = function(){
		document.querySelector("#twoTable").style.display = "none";
		document.querySelector("#loginDiv").style.display = "none";
		document.querySelector("#signupDiv").style.display = "block";

	}
	function logoutSuccess(request){
		UserName = null;
		document.querySelector("#twoTable").style.display = "block";
		document.querySelector("#signin").style.display = "inline";
		document.querySelector("#signup").style.display = "inline";
		document.querySelector("#userSpan").style.display = "none";
		document.querySelector("#logout").style.display = "none";
		location.href="/edsa-webProject";
	}
	document.querySelector("#logout").onclick = function(){

		new SimpleAjax('logout.php','GET','',logoutSuccess);
	}
	function signupSuccess(request){
		console.log(request.responseText);
		if(request.responseText == "0"){
			alert("UserName already exists!");
		}else {
			document.querySelector("#signupDiv").style.display = "none";
			document.querySelector("#loginDiv").style.display = "block";

		}
		
	}
	document.querySelector("#SignUpbtn").onclick = function(){

		var uname = Trim(document.querySelector("#inputUserName2").value);
		var passwd = Trim(document.querySelector("#inputPassword2").value);
		var passwdCfm = Trim(document.querySelector("#inputPassword3").value);
		console.log(uname);
		if (uname == ""){
			alert("UserName should not be empty!");
		} else if(passwd == ""){
			alert("PassWord should not be empty!");
		} else if(passwd != passwdCfm){
			alert("The password is not the same!")
		} else{
			new SimpleAjax('signup.php','GET','uname='+uname+'&passwd='+passwd,signupSuccess);
		}
		//console.log(uname,passwd,passwdCfm);
	}
	function signinSuccess(request){
		if(request.responseText == "not exists"){
			alert("UserName not exists!");
		}else if(request.responseText == "passwd incorrect"){
			alert("PassWord not correct!");
		}else{
			UserName = request.responseText;
			document.querySelector("#twoTable").style.display = "block";
			document.querySelector("#loginDiv").style.display = "none";
			document.querySelector("#signin").style.display = "none";
			document.querySelector("#signup").style.display = "none";
			document.querySelector("#userSpan").innerHTML = "Hello "+ UserName;
			document.querySelector("#userSpan").style.display = "inline";
			document.querySelector("#logout").style.display = "inline";
			location.reload();
		}
	}
	document.querySelector("#SignInbtn").onclick = function(){
		var uname = Trim(document.querySelector("#inputUserName").value);
		var passwd = Trim(document.querySelector("#inputPassword").value);
		if (uname == ""){
			alert("UserName should not be empty!");
		} else if(passwd == ""){
			alert("PassWord should not be empty!");
		}else{
			new SimpleAjax('signin.php','GET','uname='+uname+'&passwd='+passwd,signinSuccess);
		}
	}
	//alert(1);
	document.querySelector(".Restart").onclick = function(){
		document.querySelector(".divRight").style.display = "none";
		document.querySelector(".divLeft").style.marginLeft = "5%";
		document.querySelector(".portnone").style.display = "block";
		document.querySelector(".port-instruction").style.visibility = "visible";
		var port_line = document.querySelectorAll(".port-line");

       var port_ship = new Array();
       var ship = new Array();
       for (var i = 0; i < 5; i++) {
       	  port_ship[i] = document.createElement("div");
       	  port_ship[i].className = "port-ship";
       	  port_ship[i].style.width = document.getElementById("ship"+i).style.width;
       	  port_ship[i].appendChild(document.getElementById("ship"+i));

       }

       	port_line[0].appendChild(port_ship[0]);
       	port_line[0].appendChild(port_ship[3]);
       	port_line[1].appendChild(port_ship[1]);
       	port_line[1].appendChild(port_ship[2]);
       	port_line[2].appendChild(port_ship[4]);
       	var ships = document.querySelectorAll(".busy_cell");
       	//console.log(ships.length);
       	for (var i = 0; i < ships.length; i++) {
       		ships[i].className = "battle_cell empty";
       	}
       	renewDrop();
		
	}
	function restart(){
       		document.querySelector(".portnone").style.display = "none";
       		document.querySelector(".divRight").style.display = "inline";
       		document.querySelector(".divLeft").style.marginLeft = "20%";
       }
    function removePortship(){
    	var port_line = document.querySelectorAll(".port-line");
    	port_line[0].removeChild(port_line[0].childNodes[0]);
    	port_line[0].removeChild(port_line[0].childNodes[0]);
    	port_line[1].removeChild(port_line[1].childNodes[0]);
    	port_line[1].removeChild(port_line[1].childNodes[0]);
    	port_line[2].removeChild(port_line[2].childNodes[0]);
    }
    document.getElementById("history").onclick = function(){
    	if(UserName != "visitor")
    		this.childNodes[0].href = "/edsa-webProject/?history=yes";
    }
    document.getElementById("home").onclick = function(){
    	console.log(this.childNodes[0]);
    	this.childNodes[0].href = "/edsa-webProject/";
    }
}


