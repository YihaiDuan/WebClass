
var sources = [ "image-1.jpg", "image-2.jpg", "image-3.jpg",
                "image-4.jpg", "image-5.jpg", "image-6.jpg",
                "image-7.jpg", "image-8.jpg", "image-9.jpg" ];

var index = 0;

function next() {
	var img = document.getElementById("show");
	if (index == 8)
		index = -1;
	img.src = "../images/"+sources[++index];
	
}
