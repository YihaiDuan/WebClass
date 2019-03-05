window.onload = function(){
	function spanOnclick(){
		alert(this.innerHTML);
	}
	var spanTodo = document.querySelectorAll("span.todo");
	for (var i = 0; i < spanTodo.length; i++) {
		spanTodo[i].onclick = spanOnclick;
	}
}