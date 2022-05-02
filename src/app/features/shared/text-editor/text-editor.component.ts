import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  @Input() fileContent;
  @Input() fileTitle;
  @Input() editorLanguage = 'yaml';
  @Output() textEdited = new EventEmitter<any>();
  @Output() contentStatus = new EventEmitter<any>();

  userLanguage: string = "yaml";
  userTheme: string = "vs-light";
  codeMirrorOptions: any = {
    mode: "text/x-yaml",
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    lineWrapping: false,
    extraKeys: { "Ctrl-Space": "autocomplete" },
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
    theme: 'eclipse'
  };

  disabled = true;

  constructor() {
  }

  ngOnInit(): void {

  }

  changeTheme(event) {
    console.log('---->', event.checked)
    if (event.checked) {
      this.codeMirrorOptions.theme = 'ayu-dark';
    } else if (!event.checked) {
      this.codeMirrorOptions.theme = 'eclipse';
    }
  }

  emitText() {
    this.textEdited.emit(this.fileContent);
    this.emitStatus('3');
  }

  emitStatus(status) {
    this.disabled = false;
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
