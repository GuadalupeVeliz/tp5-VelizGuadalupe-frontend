import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TraduccionService {

  constructor(private http: HttpClient) {}

  getTraduccion(texto: string, origen: string, destino: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-key': '791eae930dmshcf3e4076d169587p145618jsn1727e3f13bd9',
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
        'Content-Type': 'application/json',
      }),
    };

    let body ={
      q:texto,
		source: origen,
		target: destino
    }

    return this.http.post("https://deep-translate1.p.rapidapi.com/language/translate/v2",body,httpOptions);
  }

}
