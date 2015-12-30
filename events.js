//Event handler for button
var computeButton = document.getElementById("computeButton");
computeButton.addEventListener("click", function() {
	    var rawData = (document.getElementById("player-data").value);
//Seperate lines into own array
lineArr=rawData.split(/\r\n|\r|\n/);//Each player & their info==1 value in array
players={};
playerName=null;
//Seperate info for each player into arry
posAbbrevToFull={
	"1B":"First base",
	"2B":"Second base",
	"SS":"Shortstop",
	"3B":"Third base",
	"LF":"Left field",
	"CF":"Center field",
	"RF":"Right field",
	"DH":"Designated hitter",
	"PH":"Pinch hitter",
	"C":"Catcher"
};
var maxVorpFunc = function(positionsObject,budget){
    var results = {
        vorp:0,
        team:{}
    };
    var arrayOfPositions = Object.keys(positionsObject);
    var position = Object.keys(positionsObject).length-1;
    var firstPosition = arrayOfPositions[0];
    if(firstPosition){    
        var posObjCopy = {};
        for(var pos in positionsObject){
            posObjCopy[pos] = positionsObject[pos];
        } 
        delete posObjCopy[firstPosition];
        results = maxVorpFunc(posObjCopy,budget);
        for(var player in positionsObject[firstPosition]){
            //get player vorp and salary
            var playerName = positionsObject[firstPosition][player];
            var playerVorp = positionsObject[firstPosition][player].vorp;
            var playerSalary = positionsObject[firstPosition][player].salary;
            //check budget and vorp
            if(playerSalary <= budget && playerVorp > 0){
                var newBudget = budget - playerSalary;
                var resultsSoFar = maxVorpFunc(posObjCopy,newBudget);//add player to team and add player vorp to count
                resultsSoFar.vorp += playerVorp;
                resultsSoFar.team[player] = playerName;
                //resultsSoFar.team[playerName] = playerName;
                //compare vorp
                if(resultsSoFar.vorp > results.vorp){
                    results.vorp = resultsSoFar.vorp;
                    results.team = resultsSoFar.team;
                }     
            }
        }
    }return results;
};
for(var i=0;i<lineArr.length;i++){
    var playerInfoArr=lineArr[i].split("\t");
    //create object with key of player name
    playerName=playerInfoArr[0];
    if(playerInfoArr[2].length<=2){//if position is abbreviated (baseball prospectus)
    	playerInfoArr[2]=posAbbrevToFull[playerInfoArr[2]];
    }
    if(!(playerInfoArr[2] in players)){//if position is not in players object
    	players[playerInfoArr[2]]={};
    }
    var salAsNum;
    if(playerInfoArr[3].includes("$")){//convert salary from string to number
	    var removeSign = playerInfoArr[3].split(",").join('');
	    var removeCommas=removeSign.split("$").join('');
	    var salAsNum=Number(removeCommas);
	    //players[playerName].salary=salAsNum;
    }
    players[playerInfoArr[2]][playerName]={}
    players[playerInfoArr[2]][playerName].salary=salAsNum;//set salary 
    players[playerInfoArr[2]][playerName].vorp=Number(playerInfoArr[13]);//set vorp
}
var theBudget=Number(prompt("Please enter a budget amount",3000000));
//alert(JSON.stringify(players,null,4));
alert(JSON.stringify(maxVorpFunc(players,theBudget),null,4));
});
