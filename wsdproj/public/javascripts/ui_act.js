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
    if (ev.target.className === "droptarget") {

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
    if (ev.target.className === "droptarget") {
        parentElement.removeChild(parentElement.childNodes[0]);
        ev.target.style.border = "1px solid black";
    }
    if (parentElement.getAttribute("droppable") === "false") {
        parentElement.setAttribute("droppable", "true");
    }
}

function dragEnter(ev) {
    if (ev.target.className === "droptarget") {
        if (ev.target.getAttribute("droppable") === "true") {
            ev.target.style.border = "3px dotted red";
        } else if (ev.target.getAttribute("changeable") === "true") {
            ev.target.style.border = "3px dotted blue";
        }
    }
}

function dragLeave(ev) {
    if (ev.target.className === "droptarget") {
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
    img.setAttribute("width", "64");
    img.setAttribute("height", "64");
    img.setAttribute("draggable", "true");
    img.setAttribute("ondragstart", "dragStart(event)");
    img.setAttribute("movable", "true");

    return img;
}

function getAnswer() {
    var formElement = document.getElementsByTagName('form')[0];
    var answerElement = document.getElementById('sidebar2');
    var answerDiv = document.getElementsByClassName('droptarget');

    var al_no = new Array();

    for (var i = 0; i < answerDiv.length; i++) {
        if (answerDiv[i].hasChildNodes()) {
            if (answerDiv[i].childNodes[0].getAttribute('id') == 'arrow') {
                al_no.push(1);
            } else if (answerDiv[i].childNodes[0].getAttribute('id') == 'rotate') {
                al_no.push(2);
            }
        } else {
            continue;
        }

    }

    var el;
    for (var i = 0; i < al_no.length; i++) {
        el = document.createElement("input");
        el.type = "hidden";
        el.name = "test_array";
        el.value = al_no[i];
        formElement.appendChild(el);
    }
    formElement.submit();
    return false;
    //return document.getElementById("sidebar2");
}