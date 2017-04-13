export class StreamReader {

	public source: string;
	private len: number;
	private position: number;

	constructor(source: string) {
		this.source = source;
		this.len = source.length;
		this.position = 0;
	}

	public substring(from: number, to: number = this.position): string {
		return this.source.substring(from, to);
	}

	/**
	 * Check for End of Stream / File
	 */
	public eos(): boolean {
		return this.len <= this.position;
	}

	/**
	 * Current pos of Stream
	 */
	public pos(index: number = this.position): number {
		this.position = index;
		return this.position;
	}

	/**
	 * Go to pos
	 * @param {number} pos pos to jump
	 */
	public goBackTo(pos: number): void {
		this.position = pos;
	}

	/**
	 * Go back by n
	 * @param {number} n number to go back
	 */
	public goBack(n: number): void {
		this.position -= n;
	}

	/**
	 * jump fore by n
	 * @param {number} n number to jump fore
	 */
	public advance(n: number): void {
		this.position += n;
	}

	/**
	 * Char code of next char
	 */
	public nextChar(): number {
		return this.source.charCodeAt(this.position++) || -1;
	}

	/**
	 * Char code of nth next char
	 * @param {number} n
	 */
	public peekChar(n: number = 0): number {
		return this.source.charCodeAt(this.position + n) || -1;
	}

	/**
	 * Char code of nth previous char
	 * @param {number} n
	 */
	public lookbackChar(n: number = 0): number {
		return this.source.charCodeAt(this.position - n) || -1;
	}

	/**
	 * go fore if ch is eqaul to current char
	 * @param {number} ch Char code
	 */
	public advanceIfChar(ch: number): boolean {
		if (ch === this.source.charCodeAt(this.position)) {
			this.position++;
			return true;
		}
		return false;
	}

	/**
	 * go fore if chs are eqaul to current chars
	 * @param {number[]} ch Char codes
	 */
	public advanceIfChars(ch: number[]): boolean {
		let i: number;
		if (this.position + ch.length > this.source.length) {
			return false;
		}
		for (i = 0; i < ch.length; i++) {
			var nextChar = this._toLower(this.source.charCodeAt(this.position + i));
			var char = this._toLower(ch[i]);
			if (nextChar !== char) {
				return false;
			}
		}
		this.advance(i);
		return true;
	}

	/**
	 * go fore until condition is not false
	 * @param {(number) => boolean} condition Char codes
	 */
	public advanceWhileChar(condition: (ch: number) => boolean): number {
		let posNow = this.position;
		while (this.position < this.len && condition(this.source.charCodeAt(this.position))) {
			this.position++;
		}
		return this.position - posNow;
	}

	private _toLower(ch: number): number {
		if (ch >= 65 && ch <= 90) {
			return ch + 26 + 6;
		}
		return ch;
	}
}