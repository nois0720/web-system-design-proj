/**
 * Created by Nois on 2016. 12. 2..
 */
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var cellWidth = 32;
var cellHeight = 32;
var level_img = new Image();
var PC_img = new Image();
level_img.src = "/images/testLevel_jpeg.jpg";
PC_img.src = "/images/PC.png";


var PC_posX_cell = 3;
var PC_posY_cell = 4;
var PC_posX = cellWidth * PC_posX_cell;
var PC_posY = cellHeight * PC_posY_cell;
var PC_dir = 0; //up:0 , right:1, down:2, left:3

level_img.onload = function () {
    context.drawImage(level_img, 0, 0, 256, 256);
}
PC_img.onload = function () {
    context.drawImage(PC_img, PC_posX, PC_posY, 32, 32);
}



var commandList = document.getElementsByClassName('commandList');


//PC 움직이기


var angle = 0;
for(var k=0;k<commandList.length;k++){
    var cnt = 0;
    if(commandList[k].innerHTML=='1'){
        setInterval(move(cnt), 30);
    }else if(commandList[k].innerHTML=='2'){
        setInterval(rotate, 10);
    }
}

//setInterval(rotate, 10);
//setInterval(move, 30);


function move(cnt) {


    if (cnt < cellWidth && PC_dir == 1) PC_posX++
    if (cnt < cellWidth && PC_dir == 3) PC_posX--
    if (cnt < cellHeight && PC_dir == 0) PC_posY--;
    if (cnt < cellHeight && PC_dir == 2) PC_posY++;


    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(level_img, 0, 0, 256, 256);
    context.drawImage(PC_img, PC_posX, PC_posY, 32, 32);
    cnt++;
    console.log(cnt);
}
function rotate() {
    if (angle < 90) angle++;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(level_img, 0, 0, 256, 256);

    context.save();
    context.translate(PC_posX + cellWidth / 2, PC_posY + cellHeight / 2);
    context.rotate(angle * Math.PI / 180);
    context.translate(-(PC_posX + cellWidth / 2), -(PC_posY + cellHeight / 2));
    context.drawImage(PC_img, PC_posX, PC_posY, 32, 32);
    context.restore();

    PC_dir = (PC_dir + 1) % 4; //direction 변경해줌 - 시계방향
}