
var TeamColors = {
    1: "red",
    2: "yellow",
    3: "purple",
    4: "cyan"
};

function Entity(x, y, team, env) {
    this.x = x;
    this.y = y;
    this.team = team;
    this.env = env;

    this.carrying = null;
    this.maxHealth = Math.random() * 100;
    this.health = this.maxHealth;

    this.strength = Math.random() * 20;

    this.path = [];
};

Entity.prototype.draw = function() {
    this.env.canvas.fillStyle = TeamColors[this.team];
    this.env.canvas.fillRect(this.x * this.env.ww, this.y * this.env.hh,
            this.env.ww, this.env.hh);
};


function Settlement(x, y, team, env) {
    this.x = x;
    this.y = y;
    this.team = team;
    this.env = env;

    this.resources = {
        "FOOD": 0,
        "STONE": 0,
        "WATER": 0,
        "WOOD": 0
    };

    this.birthCountdown = 400;
    this.health = 400;
}

Settlement.prototype.update = function() {
    this.birthCountdown -= 1;
    if (this.birthCountdown == 0) {
        if (this.resources.FOOD >= 10 &&
            this.resources.WATER >= 10){

        }
    }
}

Settlement.prototype.draw = function() {
    this.env.canvas.fillStyle = TeamColors[this.team];
    this.env.canvas.fillRect(this.x * this.env.ww - this.env.ww / 2,
            this.y * this.env.hh - this.env.hh / 2,
            this.env.ww * 2, this.env.hh * 2);
}

Settlement.prototype.dropOff = function (e) {
    assert(e.carrying != null, "entity must be carrying something");
    assert(this.resources[e.carrying] != undefined,
            "entity must be carrying something valid");

    this.resource[e.carrying] += 1;
    e.carrying = null;
}

Settlement.prototype.birth = function (e1, e2) {
    assert(this.food >= 10, "insufficient food for birth");
    assert(this.water >= 10), "insufficient water for birth";

    var e = new Entity(this.x, this.y, team, env);
    e.maxHealth = (e1.maxHealth + e2.maxHealth) / 2;
    e.health = e.maxHealth;
    e.strength = (e1.strength + e2.strength) / 2;
};
