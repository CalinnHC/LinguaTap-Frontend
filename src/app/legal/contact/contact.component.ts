import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  @Output() closeReport = new EventEmitter<void>();
  errorReporte: string = '';
  nombre: string = '';
  email: string = '';
  mensajeEnviado: boolean = false;

  constructor(private apiService: ApiService) {}

  enviarReporte(event: Event) {
    event.preventDefault();
    this.saveReport();
    this.mensajeEnviado = true;
    console.log('Mensaje enviado:', this.errorReporte);
  }

  saveReport() {
    const reporte = `Nombre: ${this.nombre}, Email: ${this.email}, Mensaje: ${this.errorReporte}`;
    this.apiService.newReport(reporte).subscribe({
      next: (response) => {
        console.log('Reporte enviado con éxito:', response);
      },
      error: (error) => {
        console.error('Error al enviar el reporte:', error);
      },
    });
  }
}