<?php
	include "include.php";
	$gid = $_GET["gid"];
	$gid_forder = get_gid_forder($gid);
	$player_num = file_get_contents("$gid_forder/player_num.txt");
	if($player_num == 2){
		echo 1;
	} else
		echo 0;
?>