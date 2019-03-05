/* Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.28
      File:exercise2 js file*/
var time = new Array();
function tictac() {
	var myDate = new Date();
	time[0] = myDate.getHours();
	time[1] = myDate.getMinutes();
	time[2] = myDate.getSeconds();
	var div = document.getElementById("clock");
	var span = div.getElementsByTagName("span");
	for (var i=0; i<time.length; i++){
		var img = span[i].getElementsByTagName("img");
		img[0].src = parseInt(time[i]/10) + ".png";
		img[1].src = time[i]%10 + ".png";
	}
}
function start() {
	tictac();
	setInterval(tictac,1000);
}

window.onload = start;
