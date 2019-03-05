/* Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.3.3
      File:exercise1 js file*/
window.onload = function() {

	// to save time :)
	function gebi(identifier) {
		return document.getElementById(identifier);
	}

	// add an error message as the new content of
	// the element 'tooltip'and make that element visible
	function on_failure(request) {
		alert("an error occured");
	}

	// add the result of the AJAX request as the new content
	// of the element 'tooltip' and make that element visible
	var div = document.createElement("div");
	div.id = "tooltip";
	var body = document.querySelector("body");
	body.appendChild(div);

	function on_success(request) {
		div.innerHTML = request.responseText;		
		div.style.visibility = "visible";
		document.querySelector("#tooltip").onclick = tooltip_hide;
	}

	// empty the content of the element
	// of ID 'tooltip' and hide that element
	function tooltip_hide() {
		var div = document.querySelector("#tooltip");
		if(div != null)
			div.style.visibility = "hidden";
	}

	// do the AJAX request with the current selection and
	// * call 'on_success' after the request succeeded
	// * call 'on_failure' after the request failed
	function tooltip_show() {
		var str = window.getSelection().getRangeAt(0);
		//alert(str);
		new SimpleAjax('dico.php', 'GET', 'word='+str, on_success, on_failure);
	}
	document.querySelector("body").ondblclick = tooltip_show;
	//alert(1);
	// creates a new 'div' element with ID attribute
	// equal to 'tooltip', set the 'onclick' event on that
	// element to 'tooltip_hide' and add it as the new last
	// child of the body
	// finally set the 'ondblclick' event on the body to
	// 'tooltip_show'

};
