import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
declare var $: any;

@Component({
  selector: 'app-importar-modal',
  templateUrl: './importar-modal.component.html',
  styleUrls: ['./importar-modal.component.css']
})
export class ImportarModalComponent {

  @ViewChild('inputFile', { static: false }) inputFile: ElementRef;
  @Input('cliente') cliente = null;
  @Input('usuario') usuario = null;
  @Output('done') done = new EventEmitter();

  constructor(
    private upload: UploadService
  ) { }

  submitForm(form: NgForm) {
    const fileList: FileList = this.inputFile.nativeElement.files;
    if (fileList.length > 0) {
      this.upload.uploadFile( fileList[0], this.cliente, this.usuario )
      .then( (data: string) => {
        // console.log('total', data);
        $('#modal-importar').modal('hide');
        this.inputFile.nativeElement.value = ''; // reset input
        this.done.emit();
      }, error => {
        // console.log(error);
      });
    }
  }

}
