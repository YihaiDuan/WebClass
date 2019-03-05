/* Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.237
      File:exercise file*/
var x;
var y;

var checked = true;

function newMult() {
	var nbr1 = document.getElementById("nbr1");
	var nbr2 = document.getElementById("nbr2");
	nbr1.innerHTML = Math.floor(Math.random()*10+1);
	nbr2.innerHTML = Math.floor(Math.random()*10+1);
}

function check() {
	
	var ansInput = document.getElementById("answer");
	var resultP = document.getElementById("result");
	var button = document.getElementById("button");
	
	if(checked){
	var nbr1 = document.querySelector("#nbr1").innerHTML;
	var nbr2 = document.querySelector("#nbr2").innerHTML;
	nbr1 = Number(nbr1);
	nbr2 = Number(nbr2);
	var result = nbr1 * nbr2;
	var ans = ansInput.value;
	ans = Number(ans);
	
	if(ans == result) {
		
		resultP.innerHTML = "Correct answer!";
		resultP.style.color = "black";
	}
	else{
		resultP.innerHTML = "Wrong: " + nbr1 + "x" + nbr2 + " = " + result ;
		resultP.style.color = "red";
	}
	resultP.style.visibility = "visible";
	
	button.value = "More";
	checked = false;
	} else{
		newMult();
		resultP.style.visibility = "hidden";
		button.value = "check";
		ansInput.value = "";
		checked = true;
	}
}
