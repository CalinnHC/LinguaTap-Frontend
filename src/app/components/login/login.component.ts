import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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

  constructor(private apiService: ApiService, private router: Router) {
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  onLogin(): void {
    this.apiService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.token) {
          this.apiService.saveToken(response.token); // Guardar el token JWT
          console.log('Login exitoso. Token guardado.');
          this.navigateTo('/mainMenu'); // Redirigir al menú principal
        } else {
          this.errorMessage = 'Nombre de usuario o contraseña incorrectos.';
          console.error('Error al iniciar sesión: Credenciales incorrectas.');
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = error.error.message;
      },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
