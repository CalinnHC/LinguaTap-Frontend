import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotten-password',
  standalone: false,
  
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.css'
})
export class ForgottenPasswordComponent {
  
    email: string = '';
    errorMessage: string = '';
    showEmailInput: boolean = true;
  
    constructor(private apiService: ApiService, private router: Router) {}
  
    navigateTo(route: string) {
      this.router.navigate([route]);
    }
  
    onChange(): void {

    }

    sendEmail(): void {
      if (!this.email) {
        this.errorMessage = 'Por favor, introduce tu correo electrónico.';
        return;
      }
      this.apiService.sendForgottenPasswordEmail(this.email).subscribe({
        next: (response) => {
          this.errorMessage = response; // Respuesta del servidor
          this.showEmailInput = false;
          console.log("Correo enviado: ", response);
        },
        error: (err) => {
          // Manejo de errores según el código de estado
          if (err.status === 404) {
            this.errorMessage = 'No se ha registrado ninguna cuenta con esta dirección.';
          } else if (err.status === 403) {
            this.errorMessage = 'Debes verificar tu correo antes de solicitar un cambio de contraseña.';
          } else {
            this.errorMessage = err.error || 'Error al enviar el correo.';
          }
          console.log("Error: ", err);
        }
      });
    }
    

    

    verifyEmail(): void {
      if (this.email) {
        this.showEmailInput = false; // Oculta el input y muestra el mensaje
      }
    }

}
