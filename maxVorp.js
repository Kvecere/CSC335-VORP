var maxVorp=function(players,budget){
    team={};
    for(var player in players){
        if(!(positionInTeam(players[player].position))){
            //if position is not already in the team
            if(players[player].salary<=budget&&players[player].vorp>0){
                //If we can afford the player and player doesn't have negative vorp.
                team[player]=players[player];
                budget-=players[player].salary;
            }
            //The else if below is a counter measure for when we find a player with
            //a higher vorp, can afford, and has a unique position. If you think this
            //is useless, try adding the following at the end of players.
            //"Ribbit":{"vorp":3000,"salary":3,"position":"spaghetti"}
            var playerMin=minVorpInTeam();
            else if(players[player].vorp>team[playerMin].vorp){
                //if the player's vorp is greater than someone else on the team.
                if(players[player].salary<=budget+team[playerMin].salary){
                    //if we can afford the player
                    budget+=team[playerMin].salary;
                    delete team[playerMin];
                    team[player]=players[player];
                    budget-=players[player].salary;
                }
            }
        }
        else{//position is on the team
            var teamPlayerWithSamePosition=positionInTeam(players[player].position,1);
            //stores the name of the player on team with the same position.
            console.log(teamPlayerWithSamePosition);
            if(players[player].vorp>=team[teamPlayerWithSamePosition].vorp){
                //if the player's vorp is greater than the one on the team.
                if(players[player].salary<=budget+team[teamPlayerWithSamePosition].salary){
                    //if the salary is greater than the budget+the team player's salary.
                    //replace the player.
                    budget+=team[teamPlayerWithSamePosition].salary;
                    delete team[teamPlayerWithSamePosition];
                    team[player]=players[player];
                    budget-=players[player].salary;
                }
            }
        }
    }
    return team;
};
function positionInTeam(value,getName){
    //value= the value you want to see is within the.
    //getName= if the value is found within position, return the player's name instead.
    getName=getName||0;
    for(var i in team){
        if(team[i].position===value&&getName===0){return true;}
        else if(team[i].position===value&&getName!==0){return i;}
    }
    return false;
}
function minVorpInTeam(){
    var lowestVorp=-Infinity;
    var lowestPlayer;
    for(var i in team){
        if(team[i].vorp>lowestVorp){
            lowestVorp=team[i].vorp;
            lowestPlayer=i;
        }
    }
    return lowestPlayer;
}
/* ----TEST DATA----
players={
    "Jake":{"vorp":40,"salary":500,"position":"2B"},
    "Bob":{"vorp":30,"salary":400,"position":"3B"},
    "Mark":{"vorp":50,"salary":600,"position":"2B"},
    "Ribbit":{"vorp":3000,"salary":3,"position":"spaghetti"}
    
};
maxVorp(players,1000);//Bob and Mark
*/
