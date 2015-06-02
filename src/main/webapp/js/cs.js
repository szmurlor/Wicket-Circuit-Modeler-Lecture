/**
 * Created by SZMURLOR on 19.05.15.
 */

var components = [];
var MM_SELECT = 1;
var MM_RESISTOR = 2;
var MM_CAPACITOR = 3;

var mouseMode = MM_SELECT;

$(document).ready( function() {
    init();
});

function init() {

    $('#schemat').mousedown( function (e) {
        x = getXFor(e, this);
        y = getYFor(e, this);

        switch (mouseMode) {
            case MM_RESISTOR:
                addComponent(x,y, MM_RESISTOR);
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
        if (c.isInside(x,y))
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

function addComponent(x,y, type) {
    switch (type) {
        case MM_RESISTOR:
            components.push( new Resistor(x,y, "Brak"));
            break;
    }
}

function redraw() {
    var c = $('#schemat');
    var context = document.getElementById("schemat").getContext("2d");
    context.clearRect(0,0, context.canvas.width, context.canvas.height);
    context.save();

    for (var i=0; i < components.length; i++) {
        var c = components[i];
        c.paint(context);
    }

    context.restore();
}

var Resistor = function(x, y, name) {
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 5;
    this.name = name;
    this.selected = false;
}

Resistor.prototype.isInside = function(x,y) {
    return (this.x - this.w < x && x < this.x + this.w && this.y - this.h < y && y < this.y + this.h);
}

Resistor.prototype.paint = function(ctx) {
    ctx.beginPath();

    if (this.selected == true) {
        ctx.strokeStyle = "red";
    } else {
        ctx.strokeStyle = "black";
    }

    ox = this.x-this.w;
    oy = this.y-0;
    h = this.h;
    ctx.moveTo(ox, oy);
    ctx.lineTo(ox+4, oy);
    ctx.lineTo(ox+6, oy-h);
    ctx.lineTo(ox+8, oy+h);
    ctx.lineTo(ox+10, oy-h);
    ctx.lineTo(ox+12, oy+h);
    ctx.lineTo(ox+14, oy-h);
    ctx.lineTo(ox+16, oy);
    ctx.lineTo(ox+20, oy);
    ctx.moveTo(ox,oy);
    ctx.closePath();
    ctx.stroke();
/*
    if (this.selected == true) {
        ctx.fillStyle = "red";
        ctx.fill();
    }
*/

}