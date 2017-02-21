import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'inline-edit',
    templateUrl: './inline-edit.component.html',
    styles: [`
    input{
        background: transparent;
        border: 1px solid rgba(0,0,0,.2);
        height: 19px;
    }
    `]
})
export class InlineEdit {
    private isDisplay = true;

    @Input() text: string;
    @Output() edit = new EventEmitter<string>();

    beginEdit(el: HTMLElement): void {
        this.isDisplay = false;

        setTimeout(() => {
            el.focus();
        }, 100);
    }

    editDone(newText: string): void {
        this.isDisplay = true;
        this.text = newText;
        this.edit.emit(this.text);
    }
    editCancel(): void {
        this.isDisplay = true;
    }
}