import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-new-password',
  standalone: false,
  
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  errorMessage = "";
  newPassword: string = '';
  confirmPassword: string = '';
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  showPassword: boolean = false;
  tokenString: string = "";


  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    this.tokenString = token;
    console.log(token);
    if (!token) {
      this.router.navigate(["/"]);
      return;
    }
    this.verifyToken(token);
  }

  verifyToken(token: string): void {
    this.apiService.confirmNewPasswordToken(token).subscribe({
      next: (response) => {
        this.errorMessage = response;
      },
      error: (err) => {
        this.errorMessage = err.error || 'Error al verificar el token.';
        this.router.navigate(["/"]);
      }
    });
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  updatePassword(): void {
    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    if (this.tokenString) {
      this.apiService.updatePassword(this.tokenString, this.newPassword).subscribe({
        next: (response) => {
          this.errorMessage = response;
          this.router.navigate(["/login"]);
        },
        error: (err) => {
          this.errorMessage = err.error || 'Error al cambiar la contraseña.';
        }
      });
    } else {
      this.errorMessage = 'Token inválido.';
    }
  }
}
