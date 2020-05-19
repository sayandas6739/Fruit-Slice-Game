var playing = false;
var score;
var highscore = 0;
var step;
var trialleft;
var fruitdown;
var fruits = ["apple", "banana", "cherry", "grapes", "mango", "pear", "pineapple", "strawberry"];
$(function(){
    $("#startreset").click(function(){
        if(playing == true){
            location.reload();
        } else{
            playing = true;
            score = 0;
            trialleft = 3;
            $("#trialleft").show();
            $("#scorevalue").html(score);
            $("#startreset").html("Reset Game");
            $("#gameover").hide();
            $("#highscore").show();
            $("#highscorevalue").html(highscore);
            trialremaining();
            action();
        }
        
    });
    
function trialremaining(){
    $("#trialleft").empty();
    for(i=1; i<=trialleft; i++){
        $("#trialleft").append('<img src="images/heart.png" class="heart">');
        
    }
}  
  
 $("#fruit").mouseover(function(){
        
        score++;
        var updatescore = highscore; 
        if(score>updatescore){
            highscore++;  
            $("#highscorevalue").html(highscore);
        }
        
        $("#scorevalue").html(score);
        stopfalling();
        $("#fruit").hide("explode", 400);
        setTimeout(function(){
            action();
        }, 400);
        
});


    
function action(){
    $("#fruit").show();
    choosefruit();
    step = 1+Math.round(Math.random()*5);
    fruitdown = setInterval(function(){
        $("#fruit").css("top", $("#fruit").position().top+step);
         if($("#fruit").position().top > $("#display").height()){
            if(trialleft>1){
                trialleft--;
                $("#fruit").show();
                choosefruit();
                step = 1+Math.round(Math.random()*5);
                trialremaining();
                } else{
                    playing = false;
                    $("#gameover").show();
                    $("#trialleft").hide();
                    $("#gameover").html("<p>Game Over!</br>Your Score is: " + score + "</br>High score: " + highscore + "</p>");
                    $("#startreset").html("Start Game")
                    stopfalling();
                }
        }
    }, 10);
   
}


function choosefruit(){
    $("#fruit").attr({"src": "images/" + fruits[Math.round(Math.random()*7)] + ".png"});
    $("#fruit").css({
        'top': "-50px",
        'left': Math.round(Math.random()*300)
    });
}
    
function stopfalling(){
    clearInterval(fruitdown);
}
});