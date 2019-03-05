// the grid is 3x3
var size = 3;

// if grid[i][j] == -1, the cell (i,j) is empty, else grid[i][j]
// is the player number who ticked that cell (0 or 1)
var grid = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];

// the name of the players
var player_name = ["", ""];

// the image for each player
var player_image = ["O.png", "X.png"];

// the current player
var current_player = 0;

// the total number of clicks
var clicks = 0;

// if play is false, the clicks are disabled
var play = false;

// checks if the player filled the row
function winning_row(player, row) {
	for (var i=0; i<size; i++) {
		if (grid[row][i] != player) {
			return false;
		}
	}
	return true;
}


// checks if the player filled the column
function winning_column(player,column) {
	for (var i=0; i<size; i++) {
		if(grid[i][column] != player){
			return false;
		}
	}
	return true;

}

// checks if the player filled the downward diagonal
function winning_diagonal_down(player) {
	for (var i=0; i<size; i++) {
		if(grid[i][i] != player){
			return false;
		}
	}
	return true;
}

// checks if the player filled the upward diagonal
function winning_diagonal_up(player) {
	for (var i=0, j=size-1; i<size,j>=0; i++,j--) {
		if(grid[i][j] != player){
			return false;
		}
	}
	return true;
}

// checks if the player filled one of the two diagonals
function winning_diagonal(player) {
	if (winning_diagonal_up(player) || winning_diagonal_down(player))
		return true;
}

// checks if the player filled a row, a column or a diagonal
function is_winner(player) {
	
	for (var i = 0; i < size; i++) {
		if(winning_row(player,i) || winning_column(player,i) || winning_diagonal(player)){
		return true;
	}
	}
}

// display the result about the winner
function and_the_winner_is(player) {
	msg.innerHTML = player_name[player] + " Win! in " + Math.ceil(clicks/2) + " steps";
	final.style.visibility = "visible";
}

// process the click on the object image
// in the cell (row,column) in the grid, 
function click_at(row, column, image) {
	//alert(image.src);
	if(!play)
		alert("Who starts first?");
	else if( grid[row][column] == -1){
		clicks++;
		image.src = player_image[current_player];
		grid[row][column] = current_player;
		if(is_winner(current_player)){
			play = false;
			and_the_winner_is(current_player);	
		}
		else if(clicks == size*size){
			play = false;
			msg.innerHTML = "Game Over, No winner!";
			final.style.visibility = "visible";
		}
		current_player == 1 ? current_player = 0 : current_player = 1;
	}
	
}

// set the name of the players
function set_players() {
	player_name[0] = document.getElementById("player1").value;
	player_name[1] = document.getElementById("player2").value;
	player_name[0] = Trim(player_name[0]);
	player_name[1] = Trim(player_name[1]);
	if(player_name[0] == "" || player_name[1] == ""){
		alert("Player name should not be empty!");
	}else if ( player_name[0] == player_name[1]){
		alert("Player names should not be the same!");
	} else

	{
		start = document.getElementById("start");
		start.style.visibility = "visible";
		span1 = document.getElementById("first_player");
		span2 = document.getElementById("second_player");
		span1.innerHTML = player_name[0];
		span2.innerHTML = player_name[1];
	}

}

// allow the game to start
function start_game() {
	var radio = document.querySelector("input[name='who']:checked");
	play = true;
	if (radio.id == "check_second"){
		current_player = 1;
	}

}

// process the play-again action
function play_again() {
	imgs = document.querySelectorAll("td img");
	for(var i=0; i<imgs.length; i++){
		imgs[i].src = "white.png";
	}
	for(var i=0; i<size; i++)
		for(var j=0; j<size; j++)
			grid[i][j] = -1;

	var msg = document.getElementById("msg");
	msg.innerHTML = "";
	var final = document.getElementById("final");
	final.style.visibility = "hidden";
	clicks = 0;

}

// process the quit action
function quit() {
	window.location.href = "closing.html";
}

function Trim(str)
 { 
  return str.replace(/^\s+|\s+$/gm,''); 
}