<?php
	$ship = $_GET["ship"];
	$player_id = $_GET["player_id"];
	$judge_id = 1-$player_id;

	$ship = substr($ship, 6);
	file_put_contents("database/judged_field$player_id.txt", "$ship,",FILE_APPEND);
	$arr = file("database/ship$judge_id.txt");
	$shipArr = explode(",", $arr[0]);
	if(in_array($ship, $shipArr)){
		echo 1;
		file_put_contents("database/next_player.txt", $player_id);
	}
	else {
		echo 0;
		file_put_contents("database/next_player.txt", $judge_id);
	}
?>