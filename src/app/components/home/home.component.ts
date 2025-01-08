import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, public apiService: ApiService) {
    if(apiService.isLoggedInSubject.value) {
      this.navigateTo('/mainMenu');
    }
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
