<!-- Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.23
      File:add note php file -->
<?php
	session_start();
	include("include/util.php");
	$id = $_SESSION["id"];
	$title = trim($_POST["note_title"]);
	/*the title is empty*/
	if (empty($title)){
		header("Location: error.php?type=note");
	}
	/*add a note*/
	else{
		$date = date("Y-m-d h:ia");
		$data = $title."\nCreated ".$date;
	
		$note_dir = dbpath()."/$id/notes";	
		$notes = glob($note_dir."/*");
		$notes_num = count($notes);
		$max_note=0;

		/*for loop: find the max note id*/
		for($i=0; $i<$notes_num; $i++){
			$note_id = note_id($notes[$i]);
			if($note_id >= $max_note)
				$max_note = $note_id+1;
		}
	
		$note_dir = $note_dir."/".$max_note;
		file_put_contents($note_dir, $data);
		header("Location: notes.php");
	}
	
?>