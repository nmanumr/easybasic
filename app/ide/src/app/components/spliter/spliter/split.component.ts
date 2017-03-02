import { MiniPaneService } from './../../../services/mini-pane.service';
import { Component } from '@angular/core';
declare var dhtmlXLayoutObject: any;

@Component({
    selector: 'layout',
    styleUrls: ['./split.component.css'],
    templateUrl: './split.component.html'
})
export class SplitComponent {
    myLayout: any;
    editorLayout: any = null;
    HeaderText: string = "";

    constructor ( private miniPaneService: MiniPaneService){}

    ngOnInit() {
        this.myLayout = new dhtmlXLayoutObject({
            parent: "layoutObj",
            pattern: "2U",
            cells: [
                { id: "a", text: "", width: "210", collapseText: "Left Pane" },
                { id: "b", text: "", header: false}
            ]
        });
        this.myLayout.cells("a").attachObject("left-pane");
        this.myLayout.cells("b").attachObject("main-editor");
        this.myLayout.cells('b').setMinWidth(450);
        this.myLayout.cells('a').setMinWidth(200);
    }

    ngAfterViewChecked() {
        this.myLayout.setSizes();
    }

    ngDoCheck() {
        let curntHeaderText = this.miniPaneService.getCurrentActive().text;
        if (this.HeaderText !== curntHeaderText) {
            this.myLayout.cells("a").setText(curntHeaderText);
            this.HeaderText = curntHeaderText;
        }
    }
}