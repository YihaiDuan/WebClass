<?php
	include "include.php";
	$gid = $_GET["gid"];
	$gid_forder = get_gid_forder($gid);
	$player_id = $_GET["player_id"];
	$judge_id = 1-$player_id;
	$judged_field = file_get_contents("$gid_forder/judged_field_$judge_id.txt");
	echo $judged_field;
?>