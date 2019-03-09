<?php
	$ship = $_GET["ship"];
	$player_id = $_GET["player_id"];
	$judge_id = 1-$player_id;
	$ship = substr($ship, 6);
	$arr = file("database/ship$judge_id.txt");
	$shipArr = explode(",", $arr[0]);
	if(in_array($ship, $shipArr))
		echo 1;
	else {
		echo 0;
	}
?>