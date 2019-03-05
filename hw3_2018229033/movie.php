<!-- Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.20
      File:movie php file -->
<!DOCTYPE html>
<html>
	<head>
		<title>TMNT - Rancid Tomatoes</title>

		<meta charset="utf-8" />
		<link href="movie.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		<a href="home.html"><img id="gobacks" src="images/goback.png"></a>
		<div id="header">
			<img id="banner" src="images/rancidbanner.png" alt="Rancid Tomatoes" />
		</div>
		<?php $movie = $_GET["film"]; 
			$dir_movie = "moviedb/$movie";
			$info = file("$dir_movie/info.txt");
			$overview = file("$dir_movie/overview.txt");
			$reviews = glob("$dir_movie/review*.txt");
		?>

		<h1 id="movieName"><?= $info[0]?>(<?=$info[1]?>)</h1>
		
		<div id="divTotal">
		<div id="divR"> 
			<div id="divOverview">
				<img src="<?=$dir_movie?>/overview.png" alt="general overview" />
			</div>
			<!-- add information using foreach -->
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
			<?php if ($info[2]>=60){?>
					<img src="images/freshlarge.png" alt="Rotten" />
			<?php } else{?>
				<img src="images/rottenlarge.png" alt="Rotten" />
			<?php }?>
			<span id="spanRotten"><?=$info[2]?>%</span>
		</div>
		
		<div id="divComment">

			<div id="commentL"></div>
			<div id="commentR"></div>
<!-- add comments using one for loop -->
			<?php $len_review = count($reviews);
			$len_left = ceil($len_review/2) ;
			for ($i = 0; $i < $len_review;$i++) {
				$review = file("$reviews[$i]");
				$review[1] = strtolower($review[1]);
				if ($i == 0) {?>
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
			</div>
		</div>
		<p id="PBottom">(1-<?= $len_review ?>) of 88</p>
		</div>
	</body>
</html>
