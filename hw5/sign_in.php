<!-- Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.23
      File:signin php file -->
<?php
	include 'include/util.php';
	session_start();
	$id = $_POST["login"];
	$passwd = $_POST["password"];
	$_SESSION["id"] = $id;
	$user_dir = dbpath()."/$id";
	if(file_exists($user_dir)){
		$real_passwd = get_passwd($id);
		if ($passwd != $real_passwd){	
			header("Location: error.php?type=login2");
		}
		else {
			header("Location: notes.php");
		}
	}
	else{
		header("Location:error.php?type=login1");
	}
	
	//header("Location: notes.php");
	
?>