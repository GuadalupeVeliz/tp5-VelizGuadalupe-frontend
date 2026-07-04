import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PublicacionService {

	constructor(private http: HttpClient) { }

	getPublicaciones(titulo: string, esVigente: boolean): Observable<any> {
		return this.http.get(`${environment.apiUrl}/publicaciones?titulo=${titulo}&vigente=${esVigente}`);
	}

	getEmpleados(): Observable<any> {
		return this.http.get(`${environment.apiUrl}/empleados`);
	}

	deletePublicacion(id: number): Observable<any> {
		return this.http.delete(`${environment.apiUrl}/publicaciones/${id}`);
	}

	createPublicacion(publicacion: any): Observable<any> {
		let body = publicacion;
		return this.http.post(`${environment.apiUrl}/publicaciones`, body);
	}

	updatePublicacion(publicacion: any, id: number): Observable<any> {
		let body = publicacion;
		return this.http.put(`${environment.apiUrl}/publicaciones/${id}`, body);
	}

}
