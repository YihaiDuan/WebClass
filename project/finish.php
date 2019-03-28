<?php
	include "include.php";
	$gid = $_GET["gid"];
	$gid_forder = get_gid_forder($gid);
	$content = file($gid_forder."/final.txt");
	if(count($content)>0)
		echo $content[0];
	else
		echo "";
?>