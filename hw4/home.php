<!-- Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.22
      File:home php file -->
<?php
	include 'functions.php';
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Rancid Tomatoes</title>

		<meta charset="utf-8" />
		<link href="css/home.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		<div id="banner">
			<img src="images/rancidbanner.png" alt="Rancid Tomatoes" />
		</div>

		<h1>Movie reviews</h1>
		
<div id="content">
	<ul>
		<?php 
		$movie_dir = moviedb();
		$movie_arr = glob("$movie_dir/movie*");
		$movie_count = count($movie_arr);

		for ($i=1; $i<=$movie_count; $i++){?>
			<li><img src="<?=get_movie_icon($i)?>"> <a class="link" href="movie.php?film=<?=$i?>"><?=get_movie_name($i)?></a></li>
		<?php } ?>

	</ul>
</div>
      <div id="addlink"><a href="add_movie_form.php">add a new movie</a></div>

<div id="footer">
	 2018 &copy; Rancid Tomatoes <img src="images/fresh.gif" alt="Fresh" />
</div>
	
	</body>
</html>
