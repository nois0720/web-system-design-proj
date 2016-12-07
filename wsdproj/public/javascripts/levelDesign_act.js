/**
 * Created by Nois on 2016. 12. 2..
 */
var States = {"copy": 0, "change": 1};

var parentElement = "";
var state;

function allowDrop(ev) {
    ev.preventDefault();
}

function dragStart(ev) {
    if (ev.target.getAttribute("movable") === "true") {
        console.log("set change");
        state = States.change;
    } else {
        console.log("set copy");
        state = States.copy;
    }

    ev.dataTransfer.setData("Text", ev.target.id);
    parentElement = ev.target.parentElement;
}

function drop(ev) {
    ev.preventDefault();
    if (ev.target.className === "levelDesignCell") {

        ev.target.style.border = "1px solid black";

        if (ev.target.getAttribute("droppable") === "true") {
            dropImg(ev);
        } else if (ev.target.getAttribute("changeable") === "true") {
            changeImg(ev);
        }
    }
}

function dropDelete(ev) {
    ev.preventDefault();
    if (ev.target.className === "levelDesignCell") {
        parentElement.removeChild(parentElement.childNodes[0]);
        ev.target.style.border = "1px solid black";
    }
    if (parentElement.getAttribute("droppable") === "false") {
        parentElement.setAttribute("droppable", "true");
    }
}

function dragEnter(ev) {
    if (ev.target.className === "levelDesignCell") {
        if (ev.target.getAttribute("droppable") === "true") {
            ev.target.style.border = "3px dotted red";
        } else if (ev.target.getAttribute("changeable") === "true") {
            ev.target.style.border = "3px dotted blue";
        }
    }
}

function dragLeave(ev) {
    if (ev.target.className === "levelDesignCell") {
        ev.target.style.border = "";
    }
}

function dropImg(ev) {
    var id = ev.dataTransfer.getData("text");

    if (state === States.change) {
        console.log("change");
        ev.target.appendChild(parentElement.childNodes[0]);
    } else {
        console.log("copy");
        var img = createImg(id);
        ev.target.appendChild(img);
    }

    ev.target.setAttribute("droppable", "false");
    ev.target.setAttribute("changeable", "true");

    if (state === States.change && parentElement.getAttribute("droppable") === "false") {
        parentElement.setAttribute("droppable", "true");
    }
}

function changeImg(ev) {
    if(state === States.copy) return;

    parentElement.appendChild(ev.target.childNodes[0]);
    ev.target.appendChild(parentElement.childNodes[0]);
}

function createImg(id) {
    var imgPath = "images/" + id + ".png";
    var img = document.createElement("IMG");

    img.setAttribute("id", id);
    img.setAttribute("src", imgPath);
    img.setAttribute("width", "32");
    img.setAttribute("height", "32");
    img.setAttribute("draggable", "true");
    img.setAttribute("ondragstart", "dragStart(event)");
    img.setAttribute("movable", "true");

    return img;
}

function createLevel(){
    //레벨 정보를 받아와서  DB에 저장함.
};