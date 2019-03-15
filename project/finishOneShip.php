<?php
	$gid = $_GET["gid"];
	$player_id = $_GET["player_id"];
	$judge_id = 1-$player_id;
	$finished = file_get_contents("database/finishOneShip_$gid"."_$judge_id.txt");
	echo $finished;
?>