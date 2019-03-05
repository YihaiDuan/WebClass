/* Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.28
      File:exercise1 js file*/
var sources = [ "image-1.jpg", "image-2.jpg", "image-3.jpg",
                "image-4.jpg", "image-5.jpg", "image-6.jpg",
                "image-7.jpg", "image-8.jpg", "image-9.jpg" ];

var indice = 0;

var handler = null;

function next() {
	var img = document.getElementById("show");
	if (indice == 8)
		indice = -1;
	img.src = "../images/"+sources[++indice];
}

function startstop() {
	var img = document.getElementById("show");
	if(handler === null){
		handler = setInterval(next,1000);
		img.title = "click to STOP the slideshow";
	}else{
		clearInterval(handler);
		img.title = "click to START the slideshow";
		handler = null;
	}
}

window.onload = startstop;
