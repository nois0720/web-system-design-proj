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
    [0, 0, 2, 0, 0, 0, 0, 0],
    [0, 1, 2, 0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 0],
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

level_img.src = "/images/testLevel_jpeg.jpg";
PC_img.src = "/images/PC.png";
obstacle_img.src = "/images/obstacle.png";


var PC_posX_cell = 3;
var PC_posY_cell = 4;
var PC_posX = cellWidth * PC_posX_cell;
var PC_posY = cellHeight * PC_posY_cell;


var parseLevel = function(){

};


level_img.onload = function () {
    context.drawImage(level_img, 0, 0, 256, 256);
};
PC_img.onload = function () {
    context.drawImage(PC_img, PC_posX, PC_posY, cellWidth, cellHeight);
};
obstacle_img.onload = function(){
    for(var i=0;i<3;i++){
        context.drawImage(obstacle_img, 128,128, 30, 30);
        context.drawImage(obstacle_img, 160,128, 30, 30);
        context.drawImage(obstacle_img, 192,128, 30, 30);
    }
}
