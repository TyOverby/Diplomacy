var EntityManager = function (context) {
    this.context = context;
    this.entities = [];
    this.settlements = [];
};

EntityManager.prototype.findNearestSettlement = function (entity) {
    var i;
    var closest = this.settlements[0];
    for (i = 1; i < this.settlements; i++)    {
        if (dist(entity, this.settlements[i]) < dist(entity, closest)) {
            closest = this.settlements[i];
        }
    }

    return closest;
};

EntityManager.prototype.step = function() {
    var w = this.context.width;
    var h = this.context.height;

    this.entities.forEach(function (e){
        if (!e.busy) {
            e.path = path(e, {x: Math.random() * w, y: Math.random() * h});
            console.log(e.path.pop());
            e.busy = true;
        } else {
            e.move();
        }
    });

    this.settlements.forEach(function (s){

    });
}

EntityManager.prototype.draw = function() {
    this.entities.forEach(function(e) {
        e.draw();
    });
    this.settlements.forEach(function(s){
        s.draw();
    });
}
