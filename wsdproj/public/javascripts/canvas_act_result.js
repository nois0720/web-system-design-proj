/**
 * Created by Nois on 2016. 12. 2..
 */
var Dir = {
    up: 0,
    right: 1,
    down: 2,
    left: 3
};

var mapWidth = 256;
var mapHeight = 256;
var cellWidth = 32;
var cellHeight = 32;

var PC_posX_cell = 3;
var PC_posY_cell = 4;
var PC_posX = cellWidth * PC_posX_cell;
var PC_posY = cellHeight * PC_posY_cell;
var PC_dir = Dir.up;
var PC_angle = 0;

var intervalId;
var commandList = document.getElementsByClassName('commandList');

(function () {
    //console.log('canvas처리코드에서 받음 길이' + commandList.length);
    for (var i = 0, max = commandList.length; i < max; i++) {
        (function (cmdIndex) {
            setTimeout(function () {
                cmdProcess(cmdIndex);
            }, 1000 * cmdIndex);
        })(i);
    }
})();

function cmdProcess(index) {
    if (commandList[index].innerHTML == '1') {
        intervalId = setInterval(move, (1000 / 32));
    } else if (commandList[index].innerHTML == '2') {
        intervalId = setInterval(rotate, (1000 / 90));
    }
}

var moveCount = 0;

function move() {
    moveCount++;

    if (PC_dir == Dir.left)  PC_posX--;
    if (PC_dir == Dir.right) PC_posX++;
    if (PC_dir == Dir.up)  PC_posY--;
    if (PC_dir == Dir.down)  PC_posY++;

    if (moveCount == cellWidth - 1) {
        moveCount = 0;
        clearInterval(intervalId);
    }

    draw();
}

var rotateCount = 0;

function rotate() {
    rotateCount++;

    if (rotateCount < 90) {
        PC_angle++;
        PC_angle %= 360;
    } else {
        clearInterval(intervalId);
        rotateCount = 0;
        PC_dir = (PC_dir + 1) % 4;
    }

    draw();
}

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var level_img = new Image();
var PC_img = new Image();

level_img.src = "/images/testLevel_jpeg.jpg";
PC_img.src = "/images/PC.png";
level_img.onload = function () {
    context.drawImage(level_img, 0, 0, mapWidth, mapHeight);
}
PC_img.onload = function () {
    context.drawImage(PC_img, PC_posX, PC_posY, cellWidth, cellHeight);
}

function draw() {
    // Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw 8x8 Table
    context.drawImage(level_img, 0, 0, mapWidth, mapHeight);

    // Draw Main Character
    context.save();
    context.translate(PC_posX + cellWidth / 2, PC_posY + cellHeight / 2);
    context.rotate(PC_angle * Math.PI / 180);
    context.translate(-(PC_posX + cellWidth / 2), -(PC_posY + cellHeight / 2));
    context.drawImage(PC_img, PC_posX, PC_posY, 32, 32);
    context.restore();
}