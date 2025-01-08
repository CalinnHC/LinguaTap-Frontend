import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  
  onLogin(): void {
    this.apiService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response === null) {
          this.errorMessage = 'Nombre de usuario o contraseña incorrectos.';
          console.error('Error al iniciar sesión: Credenciales incorrectas.');
          return;
        }
        this.apiService.loginSuccess();
        console.log('ID de usuario:', response.id_user);
        this.apiService.updateUserId(response.id_user);
        this.apiService.getLoggedInStatus();
        this.navigateTo('/mainMenu');
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Nombre de usuario o contraseña incorrectos.';
      },
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
} 
