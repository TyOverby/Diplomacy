function assert(cond, msg) {
    if (!cond) {
        throw msg;
    }
}



function Grid(width, height) {
    this.width = width;
    this.height = height;

    this.grid = [];
    this.grid.length = width * height;
    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = 0;
    }
}

Grid.prototype.get = function (x, y) {
    assert(x < this.width && x >= 0, "0 <= x < width");
    assert(y < this.height && y >= 0, "0 <= x < height");
    return this.grid[y * this.width + x];
};

Grid.prototype.set = function (x, y, v) {
    assert(x < this.width && x >= 0, "0 <= x < width");
    assert(y < this.height && y >= 0, "0 <= x < height");
    return this.grid[y * this.width + x] = v;
};

Grid.prototype.foreach = function (f) {
    for (var i = 0; i < this.width; i++) {
        for (var k = 0; k < this.height; k++) {
            f(i, k, this.get(i, k));
        }
    }
}

Grid.prototype.map = function(f) {
    for (var i = 0; i < this.width; i++) {
        for (var k = 0; k < this.height; k++) {
            var value = f(i, k, this.get(i, k));
            if (value != undefined && value != null) {
                this.set(i, k, value);
            }
        }
    }
}
