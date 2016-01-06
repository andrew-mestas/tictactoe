var totalClicks = 0;
var playerWins = 0;
var computerWins = 0;
var data = [];
var difficulty = false;

document.addEventListener('DOMContentLoaded',function(){


var board = [[null,null,null],
             [null,null,null],
             [null,null,null]];

var reset = function(){
	 board = [[null,null,null],
             [null,null,null],
             [null,null,null]];

	for(var i =0;i<9;i++)
	{
	    document.getElementsByClassName("col")[i].style.background = "linear-gradient(to left, #525252 , #3d72b4)";
	}
	totalClicks = 0;
}

var computerAI = function(letter){
	var row = null;
 	var col = null;
 	var times = 0;
 	var defaultMove = false;
 	var val =0;
 	var again = false;
 	var reassign1 = 0;
 	var reassign2 = 2;

	if(totalClicks < 2){
// 0,0 0,2 2,0 2,2
	  do{ 
	  	console.log(board);
	 	row = Math.floor(Math.random()*3);
	 	col = Math.floor(Math.random()*3);
	 	if(times%2==0){
	 		reassign1 = 2;
	 	}
	 	else
		reassign1 = 0;
	 	if(times%3==0)
	 		reassign2 = 0;
	 	else
	 		reassign2 = 2;

	 	if(row == 1)
	 	 row = reassign1;
	 	if(col == 1)
	 	 col = reassign2

	 	switch(board[row][col]){
	 		case "X" : 
	 		again = true;
	 		break;

	 	}
	 	times++;
	 }while(again && times <4)


	 console.log("totalC " + totalClicks + " "  + row + "  " + col);

    board[row][col] = "O";
    var index = row*3 + col;
    document.getElementsByClassName("col")[index].style.background= "rgba(255,81,0,0.6)";
}
    else{
	 console.log("my move Now");
	 checkWin();
	 console.log(data);

	 if(data.indexOf(2) == 0 || data.indexOf(2) == 1)
	 {
	 	console.log("first ");
	 	switch(data.indexOf(2))
	 	{
	 		case 1: 
	 		console.log("Case1");
	 		row = 3;
	 				col = 3;
	 			do{
				 	row--;
				 	col--;
	 		 	console.log(board);
	 		 		times++;
				 }	while(board[row][col] == "X" &&  times < 3);
	 		break;
	 		case 0:
	 			 		console.log("Case2");
 					row = -1;
	 				col = 3;
	 		do{				 	
				 	row++;
				 	col--;
				 	times++;

	 		 	console.log(row + " " +col);
				 }	while(board[row][col] != null && times < 3);
				 	 		 	console.log(row + " " +col);

	 		break;

	 	}
	 	times > 3 ? defaultMove = true : defaultMove = false;
	 	times = 0;
	 
	}
	else if(data.indexOf(2) == 2 || data.indexOf(2) == 4 ||data.indexOf(2) == 6)
	{
		console.log("row ");
		console.log(board);
		switch(data.indexOf(2))
		{
			case 2 : row = 0;
			break;
			case 4 : row = 1;
			break;
			case 6 : row = 2;
			break;
		}		
		col = -1;
		do{
	 	
	 	col++;
	 	console.log(row + " " + col);
	 	//console.log(board);
	 	times++;
	 }	while(board[row][col] != null && times <3)
	 console.log(row + " " + col + " " +times);
	 times >= 3 ? defaultMove = true : defaultMove = false;

	 times= 0;
	}
	else if(data.indexOf(2) == 3 || data.indexOf(2) == 5 ||data.indexOf(2) == 7)
	{
		console.log("col");
		switch(data.indexOf(2))
		{
			case 3 : col = 0;
			break;
			case 5 : col = 1;
			break;
			case 7 : col = 2;
			break;
		}		
		row = -1;

		do{
	 	row++;
	 	console.log(row + " " + col);
	 		//console.log(board);
	 	times++;
	 }	while(board[row][col] != null && times < 3)
console.log(times);
	 console.log("not found");
	 times > 3 ? defaultMove = true : defaultMove = false;

	 times=0;
	}

	 //console.log(row + "  " + col);
	 if(defaultMove || data.indexOf(2) < 0)
	 {console.log("default");
	  computerEasy();
	}
	else{
	if(board[row][col] == "X")
		computerEasy();

    board[row][col] = "O";
    var index = row*3 + col;
    document.getElementsByClassName("col")[index].style.background= "rgba(255,81,0,0.6)";
		}
    }

}

var playerMove = function (letter,row,col){
	if(board[row][col] == null){
	   board[row][col] = letter;
	   return true;
	}
    else{
      alert("choose another");
      return false;
    }

}

var checkWin = function(){
	var outcome1 = 0;
	var outcome2 = 0;
	var outcome3 = 0;
	var outcome4 = 0;
	var winner   = false;
	data = [];

	// outcome 3 up-left cross
	// outcome 4 down-left cross
	for(var i=2,t=0; i>=0;i--,t++){

		 	switch(board[i][t])
		   {
		   		case "X" : outcome3++;
		   		//console.log("AX",i,t);
		   		break;
		   		case "O" : outcome3--;
		   		//console.log("AO",i,t);
		   		break;
		   }	
		   	switch(board[t][t])
		   {
		   		case "X" : outcome4++;
		   		//console.log("BX",t,i);
		   		break;
		   		case "O" : outcome4--;
		   		//console.log("BO",t,i);
		   		break;
		   }	

			if(outcome3 == 3 || outcome4 == 3){
			 winner = "X";
			 break;
			}
			else if(outcome3 == -3 || outcome4 == -3){
			 winner = "O";
			 break;
			}

		}
		   data.push(outcome3);
		   data.push(outcome4);
// outcome 1 for across
// outcome 2 for up-down
	for(var i=0;i<3;i++){
		outcome1 = 0;
		outcome2 = 0;

		for(var t=0;t<3;t++){

		   switch(board[i][t])
		   {
		   		case "X" : outcome1++;
		   		break;
		   		case "O" : outcome1--;
		   		break;
		   }

		   switch(board[t][i])
		   {
		   		case "X" : outcome2++;
		   		break;
		   		case "O" : outcome2--;
		   		break;
		   }		   
		 
		}
		  data.push(outcome1);
		  data.push(outcome2);

	if(outcome1 == 3 || outcome2 == 3){
	 winner = "X";
	 break;
	}
	else if(outcome1 == -3 || outcome2 == -3){
	 winner = "O";
	 break;
	}
	}
		  console.log("1 " + outcome1);
		  console.log("2 " + outcome2);
		  console.log("3 " + outcome3);
		  console.log("4 " + outcome4);
		
	console.log("winner ",winner);
	if(winner == "O" || winner == "X"){
     return (winner + " Wins!");
	} else {
		return ['No one yet'];
	}
}

var computerEasy = function(letter) {

	var row = null;
 	var col = null;

	 do{
	 	row = Math.floor(Math.random()*3);
	 	col = Math.floor(Math.random()*3);
	 	console.log(row + " " + col);
	 }	while(board[row][col] != null)

	 console.log("easy "  + row + "  " + col);

    board[row][col] = "O";
    var index = row*3 + col;
    document.getElementsByClassName("col")[index].style.background= "rgba(255,81,0,0.6)";
}


	var entryBox = document.getElementsByClassName("col");
	var rowNum = 0;
	var count = -1;
	for(var i=0;i<9;i++)
	{   
	    if(i%3 == 0)
	      count++;

	  rowNum = count + " " + i%3;
	  entryBox[i].setAttribute("value", rowNum);

	}

	document.getElementsByClassName("dif")[0].addEventListener("click",function(){

		difficulty = !difficulty;
		var s = null;

		if(difficulty)
			s = "MCP";
		else
			s = "Little Brother";

		document.getElementsByClassName("dif")[0].innerHTML = s;
		reset();

	});

	document.getElementsByClassName("reset")[0].addEventListener("click",function(){	
		document.getElementById("player").innerHTML = "";
		document.getElementById("computer").innerHTML = "";
		playerWins = 0;
		computerWins = 0;
	});

var playerFirst = function(loc, coord){
	if(playerMove("X",parseInt(coord[0]),parseInt(coord[2])))
		{	    totalClicks++;

			loc.style.background = "rgba(17,119,51,0.6)";
			if(totalClicks == 5){
			 console.log("noMore");
 			 reset();
 			}
 			
 			else {
				difficulty ? computerAI("O") : computerEasy("O");
			console.log(difficulty);
				}
		}

} 


for(var i =0;i<9;i++)
{
    document.getElementsByClassName("col")[i].addEventListener("click",function(){
	if(this.style.background != "rgba(17,119,51,0.6)" && totalClicks <=5&&this.style.background!="rgba(255,81,0,0.6)")	{
		var coord = this.getAttribute("value");
		playerFirst(this, coord);
		

	}
	if(totalClicks > 0)
	{
		if(checkWin()[0] == "X"){
			playerWins++;
			alert(checkWin());
			document.getElementById("player").innerHTML = playerWins;
			reset();
		}
		else if(checkWin()[0] == "O"){
			computerWins++;
			alert(checkWin());
			document.getElementById("computer").innerHTML = computerWins;
			reset();
		}
	}
	});
}

});