/* Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.28
      File:exercise3 js file*/
window.onload = function() {
	setInterval(change,2000);
};
var index = 0;
function change(){
	var div = document.getElementById("slideshow");
	var img = div.getElementsByTagName("img");
	var next_index = (index+1)%img.length;
	img[next_index].style.zIndex = 3;
	img[index].style.zIndex = 2;
	img[next_index].style.opacity = 1;
	img[index].style.zIndex = 1;
	img[index].style.opacity = 0;
	index = next_index;

}
