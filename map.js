function Map(w, h, ww, hh, canvas) {
    this.w = w;
    this.h = h;
    this.ww = ww;
    this.hh = hh;
    this.canvas = canvas;

    this.TileTypes = {
        GRASS: 0,
        STONE: 1,
        WATER: 2,
        DIRT: 3,
        BRUSH: 4,
    };
    this.ReverseTileTypes = {
        0: 'GRASS',
        1: 'STONE',
        2: 'WATER',
        3: 'DIRT',
        4: 'BRUSH'
    };

    this.TileArr = [ 'BRUSH', 'WATER', 'GRASS', 'DIRT', 'GRASS', 'BRUSH', 'WATER'];
    this.pValues = [  0.2,     0.6,     0.9,     1.1,     1.2,     2.0];

    this.ColorMaps = {
        GRASS: "green",
        STONE: "grey",
        DIRT: "rgb(120, 130, 60)",
        BRUSH: "rgb(30, 90, 30)",
        WATER: "darkblue"
    };

    this.tiles = new Grid(w, h);
    this.rand = new Grid(w, h);

    noise.seed(Math.random());
    var noiseFactor = 14;

    this.tiles.map(function (x, y) {
        var random = noise.perlin2(x / noiseFactor, y / noiseFactor, 0) + 1;
        var i, f;
        for (i = 0; i < this.pValues.length; i++) {
            if (random <= this.pValues[i]) {
                f = i;
                break;
            }
        }

        var ret = this.TileTypes[this.TileArr[f]];
        assert(ret !== undefined);
        return ret;
    }.bind(this));

    this.rand.map(function (x, y) {
        var rand = Math.random() / 3;
        var shade = Math.abs(noise.perlin2(x / noiseFactor, y / noiseFactor));

        var randFactor = 1/3;
        return rand * randFactor + shade * (1 - randFactor);

    });

}

Map.prototype.draw = function() {
    this.tiles.foreach(function(x, y, value) {
        this.canvas.fillStyle = this.ColorMaps[this.ReverseTileTypes[value]];
        this.canvas.fillRect(x * this.ww, y * this.hh, this.ww, this.hh);

        this.canvas.fillStyle = "rgba(0,0,0," + this.rand.get(x,y) + ")";
        this.canvas.fillRect(x * this.ww, y * this.hh, this.ww, this.hh);
    }.bind(this));
}
