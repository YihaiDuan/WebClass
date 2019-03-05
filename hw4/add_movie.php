<!-- Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.22
      File:add movie php file -->
<?php
		$movie_dir = "moviedb";
		$movie_arr = glob("$movie_dir/movie*");
		$movie_count = count($movie_arr);
		$movie_count += 1;
		mkdir("$movie_dir/movie$movie_count");

		move_uploaded_file($_FILES["info"]["tmp_name"], "$movie_dir/movie$movie_count/info.txt");
		move_uploaded_file($_FILES["overview"]["tmp_name"], "$movie_dir/movie$movie_count/overview.txt");
		move_uploaded_file($_FILES["image"]["tmp_name"], "$movie_dir/movie$movie_count/overview.png");
		for($i=1; $i<=10; $i++){
			$name = "review$i";
			if(is_uploaded_file($_FILES["$name"]["tmp_name"])){
				move_uploaded_file($_FILES["$name"]["tmp_name"], "$movie_dir/movie$movie_count/review$i.txt");
			}
		}
		header("Location: home.php");
?>