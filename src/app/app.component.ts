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
  showSidebar: boolean = false;
  isDarkTheme = false;
  
  constructor(private router: Router, public apiService: ApiService) {
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() {
    this.isLoggedIn=this.apiService.isLoggedIn();
  }

  ngDoCheck() {
    const currentLoginStatus = this.apiService.isLoggedIn();
    if (currentLoginStatus !== this.isLoggedIn) {
      this.isLoggedIn = currentLoginStatus;
    }
    this.showSidebar = this.apiService['showSidebar'].value;
  }

  

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    const body = document.body;

    if (this.isDarkTheme) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }

}
