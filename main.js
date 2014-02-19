
var ce = document.querySelector("canvas");
var canvas = ce.getContext("2d");

ce.width = 1000;
ce.height = 1000;

var factor = 10;

var map = new Map(ce.width / factor,
                  ce.height / factor,
                  factor, factor, canvas);

var entities = [];
var settlements = [];

var loop = function () {

    map.draw();
    entities.forEach(function (e) {
        e.draw();
    });
    settlements.forEach(function (s) {
        s.draw();
    });

    requestAnimationFrame(loop);
}.bind(this);

loop();

var e = new Entity(4, 4, 1, {canvas: canvas, ww: factor, hh: factor});
entities.push(e);

var s = new Settlement(10, 10, 2, {canvas: canvas, ww: factor, hh: factor});
entities.push(s);
