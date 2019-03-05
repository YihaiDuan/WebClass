<?php

# returns the relative path of the database folder
function dbpath() {
	return "2doDB";
}

# returns the first name of the user of login $login
function get_name($login) {
	$dbpath = dbpath();
	$info = file("$dbpath/$login/info.txt");
	return $info[1];
}

function get_passwd($login){
	$dbpath = dbpath();
	$info = file("$dbpath/$login/info.txt");
	return $info[0]-"\n";
}

# extract the note id (a number) from the file path
# of the file. For example, note_id("2doDB/marc/notes/3") returns "3"
function note_id($note_file) {
	return trim(strrchr($note_file, '/'),'/');
}

# returns the title of the $note array
function get_title($note) {
	return $note[0];
}

# returns the date of the $note array
function get_date($note) {
	return $note[1];
}

?>
