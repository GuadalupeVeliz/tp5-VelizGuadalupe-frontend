import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransaccionService } from '../services/transaccion.service';

@Component({
  selector: 'app-transaccion',
  imports: [FormsModule,CommonModule],
  templateUrl: './transaccion.component.html',
  styleUrl: './transaccion.component.css'
})
export class TransaccionComponent {
  transacciones: any[] = [];
  cargando = false;

  idiomaOrigenFiltro = '';
  idiomaDestinoFiltro = '';

  constructor(private transaccionService: TransaccionService) {}
  ngOnInit(): void {
    this.recuperarTransacciones();
  }

  recuperarTransacciones(){
    this.cargando = true;
    this.transaccionService.obtenerTransacciones().subscribe(
      (result: any) => {
        this.transacciones = result;
        this.cargando = false;
      },
      (error : any) => {
        console.error('Error al obtener transacciones', error);
        this.cargando = false;
      }
    );
  }

  recuperarTransaccionesFiltro(): void {
    if (!this.idiomaOrigenFiltro || !this.idiomaDestinoFiltro) return;

    this.cargando = true;
    this.transaccionService.obtenerTransaccionesPorIdiomas(this.idiomaOrigenFiltro, this.idiomaDestinoFiltro).subscribe(
      (result: any) => {
        this.transacciones = result;
        console.log(result);
        this.cargando = false;
      },
      (error: any) => {
        console.error('Error al filtrar transacciones', error);
        this.cargando = false;
      }
    );
  }
}
