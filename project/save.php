<?php
	$arr = $_GET["ship"];
	file_put_contents("database/ship.txt", $arr);
	echo $arr;
?>