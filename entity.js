var TeamColors = {
    1: "red",
    2: "yellow",
    3: "purple",
    4: "cyan"
};

function Entity(x, y, team, env, parent) {
    this.x = x;
    this.y = y;
    this.team = team;
    this.env = env;
    this.parent = parent;

    this.carrying = null;
    this.maxHealth = Math.random() * 100;
    this.health = this.maxHealth;

    this.strength = Math.random() * 20;

    this.path = [];
    this.target = null;
    this.busy = false;
    this.danger = false;

    this.carrying = null;
}

Entity.prototype.draw = function() {
    this.env.canvas.fillStyle = TeamColors[this.team];

    this.env.canvas.beginPath();
    this.env.canvas.arc(
            this.x * this.env.ww + this.env.ww / 2,
            this.y * this.env.hh + this.env.hh / 2,
            this.env.hh / 2, 2 * Math.PI, false);
    this.env.canvas.fill();
};

Entity.prototype.move = function () {
    if (this.health <= this.maxHealth / 2) {
        this.danger = true;
    }

    if (this.path.length === 0) {
        this.busy = false;
        this.parent.enqueueIdler(this);

        if (this.target) {
            if(this.env.map.tiles.get(this.target.x, this.target.y) === this.env.map.TileTypes['BRUSH']) {
                this.carrying = 'WOOD';
            }
            if(this.env.map.tiles.get(this.target.x, this.target.y) === this.env.map.TileTypes['WATER']) {
                this.carrying = 'WATER';
            }
        }

        return;
    }

    this.busy = true;

    var next = this.path.shift();
    this.x = next[0];
    this.y = next[1];
};


function Settlement(x, y, team, env) {
    this.x = x;
    this.y = y;
    this.team = team;
    this.env = env;

    this.resources = {
        "WATER": 0,
        "WOOD": 0
    };

    this.birthCountdown = 400;
    this.health = 400;
}

Settlement.prototype.canSpawn = function() {
    if (this.resources.WOOD>= 8 &&
        this.resources.WATER >= 8){
            this.resources.WOOD -= 8;
            this.resources.WATER -= 8;

            console.log("spawning!");
            return true;
    }
    return false;
};

Settlement.prototype.draw = function() {
    this.env.canvas.fillStyle = TeamColors[this.team];
    this.env.canvas.fillRect(this.x * this.env.ww - this.env.ww / 2,
            this.y * this.env.hh - this.env.hh / 2,
            this.env.ww * 2, this.env.hh * 2);
};

Settlement.prototype.dropOff = function (e) {
    assert(e.carrying !== null, "entity must be carrying something");
    assert(this.resources[e.carrying] !== undefined,
            "entity must be carrying something valid");

    this.resource[e.carrying] += 1;
    e.carrying = null;
};

Settlement.prototype.birth = function (e1, e2) {
    assert(this.food >= 10, "insufficient food for birth");
    assert(this.water >= 10, "insufficient water for birth");

    var e = new Entity(this.x, this.y, this.team, this.env);
    e.maxHealth = (e1.maxHealth + e2.maxHealth) / 2;
    e.health = e.maxHealth;
    e.strength = (e1.strength + e2.strength) / 2;
};

