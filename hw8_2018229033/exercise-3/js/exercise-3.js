/* Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.3.3
      File:exercise3 js file*/
window.onload = function() {
	// to save time :)
	function gebi(id) {
		return document.getElementById(id);
	}
	function Trim(str){ 
  		return str.replace(/^\s+|\s+$/gm,''); 
	}
	// trim, convert in lower-case all letters but the first
	// of the string name and return the new string
	function normalize(name) {
		name = Trim(name);
		name = name.toLowerCase();
		var f = name.substring(0,1);
		name = f.toUpperCase() + name.substring(1);
		return name;
	}
	// save the current list of participants on the server
	// using an Ajax request
	function save() {
		var liArr = document.querySelectorAll("section#list li");
		var list = [];
		for (var i = 0; i < liArr.length; i++) {
			var row = {};
			row.gender = liArr[i].className;
			row.name = liArr[i].innerHTML;
			list.push(row);
		}
		var date = new Date();
		var jsonStr = JSON.stringify(list);
		var dateSpan = gebi("date");
		dateSpan.innerHTML = date.toString();
		new SimpleAjax('save.php', 'POST', 'list='+jsonStr+'&date='+date.toString());
	}
	
	// remove a participant from the list
	function remove() {
		var msg = confirm("Make sure you want to delete " + this.innerHTML);
		if(msg){
			var ol = document.querySelector("section#list ol");
			ol.removeChild(this);
			save();
		}
	}
	
	// add a new participant to the list
	function add() {
		var firstName = normalize(gebi("firstname").value);
		var lastName = normalize(gebi("lastname").value);
		var gender = document.querySelector("input[name='gender']:checked").value;
		var ol = document.querySelector("section#list ol");
		var newLi = document.createElement("li");
		newLi.onclick = remove;
		newLi.className = gender;
		newLi.innerHTML = firstName + " " + lastName;
		ol.appendChild(newLi);
		save();

	}
	
	// unobstrusive JavaScript!
	document.querySelector("section#new > input").onclick = add;
	var lis = document.querySelectorAll("#list li");
	for ( var i = 0; i < lis.length; i++ ) {
		lis[i].onclick = remove;
	}
};
