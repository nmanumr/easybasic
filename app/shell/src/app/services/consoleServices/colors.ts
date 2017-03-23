export class basicColors {

    private _screen: 'text' | 'cga' | 'ega';
    private _palette: '0' | '1' | 'alt';
    /**
     * Constructor for BASIC colours class
     * @param mood specify screen mood e.g. text, cga, ega
     * @param palette specify palette for screen 1 e.g. 0, 1, alt
     */
    constructor(mood: 'text' | 'cga' | 'ega', palette?: '0' | '1' | 'alt') {
        this._screen = mood;
        this._palette = palette;
    }

    /**
     * Change screen mood
     * @param mood specify screen mood e.g. text, cga, ega
     */
    public changeMood(mood: 'text' | 'cga' | 'ega'){
        this._screen = mood;
    }

    /**
     * Change screen mood (only for text mood)
     * @param palette specify palette for screen 1 e.g. 0, 1, alt
     */
    public changePalette(palette: '0' | '1' | 'alt'){
        if(this._screen == 'cga')
            this._palette = palette;
    }

    /**
     * Returns EGA or CGA color code from BASIC color number (only for screen 1-9)
     * @param index BASIC color number
     */
    public getColor(index: number): string {
        switch (this._screen) {
            case 'cga':
                if (this._palette == 'alt') {
                    return this.cgaAlt[index];
                } else if (this._palette == '1') {
                    return this.cga1[index];
                } else {
                    return this.cga0[index];
                }
            case 'ega':
                this._egaCustom[index];
            default:
                return null;
        }
    }

    /**
     * Returns text backcolor from BASIC backcolor number (only for screen 0)
     * @param index BASIC color number
     */
    public getBackcolor(index: number): string {
        if(this._screen == 'text'){
            return this.textBackcolor[index];
        }
    }

    /**
     * Returns text forecolor from BASIC forecolor number (only for screen 0)
     * @param index BASIC color number
     */
    public getForecolor(index: number): {color: string, isBlinking: boolean} {
        if(this._screen == 'text'){
            var colorindex = (index <= 15)? index: index -15;
            return {color: this.textForecolor[colorindex], isBlinking: (index > 15)};
        }
    }

     /**
     * change ega Palette
     * @param index BASIC color number
     * @param color BASIC number of new Color;
     */
    public changeEgaColour(index: number, color: number) {
        if(this._screen == 'cga'){
            if(index < 64 && index > -1)
                this._egaCustom[index] = this.egaAll[color];
            else
                throw "EGA color index out of range"
        }
    }

    private textBackcolor = [
        '#000000',
        '#0000aa',
        '#00aa00',
        '#00aaaa',
        '#aa0000',
        '#aa00aa',
        '#aa5500',
        '#aaaaaa'
    ]

    private textForecolor = [
        '#000000',
        '#0000aa',
        '#00aa00',
        '#00aaaa',
        '#aa0000',
        '#aa00aa',
        '#aa5500',
        '#aaaaaa',
        '#555555',
        '#5555ff',
        '#55ff55',
        '#55ffff',
        '#ff5555',
        '#ff55ff',
        '#ffff55',
        '#ffffff',
    ]

    private cga0 = [
        '#000000',
        '#55ff55',
        '#ff5555',
        '#aa5500'
    ]

    private cga1 = [
        '#000000',
        '#aaffff',
        '#ff55ff',
        '#ffffff'
    ]

    private cgaAlt = [
        '#000000',
        '#aaffff',
        '#ff5555',
        '#ffffff'
    ]

    private egaDefault = [
        '#000000',
        '#0000aa',
        '#00aa00',
        '#00aaaa',
        '#aa0000',
        '#aa00aa',
        '#aa5500',
        '#aaaaaa',
        '#555555',
        '#5555ff',
        '#55ff55',
        '#55ffff',
        '#ff5555',
        '#ff55ff',
        '#ffff55',
        '#ffffff'
    ]

    private _egaCustom = JSON.parse(JSON.stringify(this.egaDefault));

    private egaAll = [
        '#000000',
        '#000055',
        '#005500',
        '#005555',
        '#550000',
        '#550055',
        '#555500',
        '#555555',
        '#0000aa',
        '#0000ff',
        '#0055aa',
        '#0055ff',
        '#5500aa',
        '#5500ff',
        '#5555aa',
        '#5555ff',
        '#00aa00',
        '#00aa55',
        '#00ff00',
        '#00ff55',
        '#55aa00',
        '#55aa55',
        '#55ff00',
        '#55ff55',
        '#00aaaa',
        '#00aaff',
        '#00ffaa',
        '#00ffff',
        '#55aaaa',
        '#55aaff',
        '#55ffaa',
        '#55ffff',
        '#aa0000',
        '#aa0055',
        '#aa5500',
        '#aa5555',
        '#ff0000',
        '#ff0055',
        '#ff5500',
        '#ff5555',
        '#aa00aa',
        '#aa00ff',
        '#aa55aa',
        '#aa55ff',
        '#ff00aa',
        '#ff00ff',
        '#ff55aa',
        '#ff55ff',
        '#aaaa00',
        '#aaaa55',
        '#aaff00',
        '#aaff55',
        '#ffaa00',
        '#ffaa55',
        '#ffff00',
        '#ffff55',
        '#aaaaaa',
        '#aaaaff',
        '#aaffaa',
        '#aaffff',
        '#ffaaaa',
        '#ffaaff',
        '#ffffaa',
        '#ffffff'
    ]

}