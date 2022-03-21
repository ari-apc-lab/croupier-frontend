import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from '@materia-ui/ngx-monaco-editor';



@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  @ViewChild(MonacoEditorComponent, { static: false }) monacoComponent: MonacoEditorComponent;
  @Input() fileContent;
  @Input() fileTitle;
  @Output() textEdited = new EventEmitter<any>();
  @Output() contentStatus = new EventEmitter<any>();

  userLanguage: string = "yaml";
  userTheme: string = "vs-light";
  editorOptions: MonacoEditorConstructionOptions = {
      theme: this.userTheme,
      language: this.userLanguage,
      roundedSelection: true
    };
  editor: MonacoStandaloneCodeEditor;
  disabled = true;

  constructor(private monacoLoaderService: MonacoEditorLoaderService) {
  }

  ngOnInit(): void {
    console.log('yaml content:', this.fileContent);
  }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    this.editor = editor;
    this.emitStatus('1')
  }

  changeTheme(event) {
    console.log('event: ', event.checked);
    if (event.checked) {
     // this.editorOptions.theme = 'vs-dark';
     this.editorOptions = { ...this.editorOptions, theme: 'vs-dark' };
    } else if (!event.checked) {
    //  this.editorOptions.theme = 'vs-light';
    this.editorOptions = { ...this.editorOptions, theme: 'vs-light' };
    }
  }

  emitText() {
    this.textEdited.emit(this.fileContent);
    this.emitStatus('3');
  }

  emitStatus(status) {
    this.disabled = false
    this.contentStatus.emit(status);
  }

}
