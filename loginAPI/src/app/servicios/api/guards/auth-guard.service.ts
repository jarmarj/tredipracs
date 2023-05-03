import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../api.service';
import { tokenSession } from '../tokenSession';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  sessionToken = new tokenSession();
  constructor(private apiService: ApiService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    let isLogged = this.sessionToken.getSessionToken;
    
    if(isLogged){
      return true;

    } else {
      this.router.navigate(['/login']);
      return false
    }
  }
}
