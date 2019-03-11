<?php
	if(isset($_GET["ship"])){
		$arr = $_GET["ship"];
		$player_num = file_get_contents("database/player_num.txt");
		if($player_num!=0 && $player_num!=1){
			file_put_contents("database/player_num.txt", 0);
			$player_num = file_get_contents("database/player_num.txt");
		}
		$f = fopen("database/judged_field$player_num.txt","w");
		file_put_contents("database/ship$player_num.txt", $arr);
		echo $player_num;
		$player_num++;
		file_put_contents("database/player_num.txt", $player_num);
		
	}
	
	
?>