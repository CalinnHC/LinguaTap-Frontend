import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { WordService } from '../../words.service';
import { map, Observable } from 'rxjs';

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

  constructor(private router: Router, private apiService: ApiService, private wordsService: WordService) {
    if (!apiService.isLoggedIn()) {
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
    this.apiService.getUser().subscribe({
      next: (response) => {
        console.log(response);
        if (response) {
          this.username = response.username ?? 'Desconocido'; // Valor predeterminado
          this.email = response.email ?? 'No disponible';
          this.getCountries(response.country).subscribe((country: string) => {
            this.country = country;
          });
        } else {
          console.warn('Response is empty or undefined');
        }
      },
      error: (error) => {
        console.error('Error fetching user data.', error);
      },
      complete: () => {
        console.log('User data fetching completed.');
      }
    });
  }
  

  getCountries(id: number): Observable<string> {
    return this.wordsService.getCountries().pipe(
      map((data) => {
        const country = data.find((country: any) => country.id_country === id);
        return country ? country.country_name : 'Unknown';
      })
    );
  }
  
  ngOnInit() {
    this.apiService.toggleSidebar(true);
    
  }

  ngOnDestroy() {
    this.apiService.toggleSidebar(false);
  }



}
