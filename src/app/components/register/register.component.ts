import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = ''; 
  username: string = '';
  country: number = 0;
  check: boolean = false;
  errorMessage: string = '';
  options = [
    { value: '133', label: 'Panamá' },
    { value: '2', label: 'USA' },
    { value: '3', label: 'México' }
  ];

  constructor(private router: Router, private apiService: ApiService) {}
navigateTo(route: string) {
  this.router.navigate([route]);
}

onRegister(): void {
  this.apiService.newUser(this.username, this.password, this.email, this.country).subscribe({
    next: (response) => {
      console.log('Registro exitoso:', response);
      this.errorMessage = ''; // Limpia cualquier error previo
      this.navigateTo('/');
    },
    error: (error) => {
      console.error('Error al registrar:', error.error);
      this.errorMessage = error.error; // Esto manejará el mensaje plano
    },
  });
}


  isFormValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      !!this.email?.trim() && emailRegex.test(this.email) && // Verifica formato de correo
      !!this.password?.trim() && // Verifica que la contraseña no esté vacía
      !!this.username?.trim() && // Verifica que el nombre de usuario no esté vacío
      this.country !== 0 && // Verifica que se seleccionó un país
      !!this.check // Verifica que el checkbox esté marcao 
    );
  }
  
  

  
}
