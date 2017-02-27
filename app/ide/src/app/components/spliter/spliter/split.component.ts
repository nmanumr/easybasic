import { Component } from '@angular/core';
declare var dhtmlXLayoutObject: any;

@Component({
    selector: 'layout',
    styleUrls: ['./split.component.css'],
    templateUrl: './split.component.html'
})
export class SplitComponent {
    ngOnInit() {
        var myLayout = new dhtmlXLayoutObject({
            parent: "layoutObj",
            pattern: "3L",
            cells: [
                { id: "a", text: "", header: false},
                { id: "b", text: "", height: 100, header: false },
                { id: "c", text: "Bottom Pane", collapse: true}
            ]
        });
    }
}