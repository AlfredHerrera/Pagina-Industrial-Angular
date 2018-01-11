import { Component, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { NgForm } from '@angular/forms';
import { producto } from '../../interfaces/producto.interface';
import { ServicioOfertasService } from '../../servicios/servicio-ofertas.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styles: []
})
export class ModalsComponent {

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  constructor(private _servicio: ServicioOfertasService) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  Producto:producto ={
    nombre: "",
    nombreCorto: "",
    imagen: "",
    caracteristicas: {
      1:"",
      2:"",
      3:""
    },
    sku:  "",
    precio: ""
  } ;

  guardar(){
    this.startUpload();
    this._servicio.nuevoProducto(this.Producto)
      .subscribe( res=> {
        console.log(res)
      });

  }

    onUploadOutput(output: UploadOutput): void {
      if (output.type === 'allAddedToQueue') {
      } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
        this.files.push(output.file);
      } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
        // update current data in files array for uploading file
        const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
        this.files[index] = output.file;
      } else if (output.type === 'removed') {
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
      } else if (output.type === 'dragOver') {
        this.dragOver = true;
      } else if (output.type === 'dragOut') {
        this.dragOver = false;
      } else if (output.type === 'drop') {
        this.dragOver = false;
      }
    }

    startUpload(): void {
      const event: UploadInput = {
        type: 'uploadAll',
        url: 'http://192.168.15.21/subirArchivos/index.php',
        method: 'POST',
        data: { foo: 'bar' }
      };

      this.uploadInput.emit(event);
    }

}
