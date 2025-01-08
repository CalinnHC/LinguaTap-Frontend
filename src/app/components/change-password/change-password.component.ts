import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: false,
  
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onChangePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
    else if (this.newPassword === this.currentPassword) {
      this.errorMessage = 'La contraseña debe ser diferente a la contraseña anterior.';
      return;
    }
    this.apiService.changePassword(this.currentPassword,this.newPassword).subscribe(
      (response) => {
        this.errorMessage = '';
        this.navigateTo('/profile');
      },
      (error) => {
        this.errorMessage = 'La contraseña actual es incorrecta.';
      }
    );
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
