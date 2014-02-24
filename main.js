
var ce = document.querySelector("canvas");
var canvas = ce.getContext("2d");

ce.width = 1000;
ce.height = 1000;

var factor = 10;

var map = new Map(ce.width / factor,
                  ce.height / factor,
                  factor, factor, canvas);

var entityManagers = [];

var context = {
    map: map,
    canvas: canvas,
    width: map.tiles.width,
    height: map.tiles.height,
    ww: factor,
    hh: factor,
    entityManagers: entityManagers
};

var loop = function () {
    map.draw();
    entityManagers.forEach(function (em){
        em.step();
        em.draw();
    });

    window.requestAnimationFrame(loop);
}.bind(this);

loop();

var positions = {
    1: [10, 10],
    2: [context.width - 10, 10],
    3: [10, context.height - 10],
    4: [context.width - 10, context.height - 10]
};

var i;
for (i = 1; i <= 4; i++) {
    var em = new EntityManager(i, context);
    var pos = positions[i];
    var s = new Settlement(pos[0], pos[1], i, context);
    s.resources['WATER'] = 8 * 10;
    s.resources['WOOD'] = 8 * 10;
    em.settlements.push(s);
    entityManagers.push(em);
}
var s = new Settlement(context.width / 2, context.height / 2, 4, context);
entityManagers[entityManagers.length - 1].settlements.push(s);
