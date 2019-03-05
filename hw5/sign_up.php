<!-- Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.23
      File:signup php file -->
<?php
	include 'include/util.php';
	$firstName = trim($_POST["firstname"]);
	$lastName = trim($_POST["lastname"]);
	$login = trim($_POST["login"]);
	$passwd = trim($_POST["password"]);
	$dbpath = dbpath();
	$user_array = glob("$dbpath/*");
	$new_dir = dbpath()."/$login";
	if (empty($firstName)){
		header("Location: error.php?type=firstname");
	} elseif (empty($lastName)) {
		header("Location: error.php?type=lastname");
	} elseif (empty($login)) {
		header("Location: error.php?type=logup");
	} elseif (in_array($new_dir,$user_array)) {
		header("Location: error.php?type=logupExist");
	} elseif (empty($passwd)) {
		header("Location: error.php?type=pwdup");
	}

	else {
		mkdir($new_dir);
		mkdir("$new_dir/notes");
		$data = $passwd."\n".$firstName."\n".$lastName;
		file_put_contents("$new_dir/info.txt", $data);
		header("Location: sign_in_form.php");
	}
?>