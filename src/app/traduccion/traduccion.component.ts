import { TransaccionService } from './../services/transaccion.service';
import { FormsModule } from '@angular/forms';
import { TraduccionService } from './../services/traduccion.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-traduccion',
  imports: [FormsModule],
  templateUrl: './traduccion.component.html',
  styleUrl: './traduccion.component.css'
})
export class TraduccionComponent {
  idiomaOrigen='';
  idiomaDestino='';
  textoOrigen='';
  textoTraducido='';
  email='';
  transacciones : any;

  constructor(private traduccionService: TraduccionService,private transaccionService: TransaccionService){

  }

  obtenerTraduccion(){
    this.traduccionService.getTraduccion(this.textoOrigen,this.idiomaOrigen,this.idiomaDestino).subscribe(
      (result: any) => {
        console.log(result);
        this.textoTraducido=result.data.translations.translatedText[0];
        const transaccion = {
        idiomaOrigen: this.idiomaOrigen,
        textoOrigen: this.textoOrigen,
        idiomaDestino: this.idiomaDestino,
        textoDestino: this.textoTraducido,
        emailCliente: this.email
        };
        this.guardarTransaccion(transaccion);
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  obtenerTransacciones(){
    this.transaccionService.obtenerTransacciones().subscribe(
      (result: any) => {
        console.log(result);
        this.transacciones=result;
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  guardarTransaccion(transaccion: any): void {
    this.transaccionService.registrarTransaccion(transaccion).subscribe({
      next: (resp) => console.log('Guardado!', resp),
      error: (err) => console.error('Error al guardar', err)
    });
  }

}
