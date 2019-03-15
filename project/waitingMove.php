<?php
	$gid = $_GET["gid"];
	$next_player = file_get_contents("database/next_player_$gid.txt");
	echo $next_player;
?>