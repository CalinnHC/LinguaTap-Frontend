import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(ApiService);
    const router = inject(Router);
    if(authService.isLoggedIn()){
      return router.navigate(['/mainMenu']);
    }
    else{
      return true;
    }
};
