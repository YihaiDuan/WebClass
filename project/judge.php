<?php
	$ship = $_GET["ship"];
	$ship = substr($ship, 6);
	$arr = file("database/ship.txt");
	$shipArr = explode(",", $arr[0]);
	if(in_array($ship, $shipArr))
		echo 1;
	else {
		echo 0;
	}
?>