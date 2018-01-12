import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicioIndustrialService } from '../../servicios/servicio-industrial.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';
import { producto } from '../../interfaces/producto.interface';
declare var swal: any;

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styles: []
})
export class MantenimientoComponent {

  ofertas: any[] = [];
  private key$: string
  ofertaIndividual: producto = {
    nombre: "",
    imagen: "",
    nombreCorto: "",
    caracteristicas: {
      1: "",
      2: "",
      3: ""
    },
    sku: "",
    precio: ""
  };
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  bandera:boolean = false;

  constructor(private IndustrialService: ServicioIndustrialService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.getporductos();
  }

  getporductos() {
    this.IndustrialService.getProductos()
      .subscribe((data: any) => {
        this.ofertas = data
        this.dtTrigger.next();
      })

  }

  ejemplo(){
    swal({    title: "Are you sure?",
              text: "You will not be able to recover this imaginary file!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes, delete it!",
              closeOnConfirm: false },
              function(){
              swal("Deleted!", "Your imaginary file has been deleted.", "success");
              });
    // swal("Se Guardo Correctamente", "", "success");
  }

  ejemplo2(){
    console.log("hola mundo");
    this.bandera = false;
  }

  info_Individual(nombre: string) {
    this.key$ = nombre;
    this.IndustrialService.getProducto(nombre)
      .subscribe((res: producto) => {
        this.ofertaIndividual = res;
      })
  }

  editarProducto() {
    this.IndustrialService.actualizarProducto(this.ofertaIndividual, this.key$)
      .subscribe((res: producto) => {
        console.log(res)
        this.consultar();
      })
  }
  consultar() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.IndustrialService.getProductos()
        .subscribe((data: any) => {
          this.ofertas = data
          this.dtTrigger.next();
        })
    });
  }
}
