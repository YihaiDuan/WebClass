<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Homework #7</title>
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <script src="js/simpleajax.js"></script>
        <script src="js/exercise-3.js"></script>
    </head>

    <body>
        <header>
            <h1>Participant list</h1>
            <?php
            	$date = file( "database/date.txt", FILE_IGNORE_NEW_LINES);
				$date = $date[0];
            ?>
            <h4>(last update: <span id="date"><?= $date ?></span>)</h4>
        </header>
        
        <section id="new">
            <h2>New participant</h2>
            <div>
                <div class="data">
                    <label>First name :</label><input id="firstname" class="data" type="text" />
                </div>           
                <div class="data">
                    <label>Last name :</label><input id="lastname" class="data" type="text" />
                </div>
                <div class="data">
                    <input type="radio" name="gender" value="male" id="male" checked> Male
                    <input type="radio" name="gender" value="female"> Female
                </div>
            </div>
            <input type="button" value="Add" />
        </section>
        
        <section id="list">
            <h2>Participant list</h2>
            <ol>
<?php
	$participants = file( "database/participants.txt", FILE_IGNORE_NEW_LINES );
	foreach ( $participants as $participant ) {
		$parts = explode(":",$participant);
?>
			<li class="<?= $parts[0]; ?>"><?= $parts[1] ?></li>
<?php
	}
?>
            </ol>
        </section>    
    </body>
</html>
