var EntityManager = function (teamId, context) {
    this.teamId = teamId;
    this.context = context;
    this.env = context;
    this.entities = [];
    this.settlements = [];
    this.idlers = [];
    this.innerTargets = null;
};

EntityManager.prototype.findNearestSettlement = function (entity) {
    var i;
    var closest = this.settlements[0];
    for (i = 1; i < this.settlements.length; i++) {
        if (dist(entity, this.settlements[i]) < dist(entity, closest)) {
            closest = this.settlements[i];
        }
    }

    return closest;
};

EntityManager.prototype.isOnSettlement = function(entity) {
    var i;
    for (i = 0; i < this.settlements; i++) {
        var s = this.settlements[i];
        if (s.x === entity.x && s.y === entity.y) {
            return true;
        }
    }
    return false;
};

EntityManager.prototype.step = function() {
    var w = this.context.width;
    var h = this.context.height;

    if (this.innerTargets === null) {
        this.innerTargets = this.findTargets();
    }

    this.idlers.forEach(function(e){
        var needsPath = true;
        if(e.carrying !== null) {
            var sett = this.findNearestSettlement(e);
            if (e.x === sett.x && e.y === sett.y) {
                sett.resources[e.carrying] ++;
                e.carrying = null;
                needsPath = true;
            } else {
                e.path = path(e, sett);
                e.busy = true;
                return;
            }
        }

        var items = this.innerTargets;
        var pos = items[Math.floor(Math.random()*items.length)];
        e.path = path(e, pos);
        e.target = pos.target;
        e.busy = true;
    }.bind(this));

    this.idlers.length = 0;

    this.entities.forEach(function (e){
        e.move();
    }.bind(this));

    this.settlements.forEach(function (s){
        if (s.canSpawn()) {
            this.entities.push(new Entity(s.x, s.y, this.teamId, context, this));
        }
    }.bind(this));
};

EntityManager.prototype.draw = function() {
    this.entities.forEach(function(e) {
        e.draw();
    });

    this.settlements.forEach(function(s){
        s.draw();
    });

    /*
    this.innerTargets.forEach(function(t){
        var c = this.context.canvas;
        c.fillStyle = TeamColors[this.teamId];
        c.save();
        c.globalAlpha = 0.5;
        c.fillRect(t.x * this.env.ww,
            t.y * this.env.hh,
            this.env.ww,
            this.env.hh);
        c.restore();
    }.bind(this));
    */
};

EntityManager.prototype.enqueueIdler = function (e) {
    this.idlers.push(e);
};

EntityManager.prototype.findTargets = function (e) {
    var selected = false;
    var xMin, xMax, yMin, yMax;
    this.settlements.forEach(function(s) {
        if(!selected)  {
            xMin = s.x;
            xMax = s.x;
            yMin = s.y;
            yMax = s.y;
            selected = true;
        } else {
            if(s.x < xMin) { xMin = s.x; }
            if(s.x > xMax) { xMax = s.x; }
            if(s.y < yMin) { yMin = s.y; }
            if(s.y < yMax) { yMax = s.y; }
        }
    });

    var outshoot = Math.floor(this.env.map.w / 2.5);//25; this.env.map.w / 8;

    var startX = xMin - outshoot;
    var startY = yMin - outshoot;
    var endX   = xMax + outshoot;
    var endY   = yMax + outshoot;

    var targets = [];

    for(var i = startX; i < endX; i++) {
        if(!this.env.map.tiles.contains(i, 0)) {
            continue;
        }

        for(var k = startY; k < endY; k++) {
            if(!this.env.map.tiles.contains(i, k) ||
               !this.env.map.tiles.contains(i, k + 1) ||
               !this.env.map.tiles.contains(i, k - 1)) {
                continue;
            }

            var isValid = function (x) {
                return x == this.env.map.TileTypes.BRUSH ||
                       x == this.env.map.TileTypes.WATER;
            }.bind(this)

            var on = this.env.map.tiles.get(i, k);
            var above = this.env.map.tiles.get(i, k + 1);
            var below = this.env.map.tiles.get(i, k - 1);
            //assert(false, "" + i + ", " + k);
            if(isValid(on)) {
                if(!isValid(above)) {
                    targets.push({x: i, y: k + 1, target: {x: i, y: k}});
                }
                if(!isValid(below)) {
                    targets.push({x: i, y: k - 1, target: {x: i, y: k}});
                }
            }
        }
    }
    return targets;
};

EntityManager.prototype.findUnitsNear = function (pos, radius) {
    var units = [];
    this.entities.forEach(function (e){
        if (dist(pos, e) <= radius)  {
            units.push(e);
        }
    });
    return units;
}
