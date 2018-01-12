import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { producto } from '../interfaces/producto.interface';

@Injectable()

export class ServicioIndustrialService {

  productosURL: string = "https://paginaweb-9bc4b.firebaseio.com/industrial.json";
  productoURL: string = "https://paginaweb-9bc4b.firebaseio.com/industrial";

  constructor(private http: HttpClient) {
  }

  getProductos() {
    return this.http.get(this.productosURL);
  }

  getProducto(key$: string) {
    let url = `${this.productoURL}/${key$}.json`
    return this.http.get(url)
  }

  nuevoProducto(Producto: producto) {

    let body = JSON.stringify(Producto);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.productosURL, body, { headers })
      .map(res => {
        console.log(res);
        return res
      })

  }

  actualizarProducto(Producto: producto, key$: string) {

    let body = JSON.stringify(Producto);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let url = `${this.productoURL}/${key$}.json`

    return this.http.put(url, body, { headers })
      .map(res => {
        console.log(res);
        return res
      })
  }

}
