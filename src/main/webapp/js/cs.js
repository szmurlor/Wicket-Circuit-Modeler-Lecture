/**
 * Created by SZMURLOR on 19.05.15.
 */

$(document).ready( function() {
    init();
});

function init() {
    var c = $('#schemat');
    var context = document.getElementById("schemat").getContext("2d");

    context.beginPath();
    context.moveTo(100,100);
    context.lineTo(120,120);
    context.closePath();
    context.stroke();
}
