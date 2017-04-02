import { ElementRef } from "@angular/core";

export class Drawings {

    private _canvas: ElementRef;
    private canvasContext;
    private resolution;

    constructor(canvas: ElementRef, colnum: 40 | 80, screen: 'text' | 'cga' | 'ega') {
        this._canvas = canvas;
        var resolution = this.resolution = this.getResolution(screen, colnum);
        this._canvas.nativeElement.width = resolution[0]
        this._canvas.nativeElement.height = resolution[1]
        this.canvasContext = this._canvas.nativeElement.getContext('2d');
        this.canvasContext.imageSmoothingEnabled = false;
        this.line({ xCord: 1, yCord: 1 }, { xCord: 637, yCord: 100 }, "#fff", null, null, 10); // line
        this.line({ xCord: 0, yCord: 200 }, { xCord: 640, yCord: 100 }, "#fff"); // line
        this.circle(0, { xCord: 57, yCord: 100 }, 50, "#fff", 0, Math.PI); // upper arc
        this.circle(0, { xCord: 165, yCord: 100 }, 50, "#fff", Math.PI, 2 * Math.PI); // lower arc
        this.circle(0, { xCord: 265, yCord: 100 }, 50, "#fff", 0, 2 * Math.PI, 2.5); // verticle arc
        this.circle(0, { xCord: 365, yCord: 100 }, 50, "#fff", 0, 2 * Math.PI, 0.1); // horizontal arc
    }

    private getResolution(screen: 'text' | 'cga' | 'ega', colnum: 40 | 80) {
        switch (screen) {
            case "text":
                return null;
            case "cga":
                return (colnum == 40) ? [320, 200] : [640, 200]
            case "ega":
                return (colnum == 40) ? [320, 350] : [640, 350]
        }
    }

    ///////////////////
    // Pset & Preset //
    ///////////////////

    /** PSET: set a pixel to a given attribute, or foreground */
    private pset(point: Point, color: string = "#fff", step?:number){
        this._psetPreset(point, this.hexToRgb(color), step)
    }

    /** PRESET: set a pixel to a given attribute, or background */
    private preset(point: Point, color: string = "#000", step?:number){
        this._psetPreset(point, this.hexToRgb(color), step)
    }

    /** Set a pixel to a given attribute */
    private _psetPreset(point: Point, color: Color, step?: number){
        // TODO: handle step
        this.drawPixel(point.xCord, point.yCord, color);
    }


    /////////////
    // Circle //
    ////////////

    /** CIRCLE: circle, ellipse, sectors */
    public circle(step: number = 0, midPoint: Point, radius: number, color: string = "#fff", start?: number, end?: number, aspect?: number) {
        if (start > 2 * Math.PI || end > 2 * Math.PI) {
            console.error("Overflow: start and end must be inside the range 0 - 6.28(2π)")
            return;
        }
        var rx, ry;
        if (radius < 0) {
            console.error("radius must be positive integer");
            return;
        }
        if (!aspect)
            aspect = this.resolution[1] / this.resolution[0];
        if (aspect == 1)
            rx = ry = radius;
        else if (aspect > 1) {
            ry = radius;
            rx = Math.floor(Math.round(radius / aspect))
        }
        else {
            rx = radius;
            ry = Math.floor(Math.round(radius * aspect))
        }
        var start_octant = -1, start_coord = -1, start_line = false;
        if (start >= 0) {
            var octant = this._getOctant(start, rx, ry);
            start_octant = octant[0], start_coord = octant[1], start_line = octant[2];
        }
        var stop_octant = -1, stop_coord = -1, stop_line = false;
        if (end >= 0) {
            var octant = this._getOctant(end, rx, ry);
            stop_octant = octant[0], stop_coord = octant[1], stop_line = octant[2];
        }
        if (aspect == 1) {
            this.drawCircle(midPoint, rx, this.hexToRgb(color),
                start_octant, start_coord, start_line,
                stop_octant, stop_coord, stop_line);
        }
        else {
            this.drawEllipse(midPoint, { xCord: rx, yCord: ry }, this.hexToRgb(color),
                Math.abs(start), Math.abs(end), start_line, stop_line);
        }
    }

    /**
     * Draw a circle sector using the midpoint algorithm
     * https://en.wikipedia.org/wiki/Midpoint_circle_algorithm#JavaScript
     */
    private drawCircle(midPoint: Point, radius: number, color: Color,
        oct0: number = -1, coo0: number = -1, line0: boolean = false,
        oct1: number = -1, coo1: number = -1, line1: boolean = false) {
        var hide_oct;

        if (oct0 == -1)
            hide_oct = [];
        else if (oct0 < oct1 || oct0 == oct1 && this._octantGte(oct0, coo1, coo0))
            hide_oct = this.range(0, oct0).concat(this.range(oct1 + 1, 8));
        else
            hide_oct = this.range(oct1 + 1, oct0);


        var x = radius,
            y = 0,
            bres_error = 1 - radius;

        while (x >= y) {
            for (var octant of this.range(0, 8)) {
                if (hide_oct.indexOf(octant) != -1) {
                    continue;
                }
                else if (oct0 != oct1 && octant == oct0 && this._octantGt(oct0, coo0, y)) {
                    continue;
                }
                else if (oct0 != oct1 && octant == oct1 && this._octantGt(oct1, y, coo1)) {
                    continue;
                }
                else if (oct0 == oct1 && octant == oct0) {
                    if (this._octantGte(oct0, coo1, coo0)) {
                        // don't draw if y is outside coo's
                        if (this._octantGt(oct0, y, coo1) || this._octantGt(oct0, coo0, y)) {
                            continue
                        }
                    }
                    else {
                        // don't draw if y is between coo's
                        if (this._octantGt(oct0, y, coo1) && this._octantGt(oct0, coo0, y)) {
                            continue;
                        }
                    }
                }
                var cords = this._octantCoord(octant, midPoint.yCord, midPoint.yCord, x, y);
                this.drawPixel(cords.xCord, cords.yCord, color);
            }
            var coo0x, coo1x;
            if (y == coo0) {
                coo0x = x
            }
            if (y == coo1) {
                coo1x = x
            }
            y += 1;
            if (bres_error < 0) {
                bres_error += 2 * y + 1;
            }
            else {
                x -= 1
                bres_error += 2 * (y - x + 1);
            }
        }
        // TODO: pie line slices
    }

    /** Draw an ellipse using html 5 native arc method */
    private drawEllipse(midpoint: Point, radiusPoint: Point, color: Color, start: number = 0, end: number = 2 * Math.PI, line0: boolean = false, line1: boolean = false) {
        this.canvasContext.save(); // save state
        this.canvasContext.beginPath();

        this.canvasContext.translate(midpoint.xCord - radiusPoint.xCord, midpoint.yCord - radiusPoint.yCord);
        this.canvasContext.scale(radiusPoint.xCord, radiusPoint.yCord);
        this.canvasContext.arc(1, 1, 1, start, end, true);

        this.canvasContext.restore(); // restore to original state
        this.canvasContext.strokeStyle = "#fff";
        this.canvasContext.stroke();
        // draw pie-slice lines
    }



    ///////////
    // Line //
    //////////

    /** LINE: Draw a patterned line or box */
    public line(startPoint: Point, endPoint: Point, color: string, step0?: number, step1?: number, pattern: number = 0xffff, shape?: 'B' | 'BF') {
        if (!pattern) {
            pattern = 0xffff;
        }
        if (!shape) {
            this._drawLine(startPoint, endPoint, this.hexToRgb(color), pattern);
        }
        else if (shape == "B") {
            this._drawBox(startPoint, endPoint, this.hexToRgb(color), pattern);
        }
        else if (shape == "BF") {
            this._drawBoxFilled(startPoint, endPoint, color);
        }
    }

    /** Draw a line between the given physical points */
    private _drawLine(startPoint: Point, stopPoint: Point, color: Color, pattern: number = 0xffff) {
        // TODO: cut off any out-of-bound coordinates
        if (stopPoint.yCord <= startPoint.yCord) {
            stopPoint.yCord = [startPoint.yCord, startPoint.yCord = stopPoint.yCord][0];
            stopPoint.xCord = [startPoint.xCord, startPoint.xCord = stopPoint.xCord][0];
        }

        // Bresenham algorithm
        var xDistance = Math.abs(stopPoint.xCord - startPoint.xCord),
            yDistance = Math.abs(stopPoint.yCord - startPoint.yCord),
            steep = yDistance > xDistance;

        if (steep) {
            startPoint.xCord = [startPoint.yCord, startPoint.yCord = startPoint.xCord][0];
            stopPoint.xCord = [stopPoint.yCord, stopPoint.yCord = stopPoint.xCord][0];
            xDistance = [yDistance, yDistance = xDistance][0];
        }

        var sx = (stopPoint.xCord > startPoint.yCord) ? 1 : -1,
            sy = (stopPoint.yCord > startPoint.yCord) ? 1 : -1,
            mask = 0x8000,
            line_error = xDistance /2,
            x = startPoint.xCord,
            y = startPoint.yCord;

        for (var x of this.range(startPoint.xCord, stopPoint.xCord + sx, sx)) {
            if ((pattern & mask) != 0) {
                if (steep) {
                    this.drawPixel(y, x, color);
                } else {
                    this.drawPixel(x, y, color);
                }
            }

            mask >>= 1;
            if (mask == 0) {
                mask = 0x8000;
            };
            line_error -= yDistance;
            if (line_error < 0) {
                y += sy;
                line_error += xDistance;
            }
        }

    }

    /** Draw a filled box between the given corner points */
    private _drawBoxFilled(startPoint: Point, stopPoint: Point, color: string) {
        // TODO: cutoff out of bound pixels
        if (stopPoint.yCord < startPoint.yCord) {
            startPoint.yCord = [stopPoint.yCord, stopPoint.yCord = startPoint.yCord][0];
        } else if (stopPoint.xCord < startPoint.xCord) {
            startPoint.xCord = [stopPoint.xCord, stopPoint.xCord = startPoint.xCord][0];
        }

        var width = stopPoint.xCord - startPoint.xCord,
            height = stopPoint.yCord - startPoint.yCord;
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillRect(startPoint.xCord, startPoint.yCord, width, height)
    }

    /** Draw an empty box between the given corner points */
    private _drawBox(startPoint: Point, stopPoint: Point, color: Color, pattern: number = 0xffff) {
        // TODO: cutoff out of bound pixels
        var mask = 0x8000;
        mask = this._drawStraightLine(
            { xCord: stopPoint.xCord, yCord: stopPoint.yCord },
            { xCord: startPoint.xCord, yCord: stopPoint.yCord },
            color, pattern, mask);
        mask = this._drawStraightLine(
            { xCord: stopPoint.xCord, yCord: startPoint.yCord },
            { xCord: startPoint.xCord, yCord: startPoint.yCord },
            color, pattern, mask);

        // verticals always drawn top to bottom
        if (startPoint.yCord < stopPoint.yCord) {
            startPoint.yCord = [stopPoint.yCord, stopPoint.yCord = startPoint.yCord][0];
        }
        mask = this._drawStraightLine(
            { xCord: stopPoint.xCord, yCord: stopPoint.yCord },
            { xCord: stopPoint.xCord, yCord: startPoint.yCord },
            color, pattern, mask);
        mask = this._drawStraightLine(
            { xCord: startPoint.xCord, yCord: stopPoint.yCord },
            { xCord: startPoint.xCord, yCord: startPoint.yCord },
            color, pattern, mask);
    }

    /** Draw a horizontal or vertical line */
    private _drawStraightLine(startPoint: Point, stopPoint: Point, color: Color, pattern: number, mask: number) {
        var point0: number, point1: number, q: number, direction: 'x' | 'y';
        if (startPoint.xCord == stopPoint.xCord) {
            point0 = startPoint.yCord;
            point1 = stopPoint.yCord;
            q = startPoint.xCord;
            direction = 'y'
        } else {
            point0 = startPoint.xCord;
            point1 = stopPoint.xCord;
            q = startPoint.yCord;
            direction = 'x'
        }

        var step = (point1 > point0) ? 1 : -1;
        for (var point of this.range(point0, point1 + step, step)) {
            if ((pattern & mask) != 0) {
                if (direction == 'x')
                    this.drawPixel(point, q, color);
                else
                    this.drawPixel(q, point, color);
            }
            mask >>= 1;
            if (mask == 0) {
                mask = 0x8000
            }
        }
        return mask
    }



    /////////////////
    //   Utiles   //
    ////////////////

    /** Draw a point of specified color at specified postion */
    private drawPixel(x, y, color: Color) {
        var n = (y * this._canvas.nativeElement.width + x) * 4;
        var imgdata = this.canvasContext.getImageData(0, 0, this._canvas.nativeElement.width, this._canvas.nativeElement.height)
        imgdata.data[n] = color.red;
        imgdata.data[n + 1] = color.green;
        imgdata.data[n + 2] = color.blue;
        imgdata.data[n + 3] = 255;
        this.canvasContext.putImageData(imgdata, 0, 0);
    }

    /**
     * Return red, green and blue values from hexa color code
     * @param hex hexa color code
     */
    private hexToRgb(hex: string): Color {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16)
        } : null;
    }

    /**
     * Return whether y is further along the circle than coord, or equal
     */
    private _octantGte(octant: number, y: number, coord: number): boolean {
        if (octant % 2 === 1) {
            return y <= coord;
        } else {
            return y >= coord
        }
    }

    /**
     * Return whether y is further along the circle than coord
     */
    private _octantGt(octant: number, y: number, coord: number): boolean {
        if (octant % 2 === 1) {
            return y < coord;
        } else {
            return y > coord
        }
    }

    /**
     * Return a array of numbers
     * @param from first element of array
     * @param to last element of array
     */
    private range(fromNum: number, toNum: number, step: number = 1): number[] {
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

    /**
     * Return symmetrically reflected coordinates for a given pair
     */
    private _octantCoord(octant, x0, y0, x, y): Point {
        if (octant == 7) return { xCord: x0 + x, yCord: y0 + y };
        else if (octant == 0) return { xCord: x0 + x, yCord: Math.abs(y0 - y) };
        else if (octant == 4) return { xCord: Math.abs(x0 - x), yCord: y0 + y };
        else if (octant == 3) return { xCord: Math.abs(x0 - x), yCord: Math.abs(y0 - y) };
        else if (octant == 6) return { xCord: x0 + y, yCord: y0 + x };
        else if (octant == 1) return { xCord: x0 + y, yCord: Math.abs(y0 - x) };
        else if (octant == 5) return { xCord: Math.abs(x0 - y), yCord: y0 + x };
        else if (octant == 2) return { xCord: Math.abs(x0 - y), yCord: Math.abs(y0 - x) };
    }

    /**
     * Return whether y is further along the ellipse than coord, or equal
     */
    private _quadrantGte(quadrant: number, x: number, y: number, x0: number, y0: number): boolean {
        if (quadrant % 2 == 0) {
            if (y != y0) {
                return y > y0
            }
            else {
                return x <= x0
            }
        } else {
            if (y != y0) {
                return y < y0
            }
            else {
                return x >= x0
            }
        }
    }

    /**
    * Return whether y is further along the ellipse than coord
    */
    private _quadrantGt(quadrant: number, x: number, y: number, x0: number, y0: number): boolean {
        if (quadrant % 2 == 0) {
            if (y != y0) {
                return y > y0
            }
            else {
                return x < x0
            }
        } else {
            if (y != y0) {
                return y < y0
            }
            else {
                return x > x0
            }
        }
    }

    /**
     * Return symmetrically reflected coordinates for a given pair
     */
    private _quardrantCoord(quadrant: number, x: number, y: number, x0: number, y0: number): Point {
        if (quadrant == 3) return { xCord: x0 + x, yCord: y0 + y }
        else if (quadrant == 0) return { xCord: x0 + x, yCord: Math.abs(y0 - y) }
        else if (quadrant == 2) return { xCord: Math.abs(x0 - x), yCord: y0 + y }
        else if (quadrant == 1) return { xCord: Math.abs(x0 - x), yCord: Math.abs(y0 - y) }
    }


    /**
     * Get the circle octant for a given coordinate
     */
    private _getOctant(f, rx, ry) {
        var neg = f < 0;
        f = Math.abs(f);
        var octant = 0,
            comp = Math.PI / 4,
            coord;

        while (f > comp) {
            comp += Math.PI / 4;
            octant += 1;
            if (octant >= 8) {
                console.log('Invalid function call', f);
                // Invalid function call
                return;
            }
        }
        if ([0, 3, 4, 7].indexOf(octant) != -1) {
            coord = Math.abs(Math.floor(Math.round(ry * Math.sin(f))));
        } else {
            coord = Math.abs(Math.floor(Math.round(rx * Math.cos(f))))
        }
        return [octant, coord, neg]
    }
}


export class Point {
    xCord: number;
    yCord: number;
}


export class Color {
    red: number;
    green: number;
    blue: number;
}