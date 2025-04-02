import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { WordService } from '../../words.service';

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
    { value: '133', label: 'Panamá' }
  ];
  registroExitoso: boolean = false; 

  constructor(private router: Router, private apiService: ApiService, private wordsService: WordService) {
    this.wordsService.getCountries().subscribe((data) => {
      this.options = data.map((country: any) => ({
        value: country.id_country,
        label: country.country_name,
      }));
    });
  }
navigateTo(route: string) {
  this.router.navigate([route]);

}

onRegister(): void {
  this.apiService.newUser(this.username, this.password, this.email, this.country).subscribe({
    next: (response) => {
      this.errorMessage = 'Se ha enviado un enlace de confirmación a su correo electrónico.'; // Limpia cualquier error previo
      this.registroExitoso = true;
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
      !!this.email?.trim() && emailRegex.test(this.email) && 
      !!this.password?.trim() &&
      !!this.username?.trim() &&
      this.country !== 0 &&
      !!this.check
    );
  }
  
}
