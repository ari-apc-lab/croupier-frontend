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
  @Input() editorLanguage = 'yaml';
  @Output() textEdited = new EventEmitter<any>();
  @Output() contentStatus = new EventEmitter<any>();

  userLanguage: string = "yaml";
  userTheme: string = "vs-light";
  editorOptions: MonacoEditorConstructionOptions = {
      theme: this.userTheme,
      language: this.editorLanguage,
      roundedSelection: true
    };
  editor: MonacoStandaloneCodeEditor;
  disabled = true;

  constructor(private monacoLoaderService: MonacoEditorLoaderService) {
  }

  ngOnInit(): void {
  }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    this.editor = editor;
    this.emitStatus('1')
  }

  changeTheme(event) {
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

  onDownload() {
    console.log('file content', this.fileContent);

    const fileContent = this.fileContent;
    const file = new File([fileContent], 'inputs.yaml', {type: 'text/plain'});

    const link = document.createElement('a');
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

}
