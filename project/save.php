<?php
	if(isset($_GET["ship"])){
		$arr = json_decode($_GET["ship"]);
		$player_num = file_get_contents("database/player_num.txt");
		if($player_num!=0 && $player_num!=1){
			file_put_contents("database/player_num.txt", 0);
			$player_num = file_get_contents("database/player_num.txt");
		}
		$f = fopen("database/judged_field$player_num.txt","w");
		foreach ($arr as $obj) {
			$content[] = $obj->tds . "\n";
		}
		file_put_contents("database/ship$player_num.txt", $content);
		fopen("database/finishOneShip$player_num.txt", "w");
		echo $player_num;
		$player_num++;
		file_put_contents("database/player_num.txt", $player_num);
		
	}
	if(isset($_GET["dots"])){
		$dots = $_GET["dots"];
		$player_id = $_GET["player_id"];
		file_put_contents("database/finishOneShip$player_id.txt", $dots.",",FILE_APPEND);
	}
	
	
?>