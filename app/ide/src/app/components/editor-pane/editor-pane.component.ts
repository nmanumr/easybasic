/// <reference path="./../../../assets/monaco/monaco.d.ts" />
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare const monaco: any;
declare const require: any;

@Component({
  selector: 'editor-pane',
  templateUrl: './editor-pane.component.html',
  styleUrls: ['./editor-pane.component.css']
})
export class EditorPaneComponent implements OnInit {

  @ViewChild('editor') editorContent: ElementRef;
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  language: string = 'javascript';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    var onGotAmdLoader = () => {
      // Load monaco
      (<any>window).require.config({ paths: { 'vs': 'assets/monaco/vs' } });
      (<any>window).require(['vs/editor/editor.main'], () => {
        this.initMonaco();
      });
    };

    // Load AMD loader if necessary
    if (!(<any>window).require) {
      var loaderScript = document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = 'assets/monaco/vs/loader.js';
      loaderScript.addEventListener('load', onGotAmdLoader);
      document.body.appendChild(loaderScript);
    } else {
      onGotAmdLoader();
    }
  }

  // Will be called once monaco library is available
  initMonaco() {
    var myDiv: HTMLDivElement = this.editorContent.nativeElement;
    var editor = monaco.editor.create(myDiv, {
      value: [
        'function x() {',
        '\tconsole.log("Hello world!");',
        '}'
      ].join('\n'),
      language: 'basic',
      automaticLayout: true,
      renderControlCharacters: true,
      renderWhitespace: "boundary"
    });
  }
}