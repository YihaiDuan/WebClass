<?php
	include "include.php";
	session_start();

	$uname = $_GET["uname"];
	$passwd = $_GET["passwd"];
	$_SESSION["uname"] = $uname;
	$user_forder = get_user_forder($uname);
	if(!is_dir($user_forder)){
		echo "not exists";
	}else{
		$info = file("$user_forder/info.txt");
		if($passwd != $info[0])
			echo "passwd incorrect";
		else
			echo $uname;
	}
?>