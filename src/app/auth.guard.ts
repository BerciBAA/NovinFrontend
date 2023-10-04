import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  if (authService.isLoggedIn()) {
    const userRoles = authService.getRole();
    if(userRoles == null){
      router.navigateByUrl('/error');
      return false;
    }    

    if(userRoles.includes(route.data['roles'])){
      
      return true;
    }
  }
  router.navigateByUrl('/main');
  return false;
};


