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
    this.TileArr = [ "GRASS", "STONE", "WATER", "DIRT", "BRUSH" ];

    this.ColorMaps = {
        GRASS: "green",
        STONE: "grey",
        WATER: "darkblue",
        DIRT: "rgb(100,50,50)",
        BRUSH: "darkgreen"
    };

    this.tiles = new Grid(w, h);
    this.rand = new Grid(w, h);

    this.tiles.map(function (x, y) {
        var r = Math.random() * this.TileArr.length;
        var f = Math.floor(r);

        var ret = this.TileTypes[this.TileArr[f]];
        assert(ret != undefined);
        return ret;
    }.bind(this));

    this.rand.map(function (x, y) {
        return Math.random() / 3;
    });

}

Map.prototype.draw = function() {
    this.tiles.foreach(function(x, y, value) {
        this.canvas.fillStyle = this.ColorMaps[this.TileArr[value]];
        this.canvas.fillRect(x * this.ww, y * this.hh, this.ww, this.hh);

        this.canvas.fillStyle = "rgba(0,0,0," + this.rand.get(x,y) + ")";
        this.canvas.fillRect(x * this.ww, y * this.hh, this.ww, this.hh);
    }.bind(this));
}
