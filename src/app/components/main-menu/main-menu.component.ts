import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-main-menu',
  standalone: false,
  
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {
constructor(private router: Router, private apiService: ApiService) {
  if(!apiService.isLoggedInSubject.value) {
    this.navigateTo('/');
  }
}
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
