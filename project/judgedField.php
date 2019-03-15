<?php
	$gid = $_GET["gid"];
	$player_id = $_GET["player_id"];
	$judge_id = 1-$player_id;
	$judged_field = file_get_contents("database/judged_field_$gid"."_$judge_id.txt");
	echo $judged_field;
?>