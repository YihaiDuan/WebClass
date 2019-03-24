<?php
	include "include.php";
	$gid = $_GET["gid"];
	$gid_forder = get_gid_forder($gid);
	if(isset($_GET["ship"])){
		$arr = json_decode($_GET["ship"]);

		if(!is_dir($gid_forder))
			mkdir($gid_forder);
		if(!file_exists("$gid_forder/player_num.txt")){
			fopen("$gid_forder/player_num.txt", "w");
			file_put_contents("$gid_forder/player_num.txt", 0);
		}
		$player_num = file_get_contents("$gid_forder/player_num.txt");
		if($player_num!=0 && $player_num!=1){
			file_put_contents("$gid_forder/player_num.txt", 0);
			$player_num = file_get_contents("$gid_forder/player_num.txt");
		}
		$f = fopen("$gid_forder/judged_field_$player_num.txt","w");
		foreach ($arr as $obj) {
			$content[] = $obj->tds . "\n";
		}
		file_put_contents("$gid_forder/ship_$player_num.txt", $content);
		fopen("$gid_forder/finishOneShip_$player_num.txt", "w");
		echo $player_num;
		$player_num++;
		file_put_contents("$gid_forder/player_num.txt", $player_num);
		
	}
	if(isset($_GET["dots"])){
		$dots = $_GET["dots"];
		$player_id = $_GET["player_id"];
		file_put_contents("$gid_forder/finishOneShip_$player_id.txt", $dots.",",FILE_APPEND);
	}
	
	
?>