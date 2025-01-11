import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Router } from 'express';

export const authGuard: CanActivateFn = (route, state) => {
  

  /* 
  const authService = inject(ApiService);
  const router = inject(Router);
  if(authService.isLoggedIn()){
    return true;
    console.log("Logged");
  }
  else{
    return router.navigate(['/']);
    console.log("notLogged");
  }
  */
 return true;
  
};
