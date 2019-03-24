<?php
	include "include.php";
	$gid = $_GET["gid"];
	$gid_forder = get_gid_forder($gid);
	$next_player = file_get_contents("$gid_forder/next_player.txt");
	echo $next_player;
?>