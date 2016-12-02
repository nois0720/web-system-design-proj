/**
 * Created by Nois on 2016. 12. 2..
 */
var parentElement = "";
var isMove = false;

function allowDrop(ev) {
    ev.preventDefault();
}

function dragStart(ev) {
    if (ev.target.getAttribute("movable") === "true") {
        isMove = true;
    } else {
        isMove = false;
    }

    ev.dataTransfer.setData("Text", ev.target.id);
    parentElement = ev.target.parentElement;
}

function drop(ev) {
    ev.preventDefault();
    if (ev.target.className === "droptarget" && ev.target.getAttribute("droppable") === "true") {
        var id = ev.dataTransfer.getData("text");

        if (isMove) {
            ev.target.appendChild(parentElement.childNodes[0]);
        } else {
            var img = createImg(id);
            ev.target.appendChild(img);
        }

        ev.target.style.border = "1px solid black";
        ev.target.setAttribute("droppable", "false");

        if (parentElement.getAttribute("droppable") === "false") {
            parentElement.setAttribute("droppable", "true");
        }
    }
}

function dropDelete(ev) {
    ev.preventDefault();
    var id = ev.dataTransfer.getData("text");
    if (ev.target.className === "droptarget") {
        ev.target.removeChild(ev.target.childNodes[0]);
        ev.target.style.border = "1px solid black";
    }
}

function dragEnter(ev) {
    if (ev.target.className === "droptarget" && ev.target.getAttribute("droppable") === "true") {
        ev.target.style.border = "3px dotted red";
    }
}

function dragLeave(ev) {
    if (ev.target.className === "droptarget" && ev.target.getAttribute("droppable") === "true") {
        ev.target.style.border = "";
    }
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