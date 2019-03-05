<?php
function moviedb (){
	return "moviedb";
}
function get_movie_icon($i){
	$info = file(moviedb()."/movie$i/info.txt");
	if ($info[2] >= 60)
		return "images/fresh.gif";
	else 
		return "images/rotten.gif";
}
function get_movie_icon_big($i){
	$info = file(moviedb()."/movie$i/info.txt");
	if ($info[2] >= 60)
		return "images/freshlarge.png";
	else 
		return "images/rottenlarge.png";
}
function get_movie_name($i){
	$info = file(moviedb()."/movie$i/info.txt");
	return $info[0];
}




?>