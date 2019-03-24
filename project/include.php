<?php
function get_database(){
	return "database";
}
function get_gid_forder($gid){
	return get_database()."/$gid";
}
function get_user_forder($user){
	return get_database()."/users/$user";
}

?>