<!-- Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.22
      File:add review php file -->
<?php 
	$name = trim($_GET["name"]);
	$organization = trim($_GET["organization"]);
	$img_radio = $_GET["rating"];
	$review = trim($_GET["review"]);
	$movie_id = $_GET["film"];

	if(empty($name) || empty($organization) || empty($review)){
		header("Location:add_review_error.php?film=$movie_id");
	} else{
		$dir_movie = "moviedb/movie$movie_id";
		$reviews = glob("$dir_movie/review*.txt");
		$review_count = count($reviews);
		$review_count += 1;	

		$new_review = $review."\n".$img_radio."\n".$name."\n".$organization;
		file_put_contents("$dir_movie/review$review_count.txt", $new_review);
		header("Location: movie.php?film=$movie_id");
	}
	

?>