import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LinguaTapSite';
  isLoggedIn: boolean = false;
  
  constructor(private router: Router, public apiService: ApiService) {
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() {
    this.apiService.getLoggedInStatus().subscribe(status => {
      this.isLoggedIn = status;
    });}
  
  

}
