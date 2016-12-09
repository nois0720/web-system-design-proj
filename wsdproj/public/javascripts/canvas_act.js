/**
 * Created by Nois on 2016. 12. 2..
 */

var gameObjectID = {
    none: 0,
    pc: 1,
    obstacle: 2,
    goal: 3
}

var level = [
    [0, 0, 2, 2, 0, 0, 0, 0],
    [0, 1, 0, 2, 0, 0, 0, 0],
    [0, 2, 2, 2, 0, 0, 0, 0],
    [3, 2, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var cellWidth = 32;
var cellHeight = 32;
var level_img = new Image();
var PC_img = new Image();
var obstacle_img = new Image();
var goal_img = new Image();

level_img.src = "/images/levelTable.png";
PC_img.src = "/images/PC.png";
obstacle_img.src = "/images/obstacle.png";
goal_img.src = "/images/flag.png";

var PC_posX_cell = 3;
var PC_posY_cell = 4;
var PC_posX = cellWidth * PC_posX_cell;
var PC_posY = cellHeight * PC_posY_cell;
var GOAL_posX;
var GOAL_posY;

var obstaclePosArr = new Array(); //obstacle position
var levelTable = document.getElementsByClassName('levelTable');

var parseLevel = function () {
    // for (var i = 0; i < 8; i++) {
    //     for (var j = 0; j < 8; j++) {
    //         level[i][j] = levelTable[i * 8 + j].innerHTML;
    //     }
    // }

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (level[i][j] == 1) {
                PC_posX_cell = j;
                PC_posY_cell = i;
            } else if (level[i][j] == 2) {
                var obs = {obs_posX: j, obs_posY: i};
                obstaclePosArr.push(obs);
            } else if (level[i][j] == 3) {
                GOAL_posX = j * cellWidth;
                GOAL_posY = i * cellHeight;
            } else {
                continue;
            }
        }
    }
};

parseLevel();

PC_posX = cellWidth * PC_posX_cell;
PC_posY = cellHeight * PC_posY_cell;

level_img.onload = function () {
    context.drawImage(level_img, 0, 0, 256, 256);
};
PC_img.onload = function () {
    context.drawImage(PC_img, PC_posX, PC_posY, cellWidth, cellHeight);
};
obstacle_img.onload = function () {
    for (var i = 0; i < obstaclePosArr.length; i++) {
        context.drawImage(obstacle_img, obstaclePosArr[i].obs_posX * cellWidth + 1.5, obstaclePosArr[i].obs_posY * cellHeight + 1, 28, 28);
    }
};
goal_img.onload = function () {
    context.drawImage(goal_img, GOAL_posX, GOAL_posY, cellWidth, cellHeight);
};
