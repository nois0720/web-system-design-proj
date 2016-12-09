/**
 * Created by Nois on 2016. 12. 2..
 */
var cmdCode = {
    move: '1',
    turnLeft: '2'
}

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

var PC_posX_cell;
var PC_posY_cell;
var PC_posX = 0;
var PC_posY = 0;
var obstaclePosArr = new Array(); //obstacle position
var PC_angle = 0;
var PC_dir = Dir.up;

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
    PC_posX = cellWidth * PC_posX_cell;

    PC_posY = cellHeight * PC_posY_cell;
};

var intervalId;
var intervalList = [];

var commandList = document.getElementsByClassName('commandList');

function startLogic() {
    for (var i = 0, max = commandList.length; i < max; i++) {
        (function (cmdIndex) {
            setTimeout(function () {
                startCmdProcess(cmdIndex);
            }, 1000 * cmdIndex);

            setTimeout(function () {
                stopCmdProcess(cmdIndex);
            }, 1000 * (cmdIndex + 1));
        })(i);
    }
};

(function init() {
    parseLevel();
    startLogic();
})();

function startCmdProcess(index) {
    if (commandList[index].innerHTML == '1') {
        intervalId = setInterval(move, (1000 / 32));
    } else if (commandList[index].innerHTML == '2') {
        intervalId = setInterval(rotate, (1000 / 90));
    }

    intervalList.push(intervalId);
}

function stopCmdProcess(index) {
    clearInterval(intervalList[index]);
    if (commandList[index].innerHTML == cmdCode.move) {
        moveCount = 0;
    } else if (commandList[index].innerHTML == cmdCode.turnLeft) {
        rotateCount = 0;
        PC_dir = (PC_dir + 1) % 4;
    }
}

var moveCount = 0;

function move() {
    moveCount++;

    if (PC_dir == Dir.left)  PC_posX--;
    if (PC_dir == Dir.right) PC_posX++;
    if (PC_dir == Dir.up)  PC_posY--;
    if (PC_dir == Dir.down)  PC_posY++;

    draw();
}

var rotateCount = 0;

function rotate() {
    rotateCount++;

    if (rotateCount < 90) {
        PC_angle++;
        PC_angle %= 360;
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

function draw() {
    // Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw 8x8 Table
    context.drawImage(level_img, 0, 0, mapWidth, mapHeight);
    for (var i = 0; i < obstaclePosArr.length; i++) {
        context.drawImage(obstacle_img, obstaclePosArr[i].obs_posX * cellWidth + 1.5, obstaclePosArr[i].obs_posY * cellHeight + 1, 28, 28);
    }
    // Draw Main Character
    context.save();
    context.translate(PC_posX + cellWidth / 2, PC_posY + cellHeight / 2);
    context.rotate(PC_angle * Math.PI / 180);
    context.translate(-(PC_posX + cellWidth / 2), -(PC_posY + cellHeight / 2));
    context.drawImage(PC_img, PC_posX, PC_posY, 32, 32);
    context.restore();
}