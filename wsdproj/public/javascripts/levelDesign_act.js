/**
 * Created by Nois on 2016. 12. 2..
 */
var States = {"origin": 0, "copy": 1};
var dropAreaStates = {"clear": "clear", "full": "full"};

var parentElement = "";
var state;


function allowDrop(ev) {
    ev.preventDefault();
};

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
    if (areaState === dropAreaStates.clear) {
        ev.target.style.border = "1px dotted red";
    } else if (areaState === dropAreaStates.full) {
        if (state === States.copy) {
            ev.target.style.border = "1px dotted green";
        }
    }
};

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
    var imgPath = "/images/" + id + ".png";
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
    var formElement = document.getElementById('_form');
    var level_arr = [0];
    var cellArea = document.getElementById('levelDesignMain');

    var k=0;
    for(var i=0;i<143;i++){
        if(i%2==0 || i==17 || i== 35 || i== 53 || i== 71 || i==89 || i==107 || i==125) continue;
            if (cellArea.childNodes[i].childNodes[0] && cellArea.childNodes[i].childNodes[0].getAttribute('id') == 'PC') {
                level_arr[k] = 1;
            } else if (cellArea.childNodes[i].childNodes[0] && cellArea.childNodes[i].childNodes[0].getAttribute('id') == 'obstacle') {
                level_arr[k] = 2;
            } else if (cellArea.childNodes[i].childNodes[0] && cellArea.childNodes[i].childNodes[0].getAttribute('id') == 'flag') {
                level_arr[k] = 3;
            } else {
                level_arr[k] = 0;
            }
            k++;
    }


    var el;
    for (var i = 0; i < level_arr.length; i++) {
        el = document.createElement("input");
        el.type = "hidden";
        el.name = "level_arr";
        el.value = level_arr[i];
        formElement.appendChild(el);
    }

    formElement.submit();
}



