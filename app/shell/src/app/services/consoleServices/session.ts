import { Program } from './Interpreter/Program';
import { Inputs } from './Inputs';
import { ElementRef } from '@angular/core';
import { Console } from './Console';
import { Text } from './text';
export class Session {

    public console: Console;
    public inputHandler: Inputs;
    public parser;
    public interpreter;
    public isActive: boolean;
    public id: string;
    public name: string;
    public path: string;
    public program: Program;

    constructor(id: string, name: string, canvas: ElementRef, copyarea: ElementRef, consoleWidth: 80 | 40 = 80) {
        this.id = id;
        this.name = name;
        this.console = new Console(consoleWidth, canvas);
        this.program = new Program(this.console);
        this.inputHandler = new Inputs(this.console.text, this.console.caret, this.console.selection, copyarea, this.program);
    }

}

export class Sessions {
    sessions: Session[] = [];
    activeSession: Session;
    constructor() {
    }

    public createNew(id: string, name: string, canvas: ElementRef, copyarea: ElementRef) {
        var newSession = new Session(id, name, canvas, copyarea);
        this.sessions.push(newSession);
        this.setActive(id);
    }

    public getbyId(id: string) {
        for (var session of this.sessions) {
            if (session.id == id) {
                return session;
            }
        }
    }

    public setActive(id: string) {
        if (this.activeSession)
            this.activeSession.isActive = false;
        this.activeSession = this.getbyId(id);
        this.activeSession.isActive = true
    }
}