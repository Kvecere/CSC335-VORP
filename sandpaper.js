//max VORP code

//some code ideas
//assume there is access to the players object with player's name as the key.



var maxVorp = function(players,budget){
    
    
    
    for(index=0;index < players.length;index++){
        if(players[index].salary < budget){
            if(players[index].vorp > maxVorpSoFar){
                maxVorpSoFar = players[index].vorp;
                budget -= players[index].salary;
            }  
        
        }
    }
}

// maxVorp using recursion 

var maxVorp = function(players,budget)
    for player in players
    call maxVorp(players,budget - player's salary)
