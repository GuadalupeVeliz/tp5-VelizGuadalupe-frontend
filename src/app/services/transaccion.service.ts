import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  constructor(private http: HttpClient) { }

  registrarTransaccion(transaccion: any){
    return this.http.post(`${environment.apiUrl}/transacciones/`,transaccion);
  }

  obtenerTransacciones():Observable<any>{
    return this.http.get(`${environment.apiUrl}/transacciones/`);
  }

  obtenerTransaccionesPorIdiomas(origen: string, destino: string): Observable<any> {
  return this.http.get(`${environment.apiUrl}/transacciones/${origen}/${destino}`);
  }
}
