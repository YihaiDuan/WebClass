<?php
	include "include.php";

	$uname = $_GET["uname"];
	$passwd = $_GET["passwd"];
	$user_forder = get_user_forder($uname);
	if(is_dir($user_forder)){
		echo 0;
	}else {
		mkdir($user_forder);
		file_put_contents("$user_forder/info.txt",$passwd);
		echo 1;
	}
?>