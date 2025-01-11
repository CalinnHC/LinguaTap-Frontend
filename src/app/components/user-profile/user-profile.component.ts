import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  username: string = 'username';
  email: string = 'email@example.com';
  country: string = 'Panamá';

  constructor(private router: Router, private apiService: ApiService) {
    if(!apiService.isLoggedIn()) {
      this.navigateTo('/');
      
    }
    this.getUser();
  }
    navigateTo(route: string) {
      this.router.navigate([route]);
    }
  logout(): void {
    this.apiService.logout();
    this.navigateTo('/');
  }

  getUser(): void {
    this.apiService.getUser().subscribe(
        (response) => {
            if (response) {
                this.username = response.username ?? 'Desconocido'; // Valor predeterminado
                this.email = response.email ?? 'No disponible';
                this.country = response.country ?? 'No especificado';
            } else {
                console.warn('Response is empty or undefined');
            }
        },
        (error) => {
            console.error('Error fetching user data.', error);
        }
    );
}


}
