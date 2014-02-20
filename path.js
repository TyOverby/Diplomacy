function sign(a) {
    assert(a === a, "sign(NaN)");
    assert(a !== Infinity, "sign(Inf)");
    assert(a !== -Infinity, "sign(-Inf)");

    if (a === 0) {
        return 0;
    } else if (a > 0) {
        return 1;
    } else {
        return -1;
    }
}

function path(s, d) {
    var sx = Math.floor(s.x),
        sy = Math.floor(s.y),
        dx = Math.floor(d.x),
        dy = Math.floor(d.y);
    var path = [];
    var cx = sx,
        cy = sy;

    while (cx !== dx || cy !== dy) {
        cx += sign(dx - cx);
        cy += sign(dy - cy);
        path.push([cx, cy]);
    }

    return path;
}
