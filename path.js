function sign(a) {
    assert(a == a, "sign(NaN)");
    assert(a != Infinity, "sign(Inf)");
    assert(a != -Infinity, "sign(-Inf)");

    if (a == 0) {
        return 0;
    } else if (a > 0) {
        return 1;
    } else {
        return -1;
    }
}

function path(sx, sy, dx, dy) {
    var path = [];
    var cx = sx,
        cy = sy;

    while (cx != dx || cy != dy) {
        cx += sign(dx - cx);
        cy += sign(dy - cy);
        path.push({ x: cx, y: cy });
    }

    return path;
}
