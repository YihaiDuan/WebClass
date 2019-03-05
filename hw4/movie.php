<!-- Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.22
      File:movie php file -->
<?php
	include 'functions.php';
?>
<!DOCTYPE html>
<html>
	<head>
		<title>TMNT - Rancid Tomatoes</title>

		<meta charset="utf-8" />
		<link href="css/movie.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		<a href="home.php"><img id="gobacks" src="images/goback.png"></a>
		<div id="header">
			<img id="banner" src="images/rancidbanner.png" alt="Rancid Tomatoes" />
		</div>
		<?php $movie_id = $_GET["film"]; 
			$dir_movie = moviedb()."/movie$movie_id";
			$info = file("$dir_movie/info.txt");
			$overview = file("$dir_movie/overview.txt");
			$reviews = glob("$dir_movie/review*.txt")
		?>

		<h1 id="movieName"><?= $info[0]?>(<?=$info[1]?>)</h1>
		
		<div id="divTotal">
		<div id="divR"> 
		<div id="divOverview">
			<img src="<?=$dir_movie?>/overview.png" alt="general overview" />
		</div>
		<dl id="information">
			<?php foreach ($overview as $ow){ 
				$ow_dt = substr($ow, 0,strpos($ow, ":"));
				
				$ow_dd = substr($ow, strpos($ow, ":")+1);
			?>
			<dt><span><?=$ow_dt?></span></dt>
				<dd><?=$ow_dd?></dd>
			<?php }?>

		</dl>
   		</div>


		<div id="rotten">
			<img src="<?=get_movie_icon_big($movie_id)?>" alt="Rotten" />
			<span id="spanRotten"><?=$info[2]?>%</span>
		</div>
		
		<div id="divComment">
		<?php $len_review = count($reviews);
			$len_left = ceil($len_review/2) ;
		?>
		<div id="commentL">	
		</div>
		<div id="commentR">
		</div>

			<?php for ($i = 0; $i < $len_review;$i++) {
				$review = file("$reviews[$i]");
				$review[1] = strtolower($review[1]);
				if ($i == 0) {
			?>
			<div id="commentL">
			<?php } else if ($i == $len_left) {?>	
			</div><div id="commentR">
				<?php } ?>
			<p class="quote">
				<img class="quoteIcon" src="images/<?= $review[1]?>.gif" alt="Rotten" />

				<q> <?=$review[0] ?></q>
			</p>
			<p class="reviewer"> 
				<img class="quoteIcon" src="images/critic.gif" alt="Critic" />
				<?= $review[2] ?><br />
				<?= $review[3] ?>
			</p>
		<?php } ?>
		<p id="addreview"><a href="add_review_form.php?film=<?=$movie_id?>">add a review</a></p>
		</div>
	</div>
		<p id="PBottom">(1-<?= $len_review ?>) of 88</p>
		</div>
	</body>
</html>
