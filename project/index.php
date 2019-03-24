<?php 
	session_start();
	$uname = "visitor";
	if(isset($_SESSION["uname"]))
		$uname = $_SESSION["uname"];
	$row = 11;
	$colomn = 11;
	$arr = array("A","B","C","D","E","F","G","H","I","J");
	// $url = $_SERVER['HTTP_HOST'];
	$gid = "";
	if(isset($_GET["gid"])){
		$gid = $_GET["gid"];
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>battle ship</title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	
	<script type="text/javascript" src="js/ship.js"></script>
	<script type="text/javascript" src="js/simpleajax.js"></script>
</head>
<body>
<div class="header">
	<h1 id="title">Battle ship </h1> <h2 id="gid"><?=$gid?></h2><h2 id="uname"><?=$uname?></h2>
	<div class="notification">Arrange </div>
	<div class="logDiv">
		<span class="label label-info" id="userSpan">Info</span>
		<input type="button"  value="SignIn" id="signin" >
		<input type="button"  value="SignUp" id="signup" >
		<input type="button"  value="LogOut" id="logout" >
	</div>
</div> 

 <div id="twoTable">
 		<div class="portnone">
		<div class= "port-instruction">Please move your ship</div>
		<div class="port-lines">
			<div class="port-line"></div>
			<div class="port-line"></div>
			<div class="port-line"></div>
		</div>
	</div>
	<div class="divLeft">
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

	<div class="bottom">
		<label class = "Robot label label-success"><a href="index.php">Robot</a></label>
		<label class = "Restart label label-warning">Restart</label>
		<label class = "Record label label-important">Record</label>
	</div>
	
	</div>

	<div class="divRight">
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
					<td class="battle_cell empty" id = "table2<?=($i-1)*10+$j-1?>"><div class="ship_content" ><div class="ship_r"></div></div></td>
			<?php }}?>
		</tr>
		<?php }?>	
		</tbody>
	</table>
	<table id="table3">
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
					<td class="battle_cell empty" id = "table3<?=($i-1)*10+$j-1?>"><div class="ship_content" ></div></td>
			<?php }}?>
		</tr>
		<?php }?>	
		</tbody>
	</table>
	<div class="battlefield-start-choose_rival">
		<h3>Opponent</h3>
		<ul class="ulOpponent">
			<li class="start-li"><a class="rival-variant-link_connect" href="">Robot</a> </li>
			<li class="start-li"><a class="rival-variant-link" href="">Friend</a> </li>
			<li class="start-li"><a class="rival-variant-link" href="">Random</a> </li>
		</ul>
		<div class="start-button">Start</div>
	</div>
	</div> 

</div > 
	<div id="loginDiv">
     <div class="form-horizontal">
      <div class="control-group">
        <label class="control-label" for="inputEmail">UserName</label>
        <div class="controls">
          <input type="text" id="inputUserName" placeholder="UserName">
        </div>
      </div>
      <div class="control-group">
        <label class="control-label" for="inputPassword">Password</label>
        <div class="controls">
          <input type="password" id="inputPassword" placeholder="Password">
        </div>
      </div>
      <div class="control-group">
        <div class="controls">
          <label class="checkbox">
            <input type="checkbox"> Remember me
          </label>
          <button type="submit" class="btn" id="SignInbtn">Sign in</button>
        </div>
      </div>
    </div> 
    </div>
    <div id="signupDiv">
     <div class="form-horizontal">
      <div class="control-group">
        <label class="control-label" for="inputUserName2">UserName</label>
        <div class="controls">
          <input type="text" id="inputUserName2" placeholder="UserName">
        </div>
      </div>
      <div class="control-group">
        <label class="control-label" for="inputPassword2">Password</label>
        <div class="controls">
          <input type="password" id="inputPassword2" placeholder="Password">
        </div>
      </div>
      <div class="control-group">
        <label class="control-label" for="inputPassword3">Confirm Password</label>
        <div class="controls">
          <input type="password" id="inputPassword3" placeholder="Password">
        </div>
      </div>
      <div class="control-group">
        <div class="controls">

          <button type="submit" class="btn" id="SignUpbtn">Sign up</button>
        </div>
      </div>
    </div> 
    </div>
</body>
</html>