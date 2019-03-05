
// to distinguish between the first
// click and the second click of two
// consecutive clicks
var first_click = true;

// the first image clicked
var first_image;

// if not_finished is true, there
// are still images to swao
var not_finished = true;

var arr = "zabcdefghijkl";
var count = 0;
// process the click on the image
function click_on(image) {
	if (first_click){
		first_click = false;
		first_image = image;
		//is_finished();

	}else {
		first_click = true;
/*		var image1 = document.getElementsByName(first_image.name);
		//alert(image1[0].src);
		//alert(image1[0].name);
		image1[0].src = image.src ;
		image1[0].name = image.name;
		image.src = first_image.src;
		image.name = first_image.name;*/
		count++;
		var tmpsrc = image.src;
		var tmpname = image.name;
		image.src = first_image.src;
		image.name = first_image.name;
		first_image.src = tmpsrc;
		first_image.name = tmpname;
		if(is_finished()){
			var result = document.getElementById("result");
			result.innerHTML += " in " + count + "steps!" 
			result.style.visibility = "visible";
		}


	}
}

// returns true if the puzzle is solved
function is_finished() {
	var image = document.getElementsByTagName("img");
	for(var i=1; i<=12; i++) {
		if(image[i].name != arr[i]){
			return false;
		}
	}
	return true;
}
