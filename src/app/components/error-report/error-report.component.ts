import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-error-report',
  standalone: false,
  
  templateUrl: './error-report.component.html',
  styleUrl: './error-report.component.css'
})
export class ErrorReportComponent {
  @Output() closeReport = new EventEmitter<void>();
  errorReporte: string = '';


  enviarReporte() {
    this.saveReport();
    console.log('Error reportado:', this.errorReporte);
  }
  constructor(private apiService: ApiService){}

  cerrar() {
    this.closeReport.emit();
  }

  saveReport(){
    this.apiService.newReport(this.errorReporte).subscribe({
      next: (response) => {
        console.log('Reporte Enviado', response);
        this.cerrar();
      },
      error: (error) => {
        console.error('Error al enviar el reporte:', error);
      },
    });
  }
}
