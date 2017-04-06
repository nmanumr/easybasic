import { Console } from './../../Console';
import { StreamReader } from './StreamReader';
import * as Constants from "./Constants"

const _h = 'h'.charCodeAt(0);
const _o = 'o'.charCodeAt(0);
const _A = 'A'.charCodeAt(0);
const _D = 'D'.charCodeAt(0);
const _E = 'E'.charCodeAt(0);
const _H = 'H'.charCodeAt(0);
const _I = 'I'.charCodeAt(0);
const _M = 'M'.charCodeAt(0);
const _N = 'N'.charCodeAt(0);
const _O = 'O'.charCodeAt(0);
const _P = 'P'.charCodeAt(0);
const _Q = 'Q'.charCodeAt(0);
const _R = 'R'.charCodeAt(0);
const _T = 'T'.charCodeAt(0);
const _V = 'V'.charCodeAt(0);
const _X = 'X'.charCodeAt(0);
const _Z = 'Z'.charCodeAt(0);
const _0 = '0'.charCodeAt(0);
const _9 = '9'.charCodeAt(0);
const _PLS = '+'.charCodeAt(0);
const _MIN = '-'.charCodeAt(0);
const _EQL = '='.charCodeAt(0);
const _LES = '<'.charCodeAt(0);
const _GRT = '>'.charCodeAt(0);
const _NWL = '\n'.charCodeAt(0);
const _DQO = '"'.charCodeAt(0);
const _WSP = ' '.charCodeAt(0);
const _TAB = '\t'.charCodeAt(0);
const _DOT = '.'.charCodeAt(0);
const _AMP = '&'.charCodeAt(0);

const _BNG = '!'.charCodeAt(0);
const _HSH = '#'.charCodeAt(0);
const _DLR = '$'.charCodeAt(0);
const _PRC = '%'.charCodeAt(0);


export class Scanner {

	public stream: StreamReader;
	public lineStarted = true;

	private console:Console

	constructor(console){
		this.console = console;
	}

	public setSource(input: string): void {
		this.stream = new StreamReader(input);
		this.stream.pos(0);
		this.lineStarted = true;
	}

	public finishToken(offset: number, Type: TokenType, text?: string): IToken {
		if (Type == TokenType.Newline) {
			this.lineStarted = true;
		}
		return {
			offset: offset,
			len: this.stream.pos() - offset,
			type: Type,
			text: text || this.stream.substring(offset)
		};
	}

	public substring(offset: number, len: number): string {
		return this.stream.substring(offset, offset + len);
	}

	public scan(): IToken {
		let content: string[] = [];
		let offset = this.stream.pos();
		let tokenType;

		var token = this.stream.peekChar()

		if (token == -1) { // EOF
			return this.finishToken(offset, TokenType.EOF);
		}

		// check for line numbers
		if (this.lineStarted) {
			let pos = this.stream.pos();
			if (this._Num()) {
				content = [this.stream.substring(offset, pos)];
				return this.finishToken(offset, TokenType.LineNum, content.join(''));
			}
			this.lineStarted = false;
		}

		while (true) {
			token = this.stream.peekChar()
			offset = this.stream.pos();
			if (token == _WSP || token == _TAB) {
				// skipping all white spaces
				this.stream.advance(1);
				continue;
			}

			// End of Line
			else if (token == _NWL) {
				this.stream.advance(1);
				return this.finishToken(offset, TokenType.EOL, "\n");
			}

			// String
			else if (token == _DQO) {
				var string = this.readString();
				return this.finishToken(offset, TokenType.String, string);
			}

			// Number
			else if (token == _AMP || token == _DOT || Constants.decimalDigits.indexOf(token) > -1) {
				var number = this.readNumber();
				return this.finishToken(offset, TokenType.Number, number);
			}

			// Operators
			else if (this._isOperator()) {
				return this.finishToken(offset, TokenType.Operator)
			}

			// expression delimiter
			else if (Constants.expressionDelimiter.indexOf(token)> -1) {
				this.stream.advance(1);
				return this.finishToken(offset, TokenType.Delim);
			}

			// Statement lineTerminator
			else if (token == ":".charCodeAt(0)){
				this.stream.advance(1);
				return this.finishToken(offset, TokenType.StatementTerminator);
			}

			// Sigil
			else if (this.stream.advanceIfChar(_BNG) ||
				this.stream.advanceIfChar(_HSH) ||
				this.stream.advanceIfChar(_DLR) ||
				this.stream.advanceIfChar(_PRC)) {
				return this.finishToken(offset, TokenType.Sigil);
			}

			// Keywords
			else {
				var keyword = this.readKeyword();
				return this.finishToken(offset, TokenType.Ident, keyword);
			}
		}
	}

	public scanTilEndofStatement(){
		while (true) {
			var token = this.stream.peekChar();
			if (Constants.statementTerminators.indexOf(token) > -1) {
				break;
			}
			this.stream.advance(1);
		}
	}

	private readKeyword(): string {
		var token,
			word = "";

		while (true) {
			token = this.stream.peekChar();
			if (Constants.wordTerminator.indexOf(token) > -1) {
				break;
			}
			word += String.fromCharCode(token);
			this.stream.advance(1);
		}

		return word;
	}

	public readNumber(): string {
		var token = this.stream.peekChar();
		var number = "";
		if (token == -1)
			return;

		if (token == _AMP) {
			this.stream.advance(1);
			token = this.stream.peekChar();

			this.stream.advance(1);
			if (token == _H || token == _h) {
				// read hexa number
				number += this.readHexa();
			}
			else if (token == _O || token == _o) {
				// read octal number
				number += this.readOctal();
			}
		}
		else if (Constants.decimalDigits.indexOf(token) > -1 ||
			token == _DOT || token == _PLS || token == _MIN) {
			number += this.readDecimal();
		}
		else {
			this.stream.goBack(1);
		}
		return number;
	}

	private readDecimal(): string {
		var number = "";
		while (true) {
			var token = this.stream.peekChar();
			if (Constants.decimalDigits.indexOf(token) > -1) {
				this.stream.advance(1);
				number += String.fromCharCode(token);
			}
			else {
				break;
			}
		}
		return number;
	}

	private readHexa(): string {
		var number = "&H";
		while (true) {
			var token = this.stream.peekChar();
			if (Constants.hexaDigits.indexOf(token) > -1) {
				number += String.fromCharCode(token);
			}
			else {
				break;
			}
		}
		return number;
	}

	private readOctal(): string {
		var number = "&o";
		while (true) {
			var token = this.stream.peekChar();
			if (Constants.octalDigits.indexOf(token) > -1) {
				number += String.fromCharCode(token);
			}
			else {
				break;
			}
		}
		return number;
	}

	public readString(): string {
		var current = this.stream.peekChar();
		if (current != _DQO)
			return null;

		this.stream.advance(1);
		var builder = '"';
		while (true) {
			current = this.stream.peekChar();
			if (current == _DQO || current == _NWL) {
				break;
			}
			else {
				builder += String.fromCharCode(current);
				this.stream.advance(1);
			}
		}

		if (this.stream.peekChar() == _DQO) {
			this.stream.advance(1);
			builder += '"';
		}

		return builder;
	}

	private _isOperator(): boolean {
		var token = this.stream.peekChar();
		if (Constants.operators.indexOf(token) > -1) {
			this.stream.advance(1);
			return true;
		}
		else if (this.stream.advanceIfChars([_EQL, _LES]) || // =<
			this.stream.advanceIfChars([_EQL, _GRT]) || // =>
			this.stream.advanceIfChars([_LES, _GRT]) || // <>
			this.stream.advanceIfChars([_GRT, _LES]) || // ><
			this.stream.advanceIfChars([_LES, _EQL]) || // <=
			this.stream.advanceIfChars([_GRT, _EQL]) || // >=
			this.stream.advanceIfChars([_EQL, _EQL]) || // ==
			this.stream.advanceIfChars([_O, _R])
		) {
			// Double Char Operators
			return true
		} else if (this.stream.advanceIfChars([_M, _O, _D]) ||
			this.stream.advanceIfChars([_N, _O, _T]) ||
			this.stream.advanceIfChars([_A, _N, _D]) ||
			this.stream.advanceIfChars([_N, _O, _T]) ||
			this.stream.advanceIfChars([_X, _O, _R]) ||
			this.stream.advanceIfChars([_E, _Q, _V]) ||
			this.stream.advanceIfChars([_I, _M, _P])) {
			// Triple Char Operator
			return true;
		}
		return false;
	}

	private _Num(): boolean {
		let ch: number;
		ch = this.stream.peekChar();
		if (ch >= _0 && ch <= _9) {
			this.stream.advanceWhileChar((ch) => {
				return ch >= _0 && ch <= _9;
			});
			return true;
		}
		return false;
	}
}

export interface IToken {
	type: TokenType;
	text: string;
	offset: number;
	len: number;
}

export enum TokenType {
	Ident = 0,
	String = 1,
	Number = 2,
	LineNum = 3,
	Whitespace = 4,
	Newline = 5,
	Delim = 13,
	EOF = 17,
	EOL = 29,
	Sigil = 18,
	Operator = 19,
	StatementTerminator= 6,
	CustomToken = 28,
}