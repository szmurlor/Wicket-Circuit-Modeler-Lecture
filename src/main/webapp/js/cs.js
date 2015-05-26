/**
 * Created by SZMURLOR on 19.05.15.
 */

var components = [];
var MM_SELECT = 1;
var MM_RESISTOR = 2;
var mouseMode = MM_RESISTOR;

$(document).ready( function() {
    init();
});

function init() {

    $('#schemat').mousedown( function (e) {
        x = getXFor(e, this);
        y = getYFor(e, this);

        switch (mouseMode) {
            case MM_RESISTOR:
                addComponent(x,y);
                redraw();
                break;
            case MM_SELECT:
                selectComponent(x,y);
                redraw();
                break;
        }
    } );

    redraw();
}

function selectComponent(x,y) {
    for (var i = 0; i < components.length; i++) {
        var c = components[i];
        if (c.x - 5 < x && x < c.x + 5 && c.y - 5 < y && y < c.y + 5 )
            c.selected = true;
        else
            c.selected = false;
    }
}

function getXFor(ev, el) {
    var ofx = 0;
    var p = el.offsetParent;
    while (p != null) {
        ofx = ofx + p.offsetLeft;
        p = p.offsetParent;
    }
    x = ev.pageX - el.offsetLeft - ofx;

    return x;
}

function getYFor(ev, el) {
    var ofy = 0;
    var p = el.offsetParent;
    while (p != null) {
        ofy = ofy + p.offsetTop;
        p = p.offsetParent;
    }
    y = ev.pageY - el.offsetTop - ofy;

    return y;
}

function addComponent(x,y) {
    components.push( {
       "x": x,
       "y": y,
       "selected": false
    });
}

function redraw() {
    var c = $('#schemat');
    var context = document.getElementById("schemat").getContext("2d");
    context.clearRect(0,0, context.canvas.width, context.canvas.height);

/*
    context.beginPath();
    context.moveTo(100,100);
    context.lineTo(120,120);
    context.closePath();
    context.stroke();
*/
    context.save();

    for (var i=0; i < components.length; i++) {
        context.beginPath();
        var c = components[i];

        if (c.selected == true) {
            context.strokeStyle = "red";
        } else {
            context.strokeStyle = "black";
        }
        context.moveTo(c.x-4, c.y-4);
        context.lineTo(c.x+8, c.y-4);
        context.lineTo(c.x+8, c.y+8);
        context.lineTo(c.x-4, c.y+8);
        context.lineTo(c.x-4, c.y-4);
        context.closePath();
        context.stroke();
        if (c.selected == true) {
            context.fillStyle = "red";
            context.fill();
        }
    }

    context.restore();

}
