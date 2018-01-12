import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicioIndustrialService } from '../../servicios/servicio-industrial.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';
import { producto } from '../../interfaces/producto.interface';

declare var swal: any;
declare var jQuery: any;
declare var $: any;


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
          this.ofertas[this.key$] = res;
          swal("Se Actualizo Correctamente", "", "success");
          this.consultar();
        })
        $('#cerrarModal').click();
  }

  consultar() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.IndustrialService.getProductos()
        .subscribe((data: any) => {
          this.ofertas = data
          this.dtTrigger.next();
        })
    });
  }
}
