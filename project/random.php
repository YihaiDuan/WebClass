<?php
	include "include.php";
	$database = get_database();
	$random_files = glob("$database/random*");
	$count = count($random_files);
	$count--;
	if(!is_dir("$database/random-$count"))
		$count++;
	if(file_exists("$database/random-$count/ship_1.txt"))
		$count++;
	echo "random-$count";
?>