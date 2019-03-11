<?php
	$player_num = file_get_contents("database/player_num.txt");
	if($player_num == 2){
		echo 1;
	} else
		echo 0;
?>