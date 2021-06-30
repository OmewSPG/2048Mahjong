

function showNumberWithAnimation(i,j,randomNumber){

    var numberCell = $('#number_cell_' + i + '_' + j);

    numberCell.css('background-image',getNumberBackgroundColor(randomNumber));
    //numberCell.css('color',getNumberColor(randomNumber));
    //numberCell.text(randomNumber);

    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50)

}

function showMoveAnimation(fromx,fromy,tox,toy){
    
    var numberCell = $('#number_cell_' + fromx + '_' + fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}

function showScore(score){
    $('#score').fadeOut(60);
    setTimeout(function(){$('#score').text(score)},80);
    $('#score').fadeIn(60);
}
