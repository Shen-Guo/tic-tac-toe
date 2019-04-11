

var elements=document.querySelectorAll('.element');
var resetBtn=document.querySelector('.reset-btn')
var winningCombinations=[[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]];
var winningMatch=[];
var isPlayer1=true;//pink-bear
var player1Score=0;
var player2Score=0;
var winner;
var isWinning=false;

var resetGame=function(){
    elements.forEach(function(element){
        element.classList.remove('blue-bear');
        element.classList.remove('pink-bear');
        element.classList.remove('clicked');
        element.classList.remove('animated','shake');
        isWinning=false;
        isWinning=false;
        winner=null;
        document.querySelector('.display-result').textContent='';
        winningMatch=[];
    })
    
}
// var newGame=function(){

// }



var handleClk=function(event){
    
    if(!isWinning){
        if(!event.target.classList.contains('clicked')){

            if(isPlayer1){
                event.target.classList.add('pink-bear');
                event.target.classList.add('clicked');
                isPlayer1=false;
            }
            else{//player2
                event.target.classList.add('blue-bear');
                event.target.classList.add('clicked');
                isPlayer1=true;
            }
        }
        
        checkForWinner();
        checkForDraw();
    }
  
}

var getIdsByClassName=function(className){
    var items=document.querySelectorAll(className);
    var ids=[];
    items.forEach(function(item){
        ids.push(Number(item.dataset.id));
    })
    return ids
}

var check=function(ids,playerName){
    for (var i=0;i<winningCombinations.length;i++){
        var counter=0;
        var win =winningCombinations[i];
        win.forEach(function(num){
            if(ids.includes(num)){
                counter++; 
                

            } 
        });
       
        if(counter===3){
            console.log('winner');
            isWinning=true;
            winner=playerName;
            showWinner(winner);
            win.forEach(function(num){
                winningMatch.push(num);
                highlightWiningDiv(winningMatch);
                getHighestScore(player1Score,player2Score);
            })
            
           
            break;
        }
       
    }
}
var checkForWinner=function(){
    
    var pinkBearIds=getIdsByClassName('.pink-bear');
    var blueBearIds=getIdsByClassName('.blue-bear')
    check(pinkBearIds,1);
    check(blueBearIds,2);

    
    // for (var i=0;i<winningCombinations.length;i++){
    //     var counter=0;
    //     var win =winningCombinations[i];
    //     win.forEach(function(num){
    //         if(pinkBearIds.includes(num)){
    //             counter++; 
    //         } 
    //     });
       
    //     if(counter===3){
    //         console.log('winner');
    //         break;
    //     }
       
    // }
      
}
var checkForDraw=function(){
    if(document.querySelectorAll('.clicked').length===document.querySelectorAll('.element').length&&(!isWinning)){
        console.log('draw')
        document.querySelector('.display-result').textContent='Draw';

    }
}
var highlightWiningDiv=function(match){
    match.forEach(function(num){
        for(var i=0;i<elements.length;i++){
            if(elements[i].dataset.id==num){
                elements[i].classList.add('animated', 'shake')
            }
        }
        

    })

}

var showWinner=function(name){
    console.log('the winner is player'+name);
    document.querySelector('.display-result').textContent='the winner is player'+name;
    if(name===1){
        player1Score++;
        document.querySelector('.player1-score').textContent=player1Score;
    }else if(name===2){
        player2Score++;
        document.querySelector('.player2-score').textContent=player2Score;

    }
}
var getHighestScore=function(score1,score2){
    if(score1>=score2){
        document.querySelector('.highest-score').textContent=score1;
    }else{
        document.querySelector('.highest-score').textContent=score2;
    }

}

elements.forEach(function(element){
    element.addEventListener('click',handleClk)
})
resetBtn.addEventListener('click',resetGame);