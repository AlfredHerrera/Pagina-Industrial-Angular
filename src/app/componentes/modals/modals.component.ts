import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { producto } from '../../interfaces/producto.interface';
import { ServicioOfertasService } from '../../servicios/servicio-ofertas.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styles: []
})
export class ModalsComponent implements OnInit {

  constructor(private _servicio: ServicioOfertasService) { }

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
    console.log(this.Producto);
    this._servicio.nuevoProducto(this.Producto)
      .subscribe( res=> {
        console.log(res)
      });

  }

  onChange(event) {
    console.log('onChange');
    var files = event.srcElement.files;
    console.log(files);
    }


  ngOnInit() {
  }

  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: 'http://192.168.15.21/subirArchivos/index.php'
  };
  sizeLimit = 2000000;

  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
      alert('La imagen se se ha seleccionado');
    }
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }

}
