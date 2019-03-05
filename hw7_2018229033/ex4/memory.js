/* Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.28
      File:exercise1 js file*/
var hidepng = "question-mark.png";

//two different hided, it allow click.
var allow_click = true;
// the array of the path of the images
var array = [];

// if clicked[i] is true, array[i] if visible
var clicked = [];

// to distinguish between the first
// click and the second click of two
// consecutive clicks
var first_click = true;

// the index in the array of the first image clicked
var first_index = 0;

// the total number of pairs of clicks
var clicks_number = 0;

// the number of good pairs of clicks
// (i.e. clicks which revealed two identical images)
var good_clicks_number = 0;

// change the content of the attribute src of the two
// images at index i and j to the question mark image
function hide(i, j) {
	var div = document.getElementById("grid");
	var img = div.getElementsByTagName("img");
	img[i].src = hidepng;
	img[j].src = hidepng;
	clicked[i] = false;
	clicked[j] = false;
	allow_click = true;
}

// process the click on image at index n
function click_image(n) {
	if(allow_click && clicked[n] != true){
		clicks_number++;
		clicked[n] = true;
	    var div = document.getElementById("grid");
    	var img = div.getElementsByTagName("img");
    	img[n].src = array[n];
    	if(first_click){	
    		first_index = n;
    		first_click = false;
    	}
    	else{
    		allow_click = false;
    		if(array[n] == array[first_index]){	
    			allow_click = true;
    			good_clicks_number++;
    			if(good_clicks_number == array.length/2){
    				var result = document.getElementById("result");
    				result.innerHTML = "Success in " + Math.ceil(clicks_number/2) + " Steps";
    				result.style.visibility = "visible";
    			}
    		}
    		else
    			setTimeout(hide,2000,first_index,n);
    		first_click = true;
    	}
    }
	
}

// fill the array with the content of the name
// attribute of the images
function fill_array() {
	var div = document.getElementById("grid");
	var img = div.getElementsByTagName("img");
	for (var i = 0; i < img.length; i++) {
		array[i] = img[i].name;
	}
}

// to fill the array before the game starts
window.onload = fill_array;

