import { Component, OnInit } from '@angular/core';
import { ServicioOfertasService } from '../../servicios/servicio-ofertas.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { producto } from '../../interfaces/producto.interface'

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html'
})
export class OfertasComponent{

  ofertas:any[]=[];
  private key$:string
  ofertaIndividual:producto ={
    nombre: "",
    imagen: "",
    nombreCorto: "",
    caracteristicas: {
      1:"",
      2:"",
      3:""
    },
    sku:  "",
    precio: ""
  } ;
  dtOptions:DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

constructor(private _servicioOfertas: ServicioOfertasService ) {

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10
  };

  this.getporductos();

}

getporductos(){
  this._servicioOfertas.getProductos()
    .subscribe((data:any) => {
      this.ofertas = data
      this.dtTrigger.next();
   })

}

info_Individual(nombre:string){
  this.key$ = nombre;
  this._servicioOfertas.getProducto(nombre)
    .subscribe((res:producto)=>{
      this.ofertaIndividual = res;
    })
}

editarProducto(){
  this._servicioOfertas.actualizarProducto(this.ofertaIndividual, this.key$)
    .subscribe((res:producto)=>{
      console.log(res)
    })
}

}
