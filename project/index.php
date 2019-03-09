<?php 
	$row = 11;
	$colomn = 11;
	$arr = array("A","B","C","D","E","F","G","H","I","J");
?>
<!DOCTYPE html>
<html>
<head>
	<title>battle ship</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script type="text/javascript" src="js/ship.js"></script>
	<script type="text/javascript" src="js/simpleajax.js"></script>
</head>
<body>
<div class="header"><h1>Battle ship</h1>
	<div class="notification">Arrange </div>
</div>

<div id="twoTable">
	<table id="table1">
		<tbody>
		<?php for($i=0; $i<$colomn; $i++){ ?>
			<tr class="battle_row">
			<?php for($j=0; $j<$row; $j++){ 
				if($i==0 && $j==0){ ?>
				<td class="outside_cell"></td>
			<?php } else if($i==0 && $j>0){ ?>
				<td class="outside_cell"><?=$arr[$j-1]?></td>
			<?php } else if($i>0 && $j==0){ ?>
				<td class="outside_cell"><?=$i?></td>
			<?php }else { ?>
					<td class="battle_cell empty" id = "<?=($i-1)*10+$j-1?>"><div class="ship_content" ></div></td>
			<?php }}?>
		</tr>
		<?php }?>		
		</tbody>
	</table>
<div class="start-button">Start</div>
 	<table id="table2">
		<tbody>
			<?php for($i=0; $i<$colomn; $i++){ ?>
			<tr class="battle_row">
			<?php for($j=0; $j<$row; $j++){ 
				if($i==0 && $j==0){ ?>
				<td class="outside_cell"></td>
			<?php } else if($i==0 && $j>0){ ?>
				<td class="outside_cell"><?=$arr[$j-1]?></td>
			<?php } else if($i>0 && $j==0){ ?>
				<td class="outside_cell"><?=$i?></td>
			<?php }else { ?>
					<td class="battle_cell empty" id = "table2<?=($i-1)*10+$j-1?>"><div class="ship_content" ><div class="ship_r"><span class="left"></span><span class="right"></span></div></div></td>
			<?php }}?>
		</tr>
		<?php }?>	
		</tbody>
	</table>

</div>
</body>
</html>