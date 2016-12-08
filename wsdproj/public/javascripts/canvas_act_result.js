/**
 * Created by Nois on 2016. 12. 2..
 */
var gameObjectID = {
    none: 0,
    pc: 1,
    obstacle: 2,
    goal: 3
};
var temp;
var level = [
    [0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

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
var obstaclePosArr = new Array(); //obstacle position

var parseLevel = function () {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (level[i][j] == 1) {
                PC_posX_cell = j;
                PC_posY_cell = i;
            } else if (level[i][j] == 2) {
                var obs = {obs_posX: j, obs_posY: i};
                //console.log(obs.obs_posX + "  " + obs.obs_posY)
                obstaclePosArr.push(obs);
            } else {
                continue;
            }
        }
    }
};

parseLevel();

PC_posX = cellWidth * PC_posX_cell;
PC_posY = cellHeight * PC_posY_cell;


var PC_dir = Dir.up;
var PC_angle = 0;

var intervalId;
var commandList = document.getElementsByClassName('commandList');

(function () {
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
        console.log("set interval " + intervalId);
    } else if (commandList[index].innerHTML == '2') {
        intervalId = setInterval(rotate, (1000 / 90));
        console.log("set interval " + intervalId);
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
        console.log("clear interval " + intervalId);
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
        console.log("clear interval " + intervalId);
    }

    draw();
}

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var level_img = new Image();
var PC_img = new Image();
var obstacle_img = new Image();

level_img.src = "/images/testLevel_jpeg.jpg";
PC_img.src = "/images/PC.png";
obstacle_img.src = "/images/obstacle.png";

 //level_img.onload = function () {
 //    context.drawImage(level_img, 0, 0, mapWidth, mapHeight);
 //}
 //PC_img.onload = function () {
 //    context.drawImage(PC_img, PC_posX, PC_posY, cellWidth, cellHeight);
 //}


function draw() {
    // Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw 8x8 Table
    context.drawImage(level_img, 0, 0, mapWidth, mapHeight);
    for (var i = 0; i < obstaclePosArr.length; i++) {
        context.drawImage(obstacle_img, obstaclePosArr[i].obs_posX * cellWidth+1.5, obstaclePosArr[i].obs_posY * cellHeight+1, 28, 28);
    }
    // Draw Main Character
    context.save();
    context.translate(PC_posX + cellWidth / 2, PC_posY + cellHeight / 2);
    context.rotate(PC_angle * Math.PI / 180);
    context.translate(-(PC_posX + cellWidth / 2), -(PC_posY + cellHeight / 2));
    context.drawImage(PC_img, PC_posX, PC_posY, 32, 32);
    context.restore();
}