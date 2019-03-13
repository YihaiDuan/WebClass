<?php
	$ship = $_GET["ship"];
	$player_id = $_GET["player_id"];
	$judge_id = 1-$player_id;
	$isship = 0;
	$done = 1;
	$ship = substr($ship, 6);
	file_put_contents("database/judged_field$player_id.txt", "$ship,",FILE_APPEND);
	$arr = file("database/ship$judge_id.txt");
	for($i=0; $i<count($arr); $i++){
		$shipArr = explode(",", substr($arr[$i], 0,-1));
/*		for($j=0; $j<count($shipArr); $j++){
			echo $shipArr[$j]." ";
		}*/
/*		echo "$ship ";*/
		if(in_array($ship, $shipArr)){
			$isship = 1;
			if($shipArr[0] == "101")
				echo "2$i";
			else 
				echo "1$i";
			file_put_contents("database/next_player.txt", $player_id);
			$arr[$i][2] =$arr[$i][2]-1;
			file_put_contents("database/ship$judge_id.txt", $arr);
		}
		if($arr[$i][2]!="0"){
			$done = 0;
		}
	}
	if(1){
		echo $done;
	}
	if(!$isship) {
		echo 0;
		file_put_contents("database/next_player.txt", $judge_id);
	}
?>