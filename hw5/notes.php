<!-- Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.23
      File:notes php file -->
<?php session_start();
	include 'include/util.php';
	/*if the user has logged in*/
	if (isset($_SESSION["id"])){
		$id = $_SESSION["id"];
		$name = get_name($id);
		$note_dir = dbpath()."/$id/notes";
		$notes = glob($note_dir."/*");
		$notes_num = count($notes);
	}
	/*the user should login first*/
	else {
		header("Location: error.php?type=nologin");
	}


?>
<!DOCTYPE html>
<html>
  <head>
    <title>2DO</title>
    <meta charset="utf-8" />
    <link href="css/main.css" type="text/css" rel="stylesheet" />
    <script type="text/javascript" src="js/notes.js"></script>
    <script type="text/javascript" src="js/simpleajax.js"></script>
  </head>
<body>
	
	<a id="logout" href="logout.php">
		<input class="button" type="button" value="Logout" />
	</a>
	
	<div id="top_banner">
		<form method="post" action="add_note.php">
			<div>
				<span class="left"><?=$name?>'s <span id="logo">2DO</span> notes</span>
			</div>
			<div class="right">
				<input class="button right" type="submit" value="Add note" title="add a new note"/>
				<input class="right" type="text" name="note_title" />
				<div>Enter the title of your new note here</div>
			</div>
		</form>
	</div>
	
	<div id="content">
	<?php for($i=0; $i<$notes_num; $i++){
		$note_id = note_id($notes[$i]);
		$note = file("$note_dir/$note_id");
	?>
		<form class="list left" action="perform_action.php" method="post">	
		<input type="hidden" name="todo_id" value="<?=$note_id?>" />
		<div class="note_title" title="<?=get_date($note)?>" >
			<?=get_title($note)?>			<input class="button right" type="submit" name="delete_note" value="X" title="delete this note"/>
		</div>	
		<ul>
					<?php for ($j=2; $j<count($note); $j++){
					?>						
						<li><span class="todo"><?=$note[$j]?></span></li>
					<?php }?>
				</ul>
		<div>
			<input class ='left text_input' type="text" name="new_todo" />
			<input class ='right button' type="submit" name="add_todo" value="+" title="add a todo"/>
		</div>	
	</form>

	<?php }?>
	
	
</div>
</body>
</html>