<!-- Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.22
      File:add review error php file -->
<?php
	$movie_id = $_GET["film"];
?>

<link href="css/add_review_error.css" type="text/css" rel="stylesheet" />

<h1>Error in uploading a review for </h1>
		
<div id="content">

	<p>
		Your review upload failed. Maybe you didn't provide all the information required, so please try again...
	</p>

</div>

<div id="addlink">
	<a href="movie.php?film=<?=$movie_id?>">back to movie</a>
</div>

<?php
	
?>
