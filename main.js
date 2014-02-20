
var ce = document.querySelector("canvas");
var canvas = ce.getContext("2d");

ce.width = 1000;
ce.height = 1000;

var factor = 10;

var map = new Map(ce.width / factor,
                  ce.height / factor,
                  factor, factor, canvas);

var entityManagers = [];

var context = {map: map, canvas: canvas, width: map.tiles.width, height: map.tiles.height, ww: factor, hh: factor};

var loop = function () {

    map.draw();
    entityManagers.forEach(function (em){
        em.step();
        em.draw();
    });

    window.requestAnimationFrame(loop);
}.bind(this);

loop();

entityManagers.push(new EntityManager(context));

for (var i = 0; i < 20; i++){
    var e = new Entity(4, 4, 1, context);
    entityManagers[0].entities.push(e);
}

var s = new Settlement(10, 10, 2, context);
entityManagers[0].settlements.push(s);
