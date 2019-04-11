

var elements=document.querySelectorAll('.element');
var startBtn=document.querySelector('.start-btn');
var resetBtn=document.querySelector('.reset-btn');
// var winningCombinations=[[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]];
var winningCombinations=[];
var winningMatch=[];
var isPlayer1=true;
var player1Score=0;
var player2Score=0;
var winner;
var isWinning=false;
var player1Name=document.querySelector('.player1-name');
var player2Name=document.querySelector('.player2-name');




var newGame=function(){
    elements.forEach(function(element){
        element.classList.remove('hide');
        element.classList.add('animated','bounceIn');
    
    })

}

var resetGame=function(){
    elements.forEach(function(element){
        element.classList.remove('blue-bear');
        element.classList.remove('pink-bear');
        element.classList.remove('clicked');
        element.classList.remove('animated','shake');
        isWinning=false;
        
        winner=null;
        document.querySelector('.display-result').textContent='';
        winningMatch=[];
        player1Name.value='Player1';
        player2Name.value='Player2';
    })
    
}

var generateWinningCombinations=function(num){
    size =num*num;
    var win=[];
    // in the same row
    for (var i=1;i<=size;i++){
        win.push(i);
        if(i%num===0){
            winningCombinations.push(win);
            win=[];
        }
    }
    //in the same column
    for (var i=1;i<=num;i++){
        win=[];
        for(j=0;j<num;j++)
        win.push(i+num*j);
       
        winningCombinations.push(win);
    }

    // cross
    win=[];
    for (i=0;i<num;i++){
        win.push(1+(num+1)*i);
        if(win.length===num){
            winningCombinations.push(win);
            win=[];
        }

    }
    for (i=0;i<num;i++){
        win.push(num+(num-1)*i);
        if(win.length===num){
            winningCombinations.push(win);
            win=[];
        }

    }

}


var handleClk=function(event){
    
    
    if(!isWinning){
        if(!event.target.classList.contains('clicked')){
            var mySound = new Audio('Button_Push-Mike_Koenig-1659525069.mp3');
            mySound.play();
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
    check(pinkBearIds,player1Name.value);
    check(blueBearIds,player2Name.value);

    
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
                elements[i].classList.remove('animated','bounceIn');
                elements[i].classList.add('animated','shake');
            }
        }
        

    })

}

var showWinner=function(name){
    console.log('The winner is  '+name);
    
    document.querySelector('.display-result').textContent='The winner is '+name;

    
    if(name===player1Name.value){
        player1Score++;
        document.querySelector('.player1-score').textContent=player1Score;
    }else if(name===player2Name.value){
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
generateWinningCombinations(3);

elements.forEach(function(element){
    element.addEventListener('click',handleClk)
})
startBtn.addEventListener('click',newGame);
resetBtn.addEventListener('click',resetGame);