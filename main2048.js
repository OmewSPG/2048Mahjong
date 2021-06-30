var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
    prepareForMoblie();
    newgame();
});

// 移动设备视口初始化
function prepareForMoblie(){

    if(documentWidth > 500){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid_container').css('width',gridContainerWidth - 2 * cellSpace);
    $('#grid_container').css('height',gridContainerWidth - 2 * cellSpace);
    $('#grid_container').css('padding',cellSpace);
    $('#grid_container').css('border-radius',0.02 * gridContainerWidth );

    $('.grid_cell').css('width',cellSideLength);
    $('.grid_cell').css('height',cellSideLength);
    $('.grid_cell').css('border-radius',0.02 * cellSideLength);
}

function newgame(){
    // 初始化网格
    init()

    // 随机两格生成数字
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for(var i=0 ; i < 4 ; i++)
        for(var j=0 ; j < 4 ; j++){

            var gridCell = $("#grid_cell_" + i + "_" + j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }

    // 初始化网格数值
    for(var i=0 ; i < 4 ; i++){
        board[i]=new Array();
        hasConflicted[i]=new Array();
        for(var j=0 ; j < 4 ; j++){
            board[i][j]=0;
            hasConflicted[i][j]=false;
        }
    }
    // 更新网格数值显示
    updateBoardView();
    score = 0;
    $('#alertbox').slideUp('fast');
    $('#alertbox').remove();
}

function updateBoardView(){

    $('.number_cell').remove();
    for(var i = 0 ; i < 4 ; i++){
        for(var j = 0 ; j < 4 ; j++){
            $("#grid_container").append('<div class="number_cell" id="number_cell_' + i + '_' + j +'"></div>')
            var theNumberCell = $('#number_cell_' + i + '_' + j);

            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + cellSideLength / 2);
                theNumberCell.css('left',getPosLeft(i,j) + cellSideLength / 2);
    
            }else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
    
                theNumberCell.css('background-image',getNumberBackgroundColor(board[i][j]))
                //theNumberCell.css('color',getNumberColor(board[i][j]))
                //theNumberCell.text(board[i][j])
    
            }

            hasConflicted[i][j] = false;
        }

        $('.number_cell').css('line-height',cellSideLength + 'px');
        $('.number_cell').css('font_size',0.6 * cellSideLength + 'px');
    }

}

function generateOneNumber(){
    if(nospace(board))
        return false;

    // 随机位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    while( times < 50 ){

        if(board[randx][randy]==0)
            break;
        
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));

        times++;
        
    }

    if(times == 50){
        for(var i = 0 ; i < 4 ; i++)
            for(var j = 0 ; j < 4 ; j++){
                if(board[i][j] == 0){
                    randx = i;
                    randy = j;
                }
            }
    }

    // 随机数字
    var randomNumber = Math.random() > 0.5 ? 2 : 4;

    // 显示
    board[randx][randy]=randomNumber;
    showNumberWithAnimation(randx,randy,randomNumber);

    return true;
}

$(document).keydown(function(event){

    switch(event.keyCode){
        case 37:  // left
            event.preventDefault();
            if(moveLeft()){
                setTimeout('generateOneNumber()',250);
                setTimeout('isgameover()',300);
            }
            break;
        case 38:  // up
            event.preventDefault();
            if(moveUp()){
                setTimeout('generateOneNumber()',250);
                setTimeout('isgameover()',300);
            }
            break;
        case 39:  // right
            event.preventDefault();
            if(moveRight()){
                setTimeout('generateOneNumber()',250);
                setTimeout('isgameover()',300);
            }
            break;
        case 40:  // down
            event.preventDefault();
            if(moveDown()){
                setTimeout('generateOneNumber()',250);
                setTimeout('isgameover()',300);
            }
            break;

        default:
            break;
    }
});

document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});


document.addEventListener('touchend',function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if(Math.abs(deltax) < 0.2*documentWidth && Math.abs(deltay) < 0.2*documentWidth){
        return;
    }

    //x
    if(Math.abs(deltax) >= Math.abs(deltay)){

        //moveRight
        if(deltax > 0){
            if(moveRight()){
                setTimeout('generateOneNumber()',250);
                setTimeout('isgameover()',300);
            }
        }

        //moveLeft
        else{
            if(moveLeft()){
                setTimeout('generateOneNumber()',250);
                setTimeout('isgameover()',300);
            }
        }

    }

    //y
    else{

        //moveDown
        if(deltay > 0){
            if(moveDown()){
                setTimeout('generateOneNumber()',250);
                setTimeout('isgameover()',300);
            }
        }

        //moveUp
        else{
            if(moveUp()){
                setTimeout('generateOneNumber()',250);
                setTimeout('isgameover()',300);
            }
        }

    }
});

function isgameover(){
    if(nospace(board)&&nomove(board)){
        setTimeout( 'gameover()',200);
    }
}

function gameover(){

    $("#grid_container").append("<div id='alertbox'><img src='pic/1.png'><div id='text'>GAME OVER</div></div>");
    $("#alertbox").slideDown('fast');

}

function moveLeft(){

    if(!canMoveLeft(board))
        return false;

    for(var i = 0 ; i < 4 ; i++)
        for(var j = 1 ; j < 4 ; j++){
            if(board[i][j]!=0){
                for(var k = 0 ; k < j ; k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
                        // move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                        // move
                        showMoveAnimation(i,j,i,k);
                        // add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        showScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }

    // setTimeout()函数设定时间间隔是为了等待动画完成
    setTimeout('updateBoardView()',200);
    console.log('it is worked.')
    return true;
}

function moveUp(){

    if(!canMoveUp(board))
        return false;     

    for(var i = 1 ; i < 4 ; i++)
        for(var j = 0 ; j < 4 ; j++){
            if(board[i][j]!=0){
                for(var k = 0 ; k < i ; k++){
                    if(board[k][j] == 0 && noBlockVertical(k,i,j,board)){
                        // move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(k,i,j,board) && !hasConflicted[k][j]){
                        // move
                        showMoveAnimation(i,j,k,j);
                        // add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        showScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout('updateBoardView()',200);
    console.log('it is worked.')
    return true;
}

function moveRight(){

    if(!canMoveRight(board))
        return false;

    for(var i = 0 ; i < 4 ; i++)
        for(var j = 2 ; j >= 0 ; j--){
            if(board[i][j]!=0){
                for(var k = 3 ; k > j ; k--){
                    if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
                        // move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
                        // move
                        showMoveAnimation(i,j,i,k);
                        // add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        showScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout('updateBoardView()',200);
    console.log('it is worked.')
    return true;
}

function moveDown(){

    if(!canMoveDown(board))
        return false;

    for(var i = 2 ; i >= 0 ; i--)
        for(var j = 0 ; j < 4 ; j++){
            if(board[i][j]!=0){
                for(var k = 3 ; k > i ; k--){
                    if(board[k][j] == 0 && noBlockVertical(i,k,j,board)){
                        // move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(i,k,j,board) && !hasConflicted[k][j]){
                        // move
                        showMoveAnimation(i,j,k,j);
                        // add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        showScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout('updateBoardView()',200);
    console.log('it is worked.')
    return true;
}



