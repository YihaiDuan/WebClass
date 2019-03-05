<!-- Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.23
      File:perform action php file -->
<?php
	session_start();
	include("include/util.php");
	$id = $_SESSION["id"];
	$note_id = $_POST["todo_id"];
	$note_dir = dbpath()."/$id/notes/$note_id";
	
	/*action: delete note*/	
	if ( isset($_POST["delete_note"])) {
		include("delete_note.php");
		header("Location: notes.php");
	}
	/*action add */
	else if(isset($_POST["add_todo"])){
		
		$new_note = trim($_POST["new_todo"]);
		if (empty($new_note))
			header("Location: error.php?type=todo");
		else{
			include("add_todo.php");
			header("Location: notes.php");
		}
	}
?>