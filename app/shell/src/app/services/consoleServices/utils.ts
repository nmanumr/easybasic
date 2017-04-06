/**
* Return a array of numbers
* @param from first element of array
* @param to last element of array
*/
export function range(fromNum: number, toNum: number, step: number = 1): number[] {
    if (!isFinite(fromNum) || toNum !== undefined &&
        !isFinite(toNum) || !isFinite(step))
        throw ('Wrong number value!');

    if (typeof toNum === 'undefined') {
        toNum = fromNum, fromNum = 0
    }

    if (step === 0) {
        throw ('Step should not be 0');
    }
    else if (step === 1) {
        fromNum > toNum && (step = -step);
    }
    else if (fromNum > toNum && step > 0 || fromNum < toNum && step < 0) {
        return [];
    }

    let ln = Math.ceil(Math.abs((toNum - fromNum) / step)), i = 0;
    let range = new Array(ln);

    for (; i < ln; i++) range[i] = fromNum + step * i;

    return range;
}

/** Build a flood-fill tile for Cga mode */
export function buildCgaTiles(pattern: number[]): any[] {
    var tile = []
    var bpp = 2;
    var strlen = pattern.length

    var mask = 8 - bpp
    for (var y of range(0, strlen)) {
        var line = [];
        for (var x of range(0, 8)) {
            var c = 0
            for (var b of range(bpp - 1, -1, -1)) {
                var x = mask + b;
                c = (c << 1) + ((pattern[y] >> x) & 1);
            }
            mask -= bpp;
            if (mask < 0) {
                mask = 8 - bpp
            }
            line.push(c);
        }
        tile.push(line);
    }
    return tile
}

/** Build a flood-fill tile for Ega mode */
export function buildEgaTiles(pattern: number[]): any[] {
    var tile = []
    var bpp = 4;

    while (pattern.length % bpp != 0) {
        // finish off the pattern with zeros
        pattern.push(0)
    }
    var strlen = pattern.length;
    var mask = 7
    for (var y of range(0, Math.floor(strlen / bpp))) {
        var line = []
        for (var x of range(0, 8)) {
            var c = 0;
            for (var b of range(bpp - 1, -1, -1)) {
                c = (c << 1) + ((pattern[(y * bpp + b) % strlen] >> mask) & 1)
            }
            mask -= 1
            if (mask < 0) {
                mask = 7
            }
            line.push(c)
        }
        tile.push(line)
    }
    return tile
}

/** Convert a string to Byte Array */
export function toByteArray(string: string): number[] {
    var bytes = [];
    for (var char of string) {
        var code = char.charCodeAt(0);
        bytes = bytes.concat([code]);
    }
    return bytes;
}

/** repeat elements of array n times */
export function repeatArray(arr, count) {
    var ln = arr.length;
    var b = new Array();
    for (var i = 0; i < count; i++) {
        b.push(arr[i % ln]);
    }
    return b;
}