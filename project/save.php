<?php
	if(isset($_GET["ship"])){
		$arr = $_GET["ship"];
		$ship_num = file_get_contents("database/ship.txt");

		file_put_contents("database/ship$ship_num.txt", $arr);
		echo $ship_num;
		$ship_num++;
		file_put_contents("database/ship.txt", $ship_num);
		
	}
	
	
?>