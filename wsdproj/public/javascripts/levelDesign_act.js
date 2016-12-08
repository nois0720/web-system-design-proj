/**
 * Created by Nois on 2016. 12. 2..
 */
var States = {"origin": 0, "copy": 1};
var dropAreaStates = {"clear": "clear", "full": "full"};

var parentElement = "";
var state;


function allowDrop(ev) {
    ev.preventDefault();
}

function dragStart(ev) {
    if (ev.target.className === "origin") {
        state = States.origin;
    } else {
        state = States.copy;
    }

    ev.dataTransfer.setData("Text", ev.target.id);
    parentElement = ev.target.parentElement;
}

function drop(ev) {
    ev.preventDefault();
    var areaState = ev.target.getAttribute("areastate");
    if (areaState === dropAreaStates.clear) {
        dropImg(ev);
    } else if (areaState === dropAreaStates.full) {
        if (state === States.copy) {
            changeImg(ev);
        }
    }
}

function dropDelete(ev) {
    ev.preventDefault();
    if (ev.target.className === "droptarget") {
        parentElement.removeChild(parentElement.childNodes[0]);
        ev.target.style.border = "1px solid black";
        if (parentElement.getAttribute("areastate") === dropAreaStates.full) {
            parentElement.setAttribute("areastate", dropAreaStates.clear);
        }
    }

}

function dragEnter(ev) {
    if (ev.target.className !== "levelDesignCell") return;

    var areaState = ev.target.getAttribute("areastate");

    console.log(areaState);
    if (areaState === dropAreaStates.clear) {
        ev.target.style.border = "1px dotted red";
    } else if (areaState === dropAreaStates.full) {
        if (state === States.copy) {
            ev.target.style.border = "1px dotted green";
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

    if (state === States.copy) {
        ev.target.appendChild(parentElement.childNodes[0]);
    } else {
        var img = createImg(id);
        ev.target.appendChild(img);
    }

    ev.target.setAttribute("areastate", dropAreaStates.full);
    ev.target.style.border = "1px solid black";
}

function changeImg(ev) {
    if (state !== States.copy) {
        return;
    }

    parentElement.appendChild(ev.target.childNodes[0]);
    ev.target.appendChild(parentElement.childNodes[0]);
    ev.target.style.border = "1px solid black";
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

    return img;
}

function createLevel(){
    //레벨 정보를 받아와서  DB에 저장함.
};
