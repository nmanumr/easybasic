import { Component} from '@angular/core';
declare var dhtmlXLayoutObject: any;

@Component({
    selector: 'layout',
    styleUrls: ['./split.component.css'],
    templateUrl: './split.component.html'
})
export class SplitComponent {
    myLayout: any;
    editorLayout: any = null;

    ngOnInit() {
        this.myLayout = new dhtmlXLayoutObject({
            parent: "layoutObj",
            pattern: "2U",
            cells: [
                { id: "a", text: "", width: "210" },
                { id: "b", text: "", header: false }
            ]
        });
        this.myLayout.cells("a").attachObject("left-pane");
        this.myLayout.cells("b").attachObject("main-editor");
    }

    ngAfterViewChecked() {
        this.myLayout.setSizes();
    }
}