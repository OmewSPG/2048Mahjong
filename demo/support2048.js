documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i,j){
    return cellSpace + i*(cellSpace + cellSideLength);
}

function getPosLeft(i,j){
    return cellSpace + j*(cellSpace + cellSideLength);
}

function getNumberBackgroundColor(number){
    switch(number){
        case 2:
            return "url(pic/1.png)";
            break;
        case 4:
            return "url(pic/2.png)";
            break;
        case 8:
            return "url(pic/3.png)";
            break;
        case 16:
            return "url(pic/4.png)";
            break;
        case 32:
            return "url(pic/5.png)";
            break;
        case 64:
            return "url(pic/6.png)";
            break;
        case 128:
            return "url(pic/7.png)";
            break;
        case 256:
            return "url(pic/8.png)";
            break;
        case 512:
            return "url(pic/9.png)";
            break;
        case 1024:
            return "url(pic/10.png)";
            break;
        case 2048:
            return "url(pic/11.png)";
            break;
        case 4096:
            return "url(pic/12.png)";
            break;
        case 8192:
            return "url(pic/13.png)";
            break;
    }

    return "black";
}

/*
function getNumberColor(number){
    if(number <= 4)
        return "#776e65";

    return "white";
}
*/

function nospace(board){

    for(var i = 0 ; i < 4 ; i++)
        for(var j = 0 ; j < 4 ; j++)
            if(board[i][j]==0)
                return false;
    
    return true;
}

function canMoveLeft(board){

    for(var i = 0 ; i < 4 ; i++)
        for(var j = 1 ; j < 4 ; j++)
            if(board[i][j]!=0)
                if(board[i][j-1]==0 || board[i][j-1]==board[i][j])
                    return true;
    
    return false;
}

function canMoveUp(board){

    for(var i = 1 ; i < 4 ; i++)
        for(var j = 0 ; j < 4 ; j++)
            if(board[i][j]!=0)
                if(board[i-1][j]==0 || board[i-1][j]==board[i][j])
                    return true;
    
    return false;
}

function canMoveRight(board){

    for(var i = 0 ; i < 4 ; i++)
        for(var j = 0 ; j < 3 ; j++)
            if(board[i][j]!=0)
                if(board[i][j+1]==0 || board[i][j+1]==board[i][j])
                    return true;
    
    return false;
}

function canMoveDown(board){

    for(var i = 0 ; i < 3 ; i++)
        for(var j = 0 ; j < 4 ; j++)
            if(board[i][j]!=0)
                if(board[i+1][j]==0 || board[i+1][j]==board[i][j])
                    return true;
    
    return false;
}

function noBlockHorizontal(row,col1,col2,board){
    for(var i = col1 + 1 ; i < col2 ; i++)
        if(board[row][i] != 0)
            return false;
    return true;

}

function noBlockVertical(row1,row2,col,board){
    for(var i = row1 + 1 ; i < row2 ; i++)
        if(board[i][col] != 0)
            return false;
    return true;

}

function nomove(){
    if( canMoveLeft(board)||
        canMoveUp(board)||
        canMoveRight(board)||
        canMoveDown(board))
        return false;

    return true;
}


