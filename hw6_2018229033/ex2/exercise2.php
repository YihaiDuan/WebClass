<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Lab #6 - Exercise 2</title>
    </head>
    <style>
    	body {
    		text-align: center;
    		font-size: larger;
    		padding-top: 50px;
    	}
    </style>
    <body>
<?php
	echo "Dear ";
	if ( $_POST[ "gender" ] == "male" )
		echo "Mr. ";
	else if ( $_POST[ "mariage"] == "yes" )
		echo "Mrs. ";
	else
		echo "Ms. ";
	echo $_POST[ "first" ]." ".$_POST[ "last" ];
	if ( isset($_POST[ "mariage"]) && $_POST[ "mariage"] == "yes" )
		echo " (maiden name ".$_POST[ "maidename" ].") ";
	echo "<br>";
	echo "welcome on our website!";
?>
	</body>
</html>
