<?php
	include "include.php";
	$gid = $_GET["gid"];
	$gid_forder = get_gid_forder($gid);
	$player_id = $_GET["player_id"];
	$judge_id = 1-$player_id;
	$finished = file_get_contents("$gid_forder/finishOneShip_$judge_id.txt");
	echo $finished;
?>