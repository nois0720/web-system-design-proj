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

    var dropTargetList = document.getElementsByClassName('droptarget');
    var imgBlockCount = 0;
    for (var i = 0; i < dropTargetList.length; i++) {
        if (dropTargetList[i].hasChildNodes()) {
            imgBlockCount++;
        }
    }

    if (imgBlockCount > dropTargetList.length - 3) {

        var newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'droptarget');
        newDiv.setAttribute('ondragenter', 'dragEnter(event)');
        newDiv.setAttribute('ondragleave', 'dragLeave(event)');
        newDiv.setAttribute('ondrop', 'drop(event)');
        newDiv.setAttribute('ondragover', 'allowDrop(event)');
        newDiv.setAttribute('areastate', 'clear');
        document.getElementById('sidebar2').appendChild(newDiv);
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
    if (ev.target.className !== "droptarget") return;

    var areaState = ev.target.getAttribute("areastate");
    if (areaState === dropAreaStates.clear) {
        ev.target.style.border = "3px dotted red";
    } else if (areaState === dropAreaStates.full) {
        if (state === States.copy) {
            ev.target.style.border = "3px dotted green";
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
    var imgPath = "/images/" + id + ".png";
    var img = document.createElement("IMG");

    img.setAttribute("id", id);
    img.setAttribute("src", imgPath);
    img.setAttribute("width", "64");
    img.setAttribute("height", "64");
    img.setAttribute("draggable", "true");
    img.setAttribute("ondragstart", "dragStart(event)");

    return img;
}

function getAnswer() {
    var formElement = document.getElementById('submitAnswer');
    var answerDiv = document.getElementsByClassName('droptarget');

    var al_no = new Array();

    for (var i = 0; i < answerDiv.length; i++) {
        if (answerDiv[i].hasChildNodes()) {
            if (answerDiv[i].childNodes[0].getAttribute('id') == 'arrow') {
                al_no.push(1);
            } else if (answerDiv[i].childNodes[0].getAttribute('id') == 'rotate') {
                al_no.push(2);
            } else if (answerDiv[i].childNodes[0].getAttribute('id') == 'rotate2') {
                al_no.push(3);
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
    formElement.setAttribute('action', '/game');
    formElement.submit();
    return false;
}