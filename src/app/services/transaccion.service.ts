import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  constructor(private http: HttpClient) { }

  registrarTransaccion(transaccion: any){
    return this.http.post('http://localhost:3000/api/transacciones/',transaccion);
  }

  obtenerTransacciones():Observable<any>{
    return this.http.get('http://localhost:3000/api/transacciones/');
  }

  obtenerTransaccionesPorIdiomas(origen: string, destino: string): Observable<any> {
  return this.http.get(`http://localhost:3000/api/transacciones/${origen}/${destino}`);
  }
}
