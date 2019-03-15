<?php
	if(isset($_GET["ship"])){
		$arr = json_decode($_GET["ship"]);
		$gid = $_GET["gid"];
		if(!file_exists("database/player_num_$gid.txt")){
			fopen("database/player_num_$gid.txt", "w");
			file_put_contents("database/player_num_$gid.txt", 0);
		}
		$player_num = file_get_contents("database/player_num_$gid.txt");
		if($player_num!=0 && $player_num!=1){
			file_put_contents("database/player_num_$gid.txt", 0);
			$player_num = file_get_contents("database/player_num_$gid.txt");
		}
		$f = fopen("database/judged_field_$gid"."_$player_num.txt","w");
		foreach ($arr as $obj) {
			$content[] = $obj->tds . "\n";
		}
		file_put_contents("database/ship_$gid"."_$player_num.txt", $content);
		fopen("database/finishOneShip_$gid"."_$player_num.txt", "w");
		echo $player_num;
		$player_num++;
		file_put_contents("database/player_num_$gid.txt", $player_num);
		
	}
	if(isset($_GET["dots"])){
		$dots = $_GET["dots"];
		$gid = $_GET["gid"];
		$player_id = $_GET["player_id"];
		file_put_contents("database/finishOneShip_$gid"."_$player_id.txt", $dots.",",FILE_APPEND);
	}
	
	
?>