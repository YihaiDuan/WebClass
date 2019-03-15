<?php
	$gid = $_GET["gid"];
	$player_num = file_get_contents("database/player_num_$gid.txt");
	if($player_num == 2){
		echo 1;
	} else
		echo 0;
?>