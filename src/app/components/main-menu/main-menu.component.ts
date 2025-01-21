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
  isHovered: { [key: string]: boolean } = {};
  constructor(private router: Router, private apiService: ApiService) {}
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  ngOnInit() {
    this.apiService.toggleSidebar(true);
  }

  ngOnDestroy() {
    this.apiService.toggleSidebar(false);
  }

  
  onHover(cardId: string): void {
    this.isHovered[cardId] = true;
  }

  onLeave(cardId: string): void {
    this.isHovered[cardId] = false;
  }
}
