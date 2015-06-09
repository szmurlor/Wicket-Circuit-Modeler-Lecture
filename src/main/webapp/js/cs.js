/**
 * Created by SZMURLOR on 19.05.15.
 */

var components = [];
var MM_SELECT = 1;
var MM_RESISTOR = 2;
var MM_CAPACITOR = 3;
var MM_INDUCTANCE = 4;

var mouseMode = MM_SELECT;
var lastX;
var lastY;
var mouseDown = false;
var tmpCon = null;

$(document).ready( function() {
    init();
});

function init() {

    $('#schemat').mouseleave( function (e) {
        mouseDown = false;
        tmpCon = null;
    });

    $('#schemat').mouseup( function (e) {
       mouseDown = false;
       tmpCon = null;
    });

    $('#schemat').mousedown( function (e) {
        x = getXFor(e, this);
        y = getYFor(e, this);
        mouseDown = true;
        lastX = x;
        lastY = y;

        switch (mouseMode) {
            case MM_RESISTOR:
                addComponent(x,y, MM_RESISTOR);
                redraw();
                break;
            case MM_SELECT:
                var hovered = findHoveredTerminal();

                if (hovered != null) {
                    startConnection(hovered);
                } else {
                    selectComponent(x, y);
                }
                redraw();
                break;
        }
    } );

    $('#schemat').mousemove( function (e) {
        x = getXFor(e, this);
        y = getYFor(e, this);

        if (mouseDown) {

            dx = x - lastX;
            dy = y - lastY;
            if (tmpCon != null) {
                tmpCon.end.moveBy(dx, dy);
            } else {
                moveSelectedBy(dx, dy);
            }
            lastX = x;
            lastY = y;

            redraw();
        } else {
            if (mouseMode == MM_SELECT) {
                hoverTerminals(x, y);
            }
        }
    } );

    redraw();
}

function startConnection(startTerminal) {
    tmpCon = new EConnection(startTerminal, new EmptyComponent(startTerminal.getX(), startTerminal.getY()).getTerminal(0) );
    redraw();
}

function findHoveredTerminal() {
    var hovered = null;
    components.forEach(function(it) {
        it.terminals.forEach(function(t){
            if (t.isInside(x,y))
                hovered = t;
        });
    });

    return hovered;
}

function hoverTerminals(x, y) {
    components.forEach(function(it) {
       it.terminals.forEach(function(t){
           if (t.isInside(x,y))
               t.hovered = true;
           else
               t.hovered = false;
       });
    });

    redraw();
}

function moveSelectedBy(dx,dy) {
    components.forEach(function(it) {
       if (it.selected) {
           it.x = it.x + dx;
           it.y = it.y + dy;
       }
    });
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

    components.forEach( z);

    if (tmpCon != null)
        tmpCon.paint(context);

    context.restore();
}

function deleteSelected() {
    var iselected = null;
    for (i = 0; i < components.length; i++) {
        if (components[i].selected) {
            iselected = i;
            break;
        }
    }


    if (iselected != null) {
        components.splice(iselected, 1);
    }

    redraw();
}

var EComponent = function(x, y, name, w, h) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.w = w;
    this.h = h;
    this.selected = false;

    this.terminals = [];
}

var Terminal = function(dx, dy, p) {
    this.dx = dx;
    this.dy = dy;
    this.p = p;
    this.hovered = false;
}

Terminal.prototype.isInside = function(x,y) {
    return this.p.x + this.dx - 5 < x && x < this.p.x + this.dx + 5
        && this.p.y + this.dy - 5 < y && y < this.p.y + this.dy + 5;
}

Terminal.prototype.getX = function() {
    return this.p.x + this.dx;
}

Terminal.prototype.getY = function() {
    return this.p.y + this.dy;
}

Terminal.prototype.moveBy = function(dx, dy) {
    this.p.x = this.p.x + dx;
    this.p.y = this.p.y + dy;
}

Terminal.prototype.paint = function(ctx) {
    ctx.beginPath();
    if (this.hovered)
        ctx.strokeStyle = "blue";
    else
        ctx.strokeStyle = "black";
    ctx.arc(this.p.x + this.dx, this.p.y + this.dy, 2, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    if (this.hovered) {
        ctx.fillStyle = "blue";
        ctx.fill();
    }
}

EComponent.prototype.getTerminal = function(i) {
    return this.terminals[i];
}

EComponent.prototype.isInside = function(x,y) {
    return (this.x - this.w < x && x < this.x + this.w && this.y - this.h < y && y < this.y + this.h);
}


EComponent.prototype.paint = function(ctx) {
    this.terminals.forEach( function(it) {
        it.paint(ctx);
    });
}

var EConnection = function( start, end ) {
    this.start = start;
    this.end = end;
    this.tmp = false;
}

EConnection.prototype.paint = function(ctx) {
    ctx.save();
    ctx.strokeStyle = (this.tmp == true ? "blue" : "black");

    ctx.beginPath();
    ctx.moveTo( start.getX(), start.getY() );
    ctx.lineTo( end.getX(), end.getY() );
    ctx.moveTo( start.getX(), start.getY() );
    ctx.closePath();

    ctx.stroke();
    ctx.restore();
}


var Resistor = function(x, y, name) {
    EComponent.call(this, x, y, name, 10, 5);
    this.terminals.push( new Terminal(-10,0, this) );
    this.terminals.push( new Terminal(10,0, this) );
}
Resistor.prototype = Object.create(EComponent.prototype);
Resistor.constructor = Resistor;

Resistor.prototype.paint = function(ctx) {
    EComponent.prototype.paint.call(this, ctx);

    if (this.selected == true) {
        ctx.strokeStyle = "red";
    } else {
        ctx.strokeStyle = "black";
    }
    ctx.beginPath();

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

}


var EmptyComponent = function(x, y, name) {
    EComponent.call(this, x, y, name, 3, 3);
    this.terminals.push( new Terminal(0,0, this) );
}
EmptyComponent.prototype = Object.create(EComponent.prototype);
EmptyComponent.constructor = EmptyComponent;
