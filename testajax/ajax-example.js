/**
 * Example on how to use SimpleAjax
 */

window.onload = function() {

	// this function is called after the Ajax
	// request succeeded
	function ok(request) {
		var thespan = document.getElementById('target');
		thespan.innerHTML = request.responseText;
	}

	// this function is called after the Ajax
	// request failed
	function ko(request) {
		alert("an error occured");
	}

	// this function is performing the Ajax request
	function action() {
		new SimpleAjax('ajax-example.php', 'POST', '', ok, ko);
	}

	// unobtrusive JavaScript!
	document.getElementById('action').onclick = action;

};

