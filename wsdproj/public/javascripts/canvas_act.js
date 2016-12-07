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