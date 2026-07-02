import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PublicacionService {

	constructor(private http: HttpClient) { }

	getPublicaciones(titulo: string, esVigente: boolean): Observable<any> {
		return this.http.get(`http://localhost:3000/api/publicaciones?titulo=${titulo}&vigente=${esVigente}`);
	}

	getEmpleados(): Observable<any> {
		return this.http.get('http://localhost:3000/api/empleados');
	}

	deletePublicacion(id: number): Observable<any> {
		return this.http.delete(`http://localhost:3000/api/publicaciones/${id}`);
	}

	createPublicacion(publicacion: any): Observable<any> {
		let body = publicacion;
		return this.http.post('http://localhost:3000/api/publicaciones', body);
	}

	updatePublicacion(publicacion: any, id: number): Observable<any> {
		let body = publicacion;
		return this.http.put(`http://localhost:3000/api/publicaciones/${id}`, body);
	}

}
