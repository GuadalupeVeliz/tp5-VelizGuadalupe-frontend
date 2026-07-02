import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../services/publicacion.service';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { delay } from 'rxjs';

@Component({
  selector: 'app-publicacion',
  imports: [CommonModule, FormsModule],
  templateUrl: './publicacion.component.html',
  styleUrl: './publicacion.component.css'
})
export class PublicacionComponent implements OnInit {

  publicaciones: Array<any> = [];
  empleados: Array<any> = [];
  empleadoSeleccionadoFiltro: any = null;
  parteTitulo: string = '';
  esVigente: boolean = true;
  cargandoPublicaciones: boolean = false;
  cargandoPublicacion: boolean = false;

  titulo: string = '';
  contenido: string = '';
  empleadoSeleccionadoId: number | null = null;
  publicacionId: number = 0;
  modoEdicion: boolean = false;

  constructor(private publicacionService: PublicacionService) { }

  ngOnInit(): void {
    this.obtenerPublicaciones();
    this.obtenerEmpleados();
  }

  obtenerPublicaciones(): void {
    this.cargandoPublicaciones = true;
    this.publicacionService.getPublicaciones(this.parteTitulo, this.esVigente).pipe(delay(300)).subscribe(
      (result: any) => {
        console.log('Publicaciones obtenidas');
        if (this.empleadoSeleccionadoFiltro) {
          this.publicaciones = result.data.filter((e: any) => e.empleadoId == this.empleadoSeleccionadoFiltro);
        }
        else {
          this.publicaciones = result.data;
        }
        this.cargandoPublicaciones = false;
      },
      (error: any) => {
        console.error(error);
      }
    )
  }

  obtenerEmpleados(): void {
    this.publicacionService.getEmpleados().subscribe(
      (result: any) => {
        this.empleados = result;
      },
      (error: any) => {
        console.error('Error al obtener empleados', error);
      }
    )
  }

  limpiarFiltros(): void {
    this.empleadoSeleccionadoFiltro = null;
    this.esVigente = true;
    this.parteTitulo = '';
    this.obtenerPublicaciones();
  }

  eliminarPublicacion(id: number) {
    this.publicacionService.deletePublicacion(id).subscribe(
      (result: any) => {
        console.log('publicacion eliminada');
        this.obtenerPublicaciones();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  modificarPublicacion(publicacion: any) {
    this.titulo = publicacion.titulo;
    this.contenido = publicacion.contenido;
    this.empleadoSeleccionadoId = publicacion.empleadoId;
    this.publicacionId = publicacion.id;
    this.modoEdicion = true;
  }

  submitPublicacion(): void {
    this.cargandoPublicacion = true;
    let publicacion = {
      titulo: this.titulo,
      contenido: this.contenido,
      imagenAsociada: 'aGVsbG93b3JsZDEyMzQ1Njc4OTAxMjM0NTY3ODkw',
      fechaPublicacion: new Date().toLocaleDateString('en-CA'),
      vigente: true,
      empleadoId: this.empleadoSeleccionadoId
    }
    if (this.modoEdicion) {
      this.publicacionService.updatePublicacion(publicacion, this.publicacionId).pipe(delay(700)).subscribe(
        (result: any) => {
          console.log('publicación modificado', result);
          this.obtenerPublicaciones();
          this.cargandoPublicacion = false;
          this.modoEdicion = false;
        },
        (error: any) => console.error(error)
      )
    }
    else {
      this.publicacionService.createPublicacion(publicacion).pipe(delay(1000)).subscribe(
        (result: any) => { 
          console.log('publicación creada', result);
          this.obtenerPublicaciones();
          this.cargandoPublicacion = false;
          this.modoEdicion = false;
        },
        (error: any) => console.error(error)
      )
    }
    this.titulo = '';
    this.contenido = '';
    this.empleadoSeleccionadoId = null;
  }

}
