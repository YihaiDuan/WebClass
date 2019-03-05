<!-- Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.22
      File:add review form php file -->
<?php
	$movie_id = $_GET["film"];
	$dir_movie = "moviedb/movie$movie_id";
	$info = file("$dir_movie/info.txt");
?>

<link href="css/form.css" type="text/css" rel="stylesheet" />

<h1>Add a review for <?=$info[0]?> </h1>
		
<div id="content">
 
<form method="get" action="add_review.php">
	<div>Personal information</div>
	<label for="name">Name</label><input name="name" type="text" required="required"/><br />
	<label for="organization">Organization</label><input name="organization" type="text" required="required"/><br />
	
	<div>Your rating</div>
	
	<img src="images/fresh.gif" alt="Fresh" />FRESH <input type="radio" name="rating" value="FRESH" checked="checked" />
  	<img src="images/rotten.gif" alt="Rotten" />ROTTEN <input type="radio" name="rating" value="ROTTEN" />
  	
	<div>Your review</div>
	
	<textarea id="review" name="review" rows="10" cols="95" required="required"></textarea>
	<input type="hidden" name="film" value="<?=$movie_id?>" />
	
	<div>
		<input id="submit" name="submit" type="submit" value="Submit" />
	</div>
</form>

</div>

<?php
	
?>
