/**
 * Created by SZMURLOR on 19.05.15.
 */

var components = [];

$(document).ready( function() {
    init();
});

function init() {

    $('#schemat').mousedown( function (e) {
        var ofx = 0;
        var ofy = 0;
        var p = this.offsetParent;
        while (p != null) {
            ofx = ofx + p.offsetLeft;
            ofy = ofy + p.offsetTop;
            p = p.offsetParent;
        }
        x = e.pageX - this.offsetLeft - ofx;
        y = e.pageY - this.offsetTop - ofy;

        addComponent(x,y);
        redraw();
    } );

    redraw();
}

function addComponent(x,y) {
    components.push( {
       "x": x,
       "y": y
    });
}

function redraw() {
    var c = $('#schemat');
    var context = document.getElementById("schemat").getContext("2d");

/*
    context.beginPath();
    context.moveTo(100,100);
    context.lineTo(120,120);
    context.closePath();
    context.stroke();
*/
    context.beginPath();
    for (var i=0; i < components.length; i++) {
        var c = components[i];
        context.moveTo(c.x-4, c.y-4);
        context.lineTo(c.x+8, c.y-4);
        context.lineTo(c.x+8, c.y+8);
        context.lineTo(c.x-4, c.y+8);
        context.lineTo(c.x-4, c.y-4);
    }
    context.closePath();
    context.stroke();

}
